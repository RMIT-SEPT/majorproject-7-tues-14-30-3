package com.rmit.sept.agme.services;

import com.rmit.sept.agme.model.*;
import com.rmit.sept.agme.repositories.AvailabilityRepository;
import com.rmit.sept.agme.repositories.WorkerRepository;
import com.rmit.sept.agme.repositories.BookingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.*;

@Service
public class AvailabilityService {
    @Autowired
    AvailabilityRepository availabilityRepository;

    @Autowired
    WorkerRepository workerRepository;

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    NotificationService notificationService;

    public Collection<LocalTime> getByDay(int day, long workerId){
        Optional<Worker> worker = workerRepository.findById(workerId);
        if(!worker.isPresent()){
            return Collections.EMPTY_LIST; //no worker found
        }

        Iterator<Availability> availabilities = availabilityRepository.getByDayAndWorker(day, worker.get()).iterator();
        Collection<LocalTime> timeSlots = new ArrayList<>();

        while(availabilities.hasNext()){
            timeSlots.add(availabilities.next().getTimeSlot());
        }

        return timeSlots;
    }

    //Replaces all availabilities
    public Collection<LocalTime> updateByDay(List<LocalTime> timeSlots, int day, long workerId){
        Optional<Worker> worker = workerRepository.findById(workerId);
        if(!worker.isPresent()){
            return Collections.EMPTY_LIST; //no worker found
        }

        Collection<LocalTime> savedTimeSlots = new ArrayList<>();

        availabilityRepository.deleteByDayAndWorker(day, workerId); //Remove all availabilities to be replaced

        for (LocalTime timeSlot: timeSlots) {
            if(timeSlot.getMinute() % 30 == 0 && timeSlot.getSecond() == 0) { //TimeSlots not on the half hour ignored
                Availability availability = new Availability(timeSlot, worker.get(), day);
                savedTimeSlots.add(availabilityRepository.save(availability).getTimeSlot()); //Save availability to repo
            }
        }

        //Add notification to worker (max 1 notification of this type)
        Iterable<Notification> notifications = notificationService.peekUserNotifications(worker.get().getUser());
        boolean notificationFound = false;
        for (Notification notification: notifications) {
            if(notification.getName().equals("Availability Changed!")){
                notificationFound = true;
            }
        }

        if(!notificationFound){
            Notification availabilityNotification = new Notification(worker.get().getUser(),
                    NotificationType.NEUTRAL, "Availability Changed!",
                    "The admin has updated your availability.");
            notificationService.createNotification(availabilityNotification); //Add notification for worker
        }

        //Return saved timeSlots
        return savedTimeSlots;
    }

    public Collection<LocalTime> getByDate(LocalDate date, long workerId){
        Optional<Worker> worker = workerRepository.findById(workerId);
        if(!worker.isPresent()){
            return Collections.EMPTY_LIST; //no worker found
        }

        int day = date.getDayOfWeek().getValue();
        //Get worker's availabilities
        Iterator<Availability> availabilities = availabilityRepository.getByDayAndWorker(day, worker.get()).iterator();

        //Get worker's bookings
        Date startOfDay = Date.from(date.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
        Date endOfDay = Date.from(date.plusDays(1).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
        Iterator<Booking> bookings = bookingRepository.getBetweenByWorker(workerId, startOfDay, endOfDay)
                .iterator();

        //Transform bookings objects to array
        Collection<LocalTime[]> bookingList = new ArrayList<>();
        while(bookings.hasNext()){
            Booking booking = bookings.next();

            if(!booking.isCancelled()) {
                LocalTime startTime = LocalDateTime.ofInstant(booking.getStartTime().toInstant(),
                        ZoneId.systemDefault()).toLocalTime();
                LocalTime endTime = LocalDateTime.ofInstant(booking.getEndTime().toInstant(),
                        ZoneId.systemDefault()).toLocalTime();

                bookingList.add(new LocalTime[]{startTime, endTime});
            }
        }

        Collection<LocalTime> timeSlots = new ArrayList<>();

        //Check each availability against bookings
        while(availabilities.hasNext()){
            LocalTime timeSlot = availabilities.next().getTimeSlot();
            boolean overlap = false;

            for(LocalTime[] booking: bookingList){

                if(timeSlot.isAfter(booking[0]) ||
                        timeSlot.equals(booking[0])){
                    if(timeSlot.isBefore(booking[1])) {
                        overlap = true;
                    }
                }
            }

            if(!overlap){ //Add availability if there is no booking overlaps
                timeSlots.add(timeSlot);
            }
        }

        return timeSlots;
    }

}
