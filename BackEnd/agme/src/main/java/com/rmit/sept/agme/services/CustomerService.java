package com.rmit.sept.agme.services;

import com.rmit.sept.agme.model.Customer;
import com.rmit.sept.agme.model.User;
import com.rmit.sept.agme.repositories.CustomerRepository;
import com.rmit.sept.agme.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {
    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    UserRepository userRepository;

    //Private save used by update and create
    private Customer saveOrUpdate(Customer customer){
        return customerRepository.save(customer);
    }

    public Optional<Customer> get(long id){
        return customerRepository.findById(id);
    }

    public Optional<Customer> getByUser(User user) {
        Iterable<Customer> customers = customerRepository.getByUser(user);

        if(customers.iterator().hasNext())
            return Optional.of(customers.iterator().next()); //Customer found
        else
            return Optional.empty(); //No customer found
    }

    //Customer created from an account
    public Optional<Customer> create(long userId){
        Optional<User> userAccount = userRepository.findById(userId);
        if(!userAccount.isPresent()){
            return Optional.empty(); //create failed, no user with userId found
        }

        //New customer created
        Customer newCustomer = new Customer(userAccount.get());
        return Optional.of(saveOrUpdate(newCustomer));
    }

    public Optional<Customer> update(Customer customer){
        if(!customerRepository.findById(customer.getId()).isPresent())
            return Optional.empty(); //Customer not found

        return Optional.of(saveOrUpdate(customer)); //Customer updated
    }
}
