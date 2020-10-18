package com.rmit.sept.agme;


import com.rmit.sept.agme.model.Notification;
import com.rmit.sept.agme.model.NotificationType;
import com.rmit.sept.agme.model.User;
import com.rmit.sept.agme.repositories.NotificationRepository;
import com.rmit.sept.agme.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.validation.ConstraintViolationException;

import static org.junit.Assert.assertTrue;

@SpringBootTest
public class NotificationServiceTests {

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
        user.setUsername("InvalidName@mail.com");
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
