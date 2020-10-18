package com.rmit.sept.agme;


import com.rmit.sept.agme.model.Availability;
import com.rmit.sept.agme.model.ServiceName;
import com.rmit.sept.agme.model.User;
import com.rmit.sept.agme.model.Worker;
import com.rmit.sept.agme.repositories.AvailabilityRepository;
import com.rmit.sept.agme.repositories.UserRepository;
import com.rmit.sept.agme.services.AvailabilityService;
import com.rmit.sept.agme.services.ServiceNameService;
import com.rmit.sept.agme.services.WorkerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertTrue;

@SpringBootTest
public class AvailabilityServiceTests {
    @Autowired
    AvailabilityRepository availabilityRepository;

    @Autowired
    AvailabilityService availabilityService;

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
            work.setUsername("ValidWorkerAvailabilityService@mail.com");
            work.setFirstName("Jose");
            work.setLastName("Azurro");
            work.setPassword("wordpass");
            work.setRole("DEFAULT_ROLE");
            User newWorker = userRepository.save(work);
            workerService.create(newWorker.getId(), mockService).get();
        }

        worker = workerService.getByUser(userRepository.findByUsername("ValidWorkerAvailabilityService@mail.com")).get();
    }

    @Test
    public void testValidDayAvailabilityGet(){
        Availability availability = new Availability(LocalTime.now(),worker,1);
        Availability savedAvailability = availabilityRepository.save(availability);

        Iterable<LocalTime> availabilities = availabilityService.getByDay(1,worker.getId());

        assertTrue(availabilities.iterator().hasNext());
    }

    @Test
    public void testBadDayAvailabilityGet(){
        Availability availability = new Availability(LocalTime.now(),worker,1);
        Availability savedAvailability = availabilityRepository.save(availability);

        Iterable<LocalTime> availabilities = availabilityService.getByDay(0,worker.getId());

        assertTrue(!availabilities.iterator().hasNext());
    }

    @Test
    public void testValidDateAvailabilityGet(){
        LocalDate today = LocalDate.now();

        Availability availability = new Availability(LocalTime.now(),worker, today.getDayOfWeek().getValue());
        Availability savedAvailability = availabilityRepository.save(availability);

        Iterable<LocalTime> availabilities = availabilityService.getByDate(today,worker.getId());

        assertTrue(availabilities.iterator().hasNext());
    }

    @Test
    public void testBadDateAvailabilityGet(){
        LocalDate today = LocalDate.now();

        Availability availability = new Availability(LocalTime.now(),worker, today.getDayOfWeek().getValue());
        Availability savedAvailability = availabilityRepository.save(availability);

        Iterable<LocalTime> availabilities = availabilityService.getByDate(today.plusDays(1),worker.getId());

        assertTrue(availabilities.iterator().hasNext());
    }
}
