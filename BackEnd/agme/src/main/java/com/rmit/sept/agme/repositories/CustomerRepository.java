package com.rmit.sept.agme.repositories;

import com.rmit.sept.agme.model.Customer;
import com.rmit.sept.agme.model.User;
import org.springframework.data.repository.CrudRepository;

public interface CustomerRepository extends CrudRepository<Customer, Long> {

    Iterable<Customer> getByUser(User user);
}
