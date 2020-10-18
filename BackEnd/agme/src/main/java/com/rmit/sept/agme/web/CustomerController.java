package com.rmit.sept.agme.web;

import com.rmit.sept.agme.model.Customer;
import com.rmit.sept.agme.model.User;
import com.rmit.sept.agme.security.JwtTokenProvider;
import com.rmit.sept.agme.services.CustomerService;
import com.rmit.sept.agme.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    //Create new customer from currently logged in user
    @PostMapping("")
    public ResponseEntity<?> createCustomer(@RequestHeader("Authorization") String jwt){
        try {
            Long id = tokenProvider.getUserIdFromJWT(jwt);

            //Customer created from existing account in repo
            Optional<Customer> savedCustomer = customerService.create(id);

            if(!savedCustomer.isPresent()){ //No user saved with accountId
                return new ResponseEntity<>("Invalid User Id", HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(savedCustomer, HttpStatus.CREATED); //New customer returned

        } catch(Exception e){
            return new ResponseEntity<>("Bad Jwt", HttpStatus.NOT_FOUND); //Bad Jwt string format
        }
    }

    //Get customer by a valid jwt
    @GetMapping("")
    public ResponseEntity<?> getCustomer(@RequestHeader("Authorization") String jwt){
        try{
            Long userId = tokenProvider.getUserIdFromJWT(jwt);

            //Get user from repo
            Optional<User> user = userService.get(userId);
            if(!user.isPresent()){ //No user saved with userId
                return new ResponseEntity<>("Invalid User Id", HttpStatus.NOT_FOUND);
            }

            //Get customer by account from repo
            Optional<Customer> customer = customerService.getByUser(user.get());
            if(!customer.isPresent()){
                return new ResponseEntity<>("No Customer Found", HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(customer,HttpStatus.OK); //Customer from repo returned

        } catch(Exception e){
            return new ResponseEntity<>("Bad Jwt", HttpStatus.NOT_FOUND); //Bad Jwt string format
        }
    }

    @PutMapping("")
    public ResponseEntity<?> updateCustomer(@Valid @RequestBody Customer customer, BindingResult result){
        if(result.hasErrors()) { //Invalid customer object in request body
            return new ResponseEntity<>("Invalid Customer Object", HttpStatus.BAD_REQUEST);
        }

        //Update worker account in repo
        Optional<User> savedUser = userService.update(customer.getUser());
        if(!savedUser.isPresent()) //Bad user (bad id or non unique email)
            return new ResponseEntity<>("Bad User", HttpStatus.NOT_FOUND);

        //Customer updated in repo
        Optional<Customer> savedCustomer = customerService.update(customer);
        if(!savedCustomer.isPresent()) //No customer found
            return new ResponseEntity<>("Customer Not Found", HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(savedCustomer, HttpStatus.OK); //Updated customer returned
    }
}
