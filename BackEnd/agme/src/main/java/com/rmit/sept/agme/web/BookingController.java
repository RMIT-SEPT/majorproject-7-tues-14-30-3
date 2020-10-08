package com.rmit.sept.agme.web;

import com.rmit.sept.agme.model.Booking;
import com.rmit.sept.agme.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;


@RestController
@RequestMapping("/api/bookings")
@CrossOrigin
public class BookingController {
    @Autowired
    BookingService bookingService;

    //Cancel booking
    @PatchMapping("/cancel")
    public ResponseEntity<?> cancelBooking(@RequestParam("bookingId") long id){
        //Authenticate worker in repo
        Optional<Booking> booking = bookingService.cancel(id);
        if(!booking.isPresent()){
            return new ResponseEntity<>("No Booking found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(booking, HttpStatus.OK); //Updated worker returned
    }


    @PostMapping("")
    public ResponseEntity<?> createBooking(@Valid @RequestBody Booking booking, BindingResult result){
        if(result.hasErrors()) { //Invalid booking object in request body
            return new ResponseEntity<>("Invalid Bookings Object", HttpStatus.BAD_REQUEST);
        }

        booking.setService(booking.getWorker().getService());

        //Create booking in repo
        Optional<Booking> savedBooking = bookingService.create(booking);
        if(!savedBooking.isPresent()){ //Bad booking
            return new ResponseEntity<>("Invalid Booking", HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(savedBooking, HttpStatus.CREATED); //New booking object returned
    }


    @GetMapping("")
    public ResponseEntity<?> getBooking(@RequestParam("id") long id){
        Optional<Booking> booking = bookingService.get(id); //Get booking from repo

        if(!booking.isPresent()){
            return new ResponseEntity<>("No Booking Found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(booking,HttpStatus.OK); //Booking returned
    }


    @PutMapping("")
    public ResponseEntity<?> updateBooking(@Valid @RequestBody Booking booking, BindingResult result){
        if(result.hasErrors()) { //Invalid booking object in request body
            return new ResponseEntity<>("Invalid Booking Object", HttpStatus.BAD_REQUEST);
        }

        //Update booking in repo
        Optional<?> savedBooking = bookingService.update(booking);
        if(!savedBooking.isPresent()) //No booking found
            return new ResponseEntity<>("Booking Not Found", HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(savedBooking, HttpStatus.OK); //Updated booking object returned
    }


    //Get bookings that have not started yet
    //Bookings can be got by workerID or customerID
    @GetMapping("/upcoming")
    public ResponseEntity<?> getUpcomingBookings(@RequestParam(value = "workerId", required = false) Long workerID,
                                               @RequestParam(value = "customerId", required = false) Long customerID){
        if(workerID != null && customerID == null){
            Iterable<Booking> bookings = bookingService.getByWorkerBetween(workerID, LocalDateTime.now(), null);

            if(!bookings.iterator().hasNext()){
                return new ResponseEntity<>("No Booking Found", HttpStatus.NOT_FOUND);
            }


            return new ResponseEntity<>(bookings, HttpStatus.OK);
        } else if(workerID == null && customerID != null){
            Iterable<Booking> bookings = bookingService.getByCustomerBetween(customerID, LocalDateTime.now(), null);


            if(!bookings.iterator().hasNext()){
                return new ResponseEntity<>("No Booking Found", HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(bookings, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Bad Request", HttpStatus.BAD_REQUEST);
        }
    }


    //Get bookings that have started
    //Bookings can be got by workerID or customerID
    @GetMapping("/past")
    public ResponseEntity<?> getPastBookings(@RequestParam(value = "workerId", required = false) Long workerID,
                                                 @RequestParam(value = "customerId", required = false) Long customerID){
        if(workerID != null && customerID == null){
            //Get from repo by workerID
            Iterable<Booking> bookings = bookingService.getByWorkerBetween(workerID, null, LocalDateTime.now());

            if(!bookings.iterator().hasNext()){
                return new ResponseEntity<>("No Booking Found", HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(bookings, HttpStatus.OK); //Return array of bookings

        } else if(workerID == null && customerID != null){
            //Get from repo by customerID
            Iterable<Booking> bookings = bookingService.getByCustomerBetween(customerID, null, LocalDateTime.now());

            if(!bookings.iterator().hasNext()){
                return new ResponseEntity<>("No Booking Found", HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(bookings, HttpStatus.OK); //Return array of bookings
        }
        else{ //Invalid request params
            return new ResponseEntity<>("Bad Request", HttpStatus.BAD_REQUEST);
        }
    }

}
