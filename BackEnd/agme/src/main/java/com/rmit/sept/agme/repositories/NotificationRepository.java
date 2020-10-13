package com.rmit.sept.agme.repositories;

import com.rmit.sept.agme.model.Notification;
import com.rmit.sept.agme.model.User;
import org.springframework.data.repository.CrudRepository;

public interface NotificationRepository extends CrudRepository<Notification, Long> {
    Iterable<Notification> findByUserAndShown(User user, boolean shown);
}
