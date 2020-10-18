package com.rmit.sept.agme;

import com.rmit.sept.agme.model.User;
import org.junit.Before;
import org.junit.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class UserValidatorTests {
    private Validator validator;

    @Before
    public void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    public void testAccountSuccess() {
        User contact = new User();
        contact.setUsername("sam@gmail.com");
        contact.setPassword("Password123");
        contact.setFirstName("Sam");
        contact.setLastName("Brooks");
        contact.setAddress("24 York Street Sunshine");
        contact.setRole("DEFAULT_ROLE");
        Set<ConstraintViolation<User>> violations = validator.validate(contact);
        assertTrue(violations.isEmpty());
    }

    @Test
    public void testAccountPasswordTooShortFailure() {
        User contact = new User();
        contact.setUsername("sam@gmail.com");
        contact.setPassword("Pa");
        contact.setFirstName("Sam");
        contact.setLastName("Brooks");
        contact.setAddress("24 York Street Sunshine");
        contact.setRole("DEFAULT_ROLE");
        Set<ConstraintViolation<User>> violations = validator.validate(contact);
        assertFalse(violations.isEmpty());
    }

    @Test
    public void testAccountPasswordTooLongFailure() {
        User contact = new User();
        contact.setUsername("sam@gmail.com");
        contact.setPassword("passwrodcarbustrucksshcwoaodnssseodddgsjskfhsgahdjsjshsjfhcgshcj123");
        contact.setFirstName("Sam");
        contact.setLastName("Brooks");
        contact.setAddress("24 York Street Sunshine");
        contact.setRole("DEFAULT_ROLE");
        Set<ConstraintViolation<User>> violations = validator.validate(contact);
        assertFalse(violations.isEmpty());
    }

    @Test
    public void testAccountPasswordFieldBlankFailure() {
        User contact = new User();
        contact.setUsername("sam@gmail.com");
        contact.setFirstName("Sam");
        contact.setLastName("Brooks");
        contact.setAddress("24 York Street Sunshine");
        contact.setRole("DEFAULT_ROLE");
        Set<ConstraintViolation<User>> violations = validator.validate(contact);
        assertFalse(violations.isEmpty());
    }

    @Test
    public void testAccountEmailFailure() {
        User contact = new User();
        contact.setUsername("samgmail.com");
        contact.setPassword("Password123");
        contact.setFirstName("Sam");
        contact.setLastName("Brooks");
        contact.setAddress("24 York Street Sunshine");
        contact.setRole("DEFAULT_ROLE");
        Set<ConstraintViolation<User>> violations = validator.validate(contact);
        assertFalse(violations.isEmpty());
    }

    @Test
    public void testAccountFirstNameEmpty() {
        User contact = new User();
        contact.setUsername("sam@gmail.com");
        contact.setPassword("Password123");
        contact.setFirstName("");
        contact.setLastName("Brooks");
        contact.setAddress("24 York Street Sunshine");
        contact.setRole("DEFAULT_ROLE");
        Set<ConstraintViolation<User>> violations = validator.validate(contact);
        assertFalse(violations.isEmpty());
    }

    @Test
    public void testAccountAddressTooShortFailure() {
        User contact = new User();
        contact.setUsername("sam@gmail.com");
        contact.setPassword("Password123");
        contact.setFirstName("Sam");
        contact.setLastName("Brooks");
        contact.setAddress("qw");
        contact.setRole("DEFAULT_ROLE");
        Set<ConstraintViolation<User>> violations = validator.validate(contact);
        assertFalse(violations.isEmpty());
    }

    @Test
    public void testAccountAddressTooLongFailure() {
        User contact = new User();
        contact.setUsername("sam@gmail.com");
        contact.setPassword("Password123");
        contact.setFirstName("Sam");
        contact.setLastName("Brooks");
        contact.setAddress("qwdgdgdgdgddgdghjiwfweufbbcjsnubwefyujdhwydhakxjadyhwhudkhadhjsjdhfefwefw" +
                "dfffffffffffsfdsfsfsdfsfsdfsfsfsfsdfsdfsfsfsfsdfsdfsdfsdfefewfwefwefwefwfwfwefwefwefwefwf Toorak");
        contact.setRole("DEFAULT_ROLE");
        Set<ConstraintViolation<User>> violations = validator.validate(contact);
        assertFalse(violations.isEmpty());
    }

    @Test
    public void testAccountAddressBlankFailure() {
        User contact = new User();
        contact.setUsername("sam@gmail.com");
        contact.setPassword("Password123");
        contact.setFirstName("Sam");
        contact.setLastName("Brooks");
        contact.setRole("DEFAULT_ROLE");
        Set<ConstraintViolation<User>> violations = validator.validate(contact);
        assertFalse(violations.isEmpty());
    }

    @Test
    public void testAccountEmailBlankFailure() {
        User contact = new User();
        contact.setPassword("Password123");
        contact.setFirstName("Sam");
        contact.setLastName("Brooks");
        contact.setAddress("24 York Street Sunshine");
        contact.setRole("DEFAULT_ROLE");
        Set<ConstraintViolation<User>> violations = validator.validate(contact);
        assertFalse(violations.isEmpty());
    }
}
