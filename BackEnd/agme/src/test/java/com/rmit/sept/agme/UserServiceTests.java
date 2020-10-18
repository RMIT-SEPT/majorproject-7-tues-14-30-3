package com.rmit.sept.agme;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import com.rmit.sept.agme.model.User;
import com.rmit.sept.agme.repositories.UserRepository;
import com.rmit.sept.agme.services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserServiceTests {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Test
    public void testUserServiceGet() {
        User account = new User();
        account.setUsername("bob@gmail.com");
        account.setPassword("password123");
        account.setFirstName("Bob");
        account.setLastName("Build");
        account.setAddress("26 Hill Avenue EastLand");
        account.setRole("DEFAULT_ROLE");

        User secondUser = userRepository.save(account);

        assertTrue(userService.get(secondUser.getId()).isPresent());

    }


    @Test
    public void testUserServiceUpdate() {
        User account = new User();
        account.setUsername("dominic21@gmail.com");
        account.setPassword("password123");
        account.setFirstName("Dominic");
        account.setLastName("Person");
        account.setAddress("2 Wayne Street Etihad");
        account.setRole("DEFAULT_ROLE");

        User secondUser = userRepository.save(account);

        assertTrue(userService.update(secondUser).isPresent());

    }

    @Test
    public void testInvalidUserServiceUpdate() {
        User account = new User();
        account.setId(1234L);
        account.setUsername("dominic@gmail.com");
        account.setPassword("password123");
        account.setFirstName("Dominic");
        account.setLastName("Person");
        account.setAddress("2 Wayne Street Etihad");
        account.setRole("DEFAULT_ROLE");

        assertFalse(userService.update(account).isPresent());

    }

    @Test
    public void testUserServiceCreate() {
        User account = new User();
        account.setUsername("ashley21@gmail.com");
        account.setPassword("password123");
        account.setFirstName("Ashley");
        account.setLastName("Dale");
        account.setAddress("34 Albert Road Tower");
        account.setRole("DEFAULT_ROLE");

        assertTrue(userService.saveUser(account).isPresent());
    }

    @Test
    public void testInvalidEmailDupUserServiceCreate() {
        User account = new User();
        account.setUsername("ashley@gmail.com");
        account.setPassword("password123");
        account.setFirstName("Ashley");
        account.setLastName("Dale");
        account.setAddress("34 Albert Road Tower");
        account.setRole("DEFAULT_ROLE");

        User secondUser = userRepository.save(account);

        assertFalse(userService.saveUser(secondUser).isPresent());
    }
}
