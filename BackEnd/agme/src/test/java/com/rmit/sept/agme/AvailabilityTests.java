package com.rmit.sept.agme;


import com.rmit.sept.agme.model.*;
import com.rmit.sept.agme.repositories.AdminRepository;
import com.rmit.sept.agme.repositories.AvailabilityRepository;
import com.rmit.sept.agme.repositories.UserRepository;
import com.rmit.sept.agme.services.ServiceNameService;
import com.rmit.sept.agme.services.WorkerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.validation.ConstraintViolationException;
import java.time.LocalTime;

import static org.junit.Assert.assertTrue;

@SpringBootTest
public class AvailabilityTests {
    @Autowired
    AvailabilityRepository availabilityRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ServiceNameService serviceNameService;

    @Autowired
    WorkerService workerService;

    Worker worker;

    static boolean initialized = false;

    @BeforeEach
    public void setUp(){
        if(!initialized){
            initialized = true;

            serviceNameService.create("Service Name");
            ServiceName mockService = serviceNameService.getByService("Service Name").iterator().next();

            User work = new User();
            work.setAddress("31 fakeplace drive, suburbs");
            work.setUsername("ValidWorkerAvailability@mail.com");
            work.setFirstName("Jose");
            work.setLastName("Azurro");
            work.setPassword("wordpass");
            work.setRole("DEFAULT_ROLE");
            User newWorker = userRepository.save(work);
            workerService.create(newWorker.getId(), mockService).get();
        }

        worker = workerService.getByUser(userRepository.findByUsername("ValidWorker@mail.com")).get();
    }

    @Test
    public void testValidAvailabilityCreate(){
        Availability availability = new Availability(LocalTime.now(),worker,1);
        Availability savedAvailability = availabilityRepository.save(availability);

        assertTrue(savedAvailability != null);
    }

    @Test
    public void testInvalidTimeAvailabilityCreate(){
        Availability availability = new Availability();
        availability.setDay(1);
        availability.setWorker(worker);

        ConstraintViolationException exception = null;
        try {
            Availability savedAvailability = availabilityRepository.save(availability);
        }catch (ConstraintViolationException e){
            exception = e;
        }

        assertTrue(exception != null);
    }

    @Test
    public void testInvalidWorkerAvailabilityCreate(){
        Availability availability = new Availability();
        availability.setDay(1);
        LocalTime time  = LocalTime.now();
        time.minusMinutes(time.getMinute());
        availability.setTimeSlot(time);

        ConstraintViolationException exception = null;
        try {
            Availability savedAvailability = availabilityRepository.save(availability);
        }catch (ConstraintViolationException e){
            exception = e;
        }

        assertTrue(exception != null);
    }
}
