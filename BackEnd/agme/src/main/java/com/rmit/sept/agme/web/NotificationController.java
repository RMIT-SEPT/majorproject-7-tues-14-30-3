package com.rmit.sept.agme.web;

import com.rmit.sept.agme.model.Notification;
import com.rmit.sept.agme.model.User;
import com.rmit.sept.agme.security.JwtTokenProvider;
import com.rmit.sept.agme.services.NotificationService;
import com.rmit.sept.agme.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin
public class NotificationController {
    @Autowired
    NotificationService notificationService;

    @Autowired
    UserService userService;

    @Autowired
    JwtTokenProvider tokenProvider;

    //Get all new notifications
    //Notifications will only be returned once
    @GetMapping("")
    public ResponseEntity<?> getNotifications(@RequestHeader("Authorization") String jwt){
        try{
            Long userId = tokenProvider.getUserIdFromJWT(jwt);

            //Get user from repo
            Optional<User> user = userService.get(userId);
            if(!user.isPresent()){ //No user saved with userId
                return new ResponseEntity<>("Invalid User Id", HttpStatus.NOT_FOUND);
            }

            //Get notifications by account from repo
            Iterable<Notification> notifications = notificationService.getUsersNotification(userId);

            return new ResponseEntity<>(notifications, HttpStatus.OK); //Notifications from repo returned

        } catch(Exception e){
            return new ResponseEntity<>("Bad Jwt", HttpStatus.NOT_FOUND); //Bad Jwt string format
        }
    }

}
