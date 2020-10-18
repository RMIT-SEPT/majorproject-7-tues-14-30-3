package com.rmit.sept.agme;

import com.rmit.sept.agme.model.Customer;
import com.rmit.sept.agme.model.User;
import com.rmit.sept.agme.repositories.CustomerRepository;
import com.rmit.sept.agme.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class CustomerTests {
    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    UserRepository userRepository;

    @Test
    public void testCreatedDate(){
        User account = new User();
        account.setPassword("password");
        account.setAddress("adsadasdasdsa");
        account.setLastName("sdfsdfsdf");
        account.setFirstName("sgrgergerg");
        account.setUsername("gmail@gmail.com");
        account.setRole("DEFAULT_ROLE");
        userRepository.save(account);
        Customer customer = new Customer(account);
        Customer newCustomer = customerRepository.save(customer);

        assertThat(newCustomer.getCreatedAt()).isNotNull();
    }

    @Test
    public void testModifiedDate(){
        User account = new User();
        account.setPassword("password");
        account.setAddress("adsadasdasdsa");
        account.setLastName("sdfsdfsdf");
        account.setFirstName("sgrgergerg");
        account.setUsername("gmail21@gmail.com");
        account.setRole("DEFAULT_ROLE");

        User account2 = new User();
        account2.setPassword("password2");
        account2.setAddress("testing street");
        account2.setLastName("replace");
        account2.setFirstName("bob");
        account2.setUsername("email22@gmail.com");
        account2.setRole("DEFAULT_ROLE");
        userRepository.save(account);
        userRepository.save(account2);
        Customer customer = new Customer(account);

        Customer newCustomer = customerRepository.save(customer);
        newCustomer.setUser(account2);
        Customer updatedCustomer = customerRepository.save(newCustomer);

        assertThat(updatedCustomer.getModifiedAt()).isNotNull();
    }
}
