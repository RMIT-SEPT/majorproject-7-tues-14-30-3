package com.rmit.sept.agme;


import com.rmit.sept.agme.model.Admin;
import com.rmit.sept.agme.model.User;
import com.rmit.sept.agme.repositories.AdminRepository;
import com.rmit.sept.agme.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class AdminTests {
    @Autowired
    AdminRepository adminRepository;

    @Autowired
    UserRepository userRepository;

    @Test
    public void testCreatedDate(){
        User account = new User();
        account.setPassword("password");
        account.setAddress("7 Street somewhere");
        account.setLastName("Apple");
        account.setFirstName("Person");
        account.setUsername("AdminCreate@gmail.com");
        account.setRole("DEFAULT_ROLE");
        userRepository.save(account);
        Admin admin = new Admin(account);
        Admin newAdmin = adminRepository.save(admin);
        assertThat(newAdmin.getCreatedAt()).isNotNull();
    }

    @Test
    public void testModifiedDate(){
        User account = new User();
        account.setPassword("password");
        account.setAddress("adsadasdasdsa");
        account.setLastName("sdfsdfsdf");
        account.setFirstName("sgrgergerg");
        account.setUsername("adminMod1@gmail.com");
        account.setRole("DEFAULT_ROLE");

        User account2 = new User();

        account2.setPassword("password2");
        account2.setAddress("testing street");
        account2.setLastName("replace");
        account2.setFirstName("bob");
        account2.setUsername("adminMod2@gmail.com");
        account2.setRole("DEFAULT_ROLE");

        userRepository.save(account);
        userRepository.save(account2);

        Admin admin = new Admin(account);
        Admin newAdmin = adminRepository.save(admin);
        newAdmin.setUser(account2);
        Admin updatedAdmin = adminRepository.save(newAdmin);

        assertThat(updatedAdmin.getModifiedAt()).isNotNull();
    }
}
