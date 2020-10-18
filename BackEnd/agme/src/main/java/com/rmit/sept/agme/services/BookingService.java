package com.rmit.sept.agme.services;

import com.rmit.sept.agme.model.Booking;
import com.rmit.sept.agme.model.Notification;
import com.rmit.sept.agme.model.NotificationType;
import com.rmit.sept.agme.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class BookingService {
    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    NotificationService notificationService;

    //private save used by update and create
    private Booking saveOrUpdate(Booking booking){
        return bookingRepository.save(booking);
    }

    public Optional<Booking> get(long id){
        return bookingRepository.findById(id);
    }

    public Optional<Booking> create(Booking booking){
        //Add notifications
        Notification bookingNotification = new Notification(booking.getWorker().getUser(),
                NotificationType.POSITIVE, "New Booking!",
                "You have a new booking at " + booking.getStartTime().toString() + ". Check your Upcoming Bookings for more details.");
        notificationService.createNotification(bookingNotification); //Add worker notification
        bookingNotification.setUser(booking.getCustomer().getUser());
        notificationService.createNotification(bookingNotification); //Add customer notification

        return Optional.of(saveOrUpdate(booking));
    }

    public Optional<Booking> update(Booking booking){
        if(!bookingRepository.findById(booking.getId()).isPresent())
            return Optional.empty(); //Booking not found

        return Optional.of(saveOrUpdate(booking));
    }

    public Optional<Booking> cancel(long id){
        Optional<Booking> booking = bookingRepository.findById(id);

        if(!booking.isPresent()) {
            return Optional.empty(); //No booking found
        }

        Booking bookingObject = booking.get();
        //Add notification for worker
        Notification bookingNotification = new Notification(bookingObject.getWorker().getUser(),
                NotificationType.NEGATIVE, "Booking Cancelled",
                "Your booking at " + bookingObject.getStartTime().toString() + " has been cancelled by the customer.");
        notificationService.createNotification(bookingNotification);


        //Booking cancelled
        booking.get().setCancelled(true);
        return Optional.of(bookingRepository.save(booking.get()));
    }

    //Get all bookings for worker
    public Iterable<Booking> getByWorkerBetween(long workerID, Date start, Date end){
        if(start == null){ //Get bookings before end
            return bookingRepository.getPastByWorker(workerID, end);
        } else if(end == null) { //Get bookings after start
            return bookingRepository.getUpcomingByWorker(workerID, start);
        }
        return Collections.EMPTY_LIST; //Get bookings between start and end to be implemented, unneeded for sprint 2
    }

    //Get all bookings for customer
    public Iterable<Booking> getByCustomerBetween(long customerID, Date start, Date end){
        if(start == null){ //Get bookings before end
            return bookingRepository.getPastByCustomer(customerID, end);
        } else if(end == null) { //Get bookings after start
            return bookingRepository.getUpcomingByCustomer(customerID, start);
        }
        return Collections.EMPTY_LIST; //Get bookings between start and end to be implemented, unneeded for sprint 2
    }


}
