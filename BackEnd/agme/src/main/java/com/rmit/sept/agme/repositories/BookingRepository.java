package com.rmit.sept.agme.repositories;

import com.rmit.sept.agme.model.Booking;
import com.rmit.sept.agme.model.Customer;
import com.rmit.sept.agme.model.Worker;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface BookingRepository extends CrudRepository<Booking, Long> {

    //Custom queries for date/time
    @Query("SELECT b FROM Booking b WHERE b.worker.id = (:workerID) AND b.startTime > (:time)")
    Iterable<Booking> getUpcomingByWorker(@Param("workerID")long workerID, @Param("time") Date time);

    @Query("SELECT b FROM Booking b WHERE b.customer.id = (:customerID) AND b.startTime > (:time)")
    Iterable<Booking> getUpcomingByCustomer(@Param("customerID")long customerID, @Param("time") Date time);


    @Query("SELECT b FROM Booking b WHERE b.worker.id = (:workerID) AND b.startTime < (:time)")
    Iterable<Booking> getPastByWorker(@Param("workerID")long workerID, @Param("time") Date time);

    @Query("SELECT b FROM Booking b WHERE b.customer.id = (:customerID) AND b.startTime < (:time)")
    Iterable<Booking> getPastByCustomer(@Param("customerID") long customerID, @Param("time") Date time);


    @Query("SELECT b FROM Booking b WHERE b.worker.id = (:workerID) AND (b.startTime < (:end) AND b.endTime > (:start)) OR (b.endTime > (:start) AND b.endTime < (:end))")
    Iterable<Booking> getBetweenByWorker(@Param("workerID")long workerID, @Param("start") Date start,
                                         @Param("end") Date end);
}
