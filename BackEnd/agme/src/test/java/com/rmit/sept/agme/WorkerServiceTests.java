package com.rmit.sept.agme;

import com.rmit.sept.agme.model.ServiceName;
import com.rmit.sept.agme.model.User;
import com.rmit.sept.agme.model.Worker;
import com.rmit.sept.agme.repositories.UserRepository;
import com.rmit.sept.agme.repositories.WorkerRepository;
import com.rmit.sept.agme.services.ServiceNameService;
import com.rmit.sept.agme.services.WorkerService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class WorkerServiceTests {

    @Autowired
    UserRepository userRepository;

    @Autowired
    WorkerRepository workerRepository;

    @Autowired
    WorkerService workerService;

    @Autowired
    ServiceNameService serviceNameService;

    ServiceName mockService;

    static boolean initialized = false;

    @BeforeEach
    public void setUp(){
        if(!initialized){
            serviceNameService.create("Service Name");
            initialized = true;
        }

        mockService = serviceNameService.getByService("Service Name").iterator().next();
    }

    @Test
    public void testValidWorkerCreate() {
        User work = new User();
        work.setAddress("26 Hill Avenue EastLand");
        work.setUsername("ValidCreate@gmail.com");
        work.setFirstName("Bob");
        work.setLastName("Builder");
        work.setPassword("password");
        work.setRole("DEFAULT_ROLE");
        User newUser = userRepository.save(work);
        assertTrue(workerService.create(newUser.getId(), mockService).isPresent());
    }

    @Test
    public void testInvalidWorkerCreate() {
        User work = new User();
        work.setAddress("132 Wayne Street Etihad");
        work.setUsername("InvalidCreate@gmail.com");
        work.setFirstName("Dominic");
        work.setLastName("Person");
        work.setPassword("password123");
        work.setRole("DEFAULT_ROLE");
        User newUser = userRepository.save(work);
        assertFalse(workerService.create(12345, mockService).isPresent());
    }
    @Test
    public void testValidWorkerGet() {
        User work = new User();
        work.setAddress("132 Wayne Street Etihad");
        work.setUsername("ValidGet@gmail.com");
        work.setFirstName("Dominic");
        work.setLastName("Person");
        work.setPassword("password123");
        work.setRole("DEFAULT_ROLE");
        User newUser = userRepository.save(work);
        Worker worker = new Worker(newUser);
        worker.setService(mockService);
        Worker newWorker = workerRepository.save(worker);
        assertTrue(workerService.get(newWorker.getId()).isPresent());
    }

    @Test
    public void testInvalidWorkerGet() {
        User work = new User();
        work.setAddress("26 Hill Avenue EastLand");
        work.setUsername("InvalidGet@gmail.com");
        work.setFirstName("Bob");
        work.setLastName("Builder");
        work.setPassword("password");
        work.setRole("DEFAULT_ROLE");
        User newUser = userRepository.save(work);
        Worker worker = new Worker(newUser);
        worker.setService(mockService);
        Worker newWorker = workerRepository.save(worker);
        assertFalse(workerService.get(12345).isPresent());
    }

    @Test
    public void testValidWorkerUpdate() {
        User work = new User();
        work.setUsername("ValidUpdate@gmail.com");
        work.setPassword("password123");
        work.setFirstName("Ashley");
        work.setLastName("Dale");
        work.setAddress("34 Albert Road Tower");
        work.setRole("DEFAULT_ROLE");
        User newUser = userRepository.save(work);
        Worker worker = new Worker(newUser);
        worker.setService(mockService);
        Worker newWorker = workerRepository.save(worker);
        assertTrue(workerService.update(newWorker).isPresent());
    }

    @Test
    public void testInvalidWorkerUpdate() {
        User work = new User();
        work.setUsername("InvalidUpdate@gmail.com");
        work.setPassword("password123");
        work.setFirstName("Ashley");
        work.setLastName("Dale");
        work.setAddress("34 Albert Road Tower");
        work.setRole("DEFAULT_ROLE");
        User newUser = userRepository.save(work);
        Worker worker = new Worker(newUser);
        worker.setService(mockService);
        Worker newWorker = workerRepository.save(worker);
        assertFalse(workerService.update(new Worker(work)).isPresent());
    }
}
