package com.rmit.sept.agme.repositories;

import com.rmit.sept.agme.model.Notification;
import com.rmit.sept.agme.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface NotificationRepository extends CrudRepository<Notification, Long> {
    @Query("SELECT n FROM Notification n WHERE n.user.id = (:userId) AND n.shown = false")
    Iterable<Notification> getCurrentByUser(@Param("userId")long userId);
}
