package com.rmit.sept.agme.model;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = Booking.class)
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    @NotNull
    @ManyToOne
    User user;

    @NotBlank
    String name;

    @NotBlank
    String message;

    @NotNull
    NotificationType type;

    boolean shown;

    Date createdAt;
    Date modifiedAt;

    public Notification(User user, NotificationType type, String name, String message){
        this.user = user;
        this.type = type;
        this.name = name;
        this.message = message;
    }

    @PrePersist
    protected void onCreate(){
        this.createdAt = new Date();
        this.shown = false;
    }

    @PreUpdate
    protected void onUpdate(){
        this.modifiedAt = new Date();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public NotificationType getType() {
        return type;
    }

    public void setType(NotificationType type) {
        this.type = type;
    }

    public boolean isShown() {
        return shown;
    }

    public void setShown(boolean shown) {
        this.shown = shown;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
