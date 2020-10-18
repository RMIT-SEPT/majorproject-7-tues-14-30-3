package com.rmit.sept.agme;

import com.rmit.sept.agme.model.Admin;
import com.rmit.sept.agme.model.User;
import com.rmit.sept.agme.services.AdminService;
import com.rmit.sept.agme.services.ServiceNameService;
import com.rmit.sept.agme.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DataInitializer implements ApplicationListener<ContextRefreshedEvent> {
    boolean alreadySetup = false;
    
    @Autowired
    ServiceNameService serviceNameService;

    @Autowired
    UserService userService;

    @Autowired
    AdminService adminService;

    //Setup data
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event){
        if(alreadySetup){
            return;
        }

        //Services
        serviceNameService.create("Consult");
        serviceNameService.create("Appointment");

        //Roles(not currently used)

        //Admin user
        User user = new User();
        user.setPassword("admin1234");
        user.setConfirmPassword("admin1234");
        user.setUsername("admin@agme");
        user.setFirstName("Admin");
        user.setLastName("User");
        user.setAddress("Address");
        user.setRole("ADMIN");
        Optional<User> savedUser = userService.saveUser(user);

        adminService.create(new Admin(savedUser.get()));

        alreadySetup = true;
    }
}
