package com.rmit.sept.agme;

import com.rmit.sept.agme.model.*;
import com.rmit.sept.agme.repositories.CustomerRepository;
import com.rmit.sept.agme.repositories.UserRepository;
import com.rmit.sept.agme.repositories.WorkerRepository;
import com.rmit.sept.agme.services.CustomerService;
import com.rmit.sept.agme.services.BookingService;
import com.rmit.sept.agme.repositories.BookingRepository;
import com.rmit.sept.agme.services.ServiceNameService;
import com.rmit.sept.agme.services.WorkerService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class BookingServiceTests {

    @Autowired
    UserRepository userRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    CustomerService customerService;

    @Autowired
    WorkerService workerService;

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    BookingService bookingService;

    @Autowired
    ServiceNameService serviceNameService;

    ServiceName mockService;
    Worker worker;
    Customer customer;

    static boolean initialized = false;

    @BeforeEach
    public void setUp(){
        if(!initialized){
            initialized = true;

            serviceNameService.create("Service Name");
            mockService = serviceNameService.getByService("Service Name").iterator().next();

            //Setup test worker/customer
            User cust = new User();
            cust.setAddress("13 realplace drive, suburbs");
            cust.setUsername("ValidCustomer@mail.com");
            cust.setFirstName("Juan");
            cust.setLastName("Rosso");
            cust.setPassword("password");
            cust.setRole("DEFAULT_ROLE");
            User newCustomer = userRepository.save(cust);
            customerService.create(newCustomer.getId()).get();

            User work = new User();
            work.setAddress("31 fakeplace drive, suburbs");
            work.setUsername("ValidWorker@mail.com");
            work.setFirstName("Jose");
            work.setLastName("Azurro");
            work.setPassword("wordpass");
            work.setRole("DEFAULT_ROLE");
            User newWorker = userRepository.save(work);
            workerService.create(newWorker.getId(), mockService).get();
        }

        customer = customerRepository.getByUser(userRepository.findByUsername("ValidCustomer@mail.com")).iterator().next();
        worker = workerService.getByUser(userRepository.findByUsername("ValidWorker@mail.com")).get();
        mockService = serviceNameService.getByService("Service Name").iterator().next();
    }


    @Test
    public void testValidBookingCreate() {


        Booking book = new Booking();
        book.setCustomer(customer);
        book.setWorker(worker);
        book.setStartTime(new Date());
        book.setEndTime(new Date());
        Booking newBooking = bookingRepository.save(book);
        
        assertTrue(bookingService.create(newBooking).isPresent());
    }
    
    @Test
    public void testCancelBooking() {
    	Booking booking = new Booking();
        booking.setCustomer(customer);
        booking.setWorker(worker);
        booking.setStartTime(new Date());
        booking.setEndTime(new Date());
        Booking cancelBooking = bookingRepository.save(booking);
        
        assertTrue(bookingService.cancel(cancelBooking.getId()).isPresent());
    }
    
    @Test
    public void testUpdateBooking() {
    	Booking booking = new Booking();

        booking.setCustomer(customer);
        booking.setWorker(worker);
        booking.setStartTime(new Date());
        booking.setEndTime(new Date());
        Booking updateBooking = bookingRepository.save(booking);
        
        assertTrue(bookingService.update(updateBooking).isPresent());
    }
    
    @Test
    public void testValidBookingGet() {
    	Booking booking = new Booking();

        booking.setCustomer(customer);
        booking.setWorker(worker);
        booking.setStartTime(new Date());
        booking.setEndTime(new Date());
        Booking newBooking = bookingRepository.save(booking);
        
        assertTrue(bookingService.get(newBooking.getId()).isPresent());
    }
    
    @Test
    public void testInvalidBookingGet() {
    	Booking booking = new Booking();

        booking.setCustomer(customer);
        booking.setWorker(worker);
        booking.setStartTime(new Date());
        booking.setEndTime(new Date());
        Booking newBooking = bookingRepository.save(booking);
        
        assertFalse(bookingService.get(67890).isPresent());  	
    }
}
