package com.rmit.sept.agme;


import com.rmit.sept.agme.model.*;
import com.rmit.sept.agme.repositories.AvailabilityRepository;
import com.rmit.sept.agme.repositories.NotificationRepository;
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
public class NotificationsTests {

    @Autowired
    UserRepository userRepository;

    @Autowired
    NotificationRepository notificationRepository;

    @Test
    public void testValidNotification(){
        User user = new User();
        user.setAddress("31 fakeplace drive, suburbs");
        user.setUsername("ValidNotification@mail.com");
        user.setFirstName("Jose");
        user.setLastName("Azurro");
        user.setPassword("wordpass");
        user.setRole("DEFAULT_ROLE");
        User savedUser = userRepository.save(user);

        Notification savedNotification = notificationRepository.save(
                new Notification(savedUser, NotificationType.NEUTRAL, "Test", "test"));

        assertTrue(savedNotification != null);

    }

    @Test
    public void testInvalidNameAvailabilityCreate(){
        User user = new User();
        user.setAddress("31 fakeplace drive, suburbs");
        user.setUsername("InvalidName@mail.com");
        user.setFirstName("Jose");
        user.setLastName("Azurro");
        user.setPassword("wordpass");
        user.setRole("DEFAULT_ROLE");
        User savedUser = userRepository.save(user);

        Notification notification = new Notification();
        notification.setUser(user);
        notification.setType(NotificationType.NEUTRAL);
        notification.setMessage("test");

        ConstraintViolationException exception = null;
        try {
            notificationRepository.save(notification);
        }catch (ConstraintViolationException e){
            exception = e;
        }

        assertTrue(exception != null);
    }

    @Test
    public void testInvalidMessageNotificationCreate(){
        User user = new User();
        user.setAddress("31 fakeplace drive, suburbs");
        user.setUsername("InvalidMessage@mail.com");
        user.setFirstName("Jose");
        user.setLastName("Azurro");
        user.setPassword("wordpass");
        user.setRole("DEFAULT_ROLE");
        User savedUser = userRepository.save(user);

        Notification notification = new Notification();
        notification.setUser(user);
        notification.setType(NotificationType.NEUTRAL);
        notification.setName("Test");

        ConstraintViolationException exception = null;
        try {
            notificationRepository.save(notification);
        }catch (ConstraintViolationException e){
            exception = e;
        }

        assertTrue(exception != null);
    }
}
