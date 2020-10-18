package com.rmit.sept.agme;

import com.rmit.sept.agme.model.Customer;
import com.rmit.sept.agme.model.User;
import com.rmit.sept.agme.repositories.CustomerRepository;
import com.rmit.sept.agme.repositories.UserRepository;
import com.rmit.sept.agme.services.CustomerService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class CustomerServiceTests {

    @Autowired
    UserRepository userRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    CustomerService customerService;

    @Test
    public void testValidCustomerCreate() {
        User cust = new User();
        cust.setAddress("13 realplace drive, suburbs");
        cust.setUsername("ValidCreate@mail.com");
        cust.setFirstName("Juan");
        cust.setLastName("Rosso");
        cust.setPassword("password");
        cust.setRole("DEFAULT_ROLE");
        User newUser = userRepository.save(cust);
        assertTrue(customerService.create(newUser.getId()).isPresent());
    }

    @Test
    public void testInvalidCustomerCreate() {
        User cust = new User();
        cust.setAddress("13 realplace drive, suburbs");
        cust.setUsername("InvalidCreate@mail.com");
        cust.setFirstName("Juan");
        cust.setLastName("Rosso");
        cust.setPassword("password");
        cust.setRole("DEFAULT_ROLE");
        User newUser = userRepository.save(cust);
        assertFalse(customerService.create(12345).isPresent());
    }
    @Test
    public void testValidCustomerGet() {
        User cust = new User();
        cust.setAddress("13 realplace drive, suburbs");
        cust.setUsername("ValidGet@mail.com");
        cust.setFirstName("Juan");
        cust.setLastName("Rosso");
        cust.setPassword("password");
        cust.setRole("DEFAULT_ROLE");
        User newUser = userRepository.save(cust);
        Customer customer = new Customer(newUser);
        Customer newCustomer = customerRepository.save(customer);
        assertTrue(customerService.get(newCustomer.getId()).isPresent());
    }

    @Test
    public void testInvalidCustomerGet() {
        User cust = new User();
        cust.setAddress("13 realplace drive, suburbs");
        cust.setUsername("InvalidGet@mail.com");
        cust.setFirstName("Juan");
        cust.setLastName("Rosso");
        cust.setPassword("password");
        cust.setRole("DEFAULT_ROLE");
        User newUser = userRepository.save(cust);
        Customer customer = new Customer(newUser);
        Customer newCustomer = customerRepository.save(customer);
        assertFalse(customerService.get(12345).isPresent());
    }

    @Test
    public void testValidCustomerUpdate() {
        User cust = new User();
        cust.setAddress("13 realplace drive, suburbs");
        cust.setUsername("ValidUpdate@mail.com");
        cust.setFirstName("Juan");
        cust.setLastName("Rosso");
        cust.setPassword("password");
        cust.setRole("DEFAULT_ROLE");
        User newUser = userRepository.save(cust);
        Customer customer = new Customer(newUser);
        Customer newCustomer = customerRepository.save(customer);
        assertTrue(customerService.update(newCustomer).isPresent());
    }

    @Test
    public void testInvalidCustomerUpdate() {
        User cust = new User();
        cust.setAddress("13 realplace drive, suburbs");
        cust.setUsername("InvalidUpdate@mail.com");
        cust.setFirstName("Juan");
        cust.setLastName("Rosso");
        cust.setPassword("password");
        cust.setRole("DEFAULT_ROLE");
        User newUser = userRepository.save(cust);
        Customer customer = new Customer(newUser);
        Customer newCustomer = customerRepository.save(customer);
        assertFalse(customerService.update(new Customer(cust)).isPresent());
    }

}
