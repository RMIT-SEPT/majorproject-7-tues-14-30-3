package com.rmit.sept.agme.services;

import com.rmit.sept.agme.model.Availability;
import com.rmit.sept.agme.model.Booking;
import com.rmit.sept.agme.model.Worker;
import com.rmit.sept.agme.repositories.AvailabilityRepository;
import com.rmit.sept.agme.repositories.WorkerRepository;
import com.rmit.sept.agme.repositories.BookingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
        Iterator<Booking> bookings = bookingRepository.getBetweenByWorker(workerId, date.atStartOfDay(),
                date.plusDays(1).atStartOfDay()).iterator();

        Collection<Booking> bookingList = new ArrayList<>();
        while(bookings.hasNext()){
            bookingList.add(bookings.next());
        }

        Collection<LocalTime> timeSlots = new ArrayList<>();

        //Check each availability against bookings
        while(availabilities.hasNext()){
            LocalTime timeSlot = availabilities.next().getTimeSlot();

            for(Booking booking: bookingList){ //Add availability if there is no booking
                if(!booking.isCancelled()){
                    if(booking.getStartTime().toLocalTime().isAfter(timeSlot) ||
                        booking.getEndTime().toLocalTime().isBefore(timeSlot) ||
                        booking.getEndTime().toLocalTime().equals(timeSlot)){
                        timeSlots.add(timeSlot);
                    }
                }
            }
        }

        return timeSlots;
    }

}
