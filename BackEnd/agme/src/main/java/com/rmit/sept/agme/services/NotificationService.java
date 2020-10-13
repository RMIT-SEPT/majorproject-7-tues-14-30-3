package com.rmit.sept.agme.services;

import com.rmit.sept.agme.model.Notification;
import com.rmit.sept.agme.model.User;
import com.rmit.sept.agme.repositories.NotificationRepository;
import com.rmit.sept.agme.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Iterator;
import java.util.Optional;

@Service
public class NotificationService {
    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    UserRepository userRepository;

    public Optional<Notification> createNotification(Notification notification){
        return Optional.of(notificationRepository.save(notification));
    }

    public Iterable<Notification> getUsersNotification(long userId){
        User user = userRepository.getById(userId);
        if(user == null){ //Bad user id
            return Collections.EMPTY_LIST;
        }

        Iterable<Notification> notifications = notificationRepository.findByUserAndShown(user, false);
        Iterator<Notification> iterator = notifications.iterator();

        while(iterator.hasNext()){//Update all notifications to be shown
            Notification updatedNotification = iterator.next();
            updatedNotification.setShown(true);
            notificationRepository.save(updatedNotification);
        }

        return notifications;
    }

    public Iterable<Notification> peekUserNotifications(User user){
        return notificationRepository.findByUserAndShown(user, false);
    }

}
