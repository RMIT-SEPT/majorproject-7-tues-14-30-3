package com.rmit.sept.agme;

import com.rmit.sept.agme.model.ServiceName;
import com.rmit.sept.agme.model.User;
import com.rmit.sept.agme.model.Worker;
import com.rmit.sept.agme.repositories.UserRepository;
import com.rmit.sept.agme.repositories.WorkerRepository;
import com.rmit.sept.agme.services.ServiceNameService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class WorkerTests {
    @Autowired
    WorkerRepository workerRepository;

    @Autowired
    UserRepository userRepository;

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
    public void testCreatedDate(){
        User account = new User();
        account.setPassword("password");
        account.setAddress("adsadasdasdsa");
        account.setLastName("sdfsdfsdf");
        account.setFirstName("sgrgergerg");
        account.setUsername("createdDate@gmail.com");
        account.setRole("DEFAULT_ROLE");
        account.setRole("DEFAULT_ROLE");
        userRepository.save(account);
        Worker worker = new Worker(account);
        worker.setService(mockService);
        Worker newWorker = workerRepository.save(worker);

        assertThat(newWorker.getCreatedAt()).isNotNull();
    }

    @Test
    public void testModifiedDate(){
        User account = new User();
        account.setPassword("password");
        account.setAddress("adsadasdasdsa");
        account.setLastName("sdfsdfsdf");
        account.setFirstName("sgrgergerg");
        account.setUsername("ModifiedDate@gmail.com");
        account.setRole("DEFAULT_ROLE");
        userRepository.save(account);
        Worker worker = new Worker(account);
        worker.setService(mockService);
        Worker newWorker = workerRepository.save(worker);
        newWorker.setAccepted(true);
        Worker updatedWorker = workerRepository.save(newWorker);

        assertThat(updatedWorker.getModifiedAt()).isNotNull();
    }
}
