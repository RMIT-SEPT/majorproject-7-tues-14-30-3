package com.rmit.sept.agme.services;

import com.rmit.sept.agme.model.User;
import com.rmit.sept.agme.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public Optional<User> saveUser (User newUser){
        if(userRepository.findByUsername(newUser.getUsername()) != null){
            return Optional.empty(); //Email not unique
        }

      /*  newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
        //Username has to be unique (exception)
        // Make sure that password and confirmPassword match
        // We don't persist or show the confirmPassword
        return userRepository.save(newUser);
       */
        try{
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            //Username has to be unique (exception)
            newUser.setUsername(newUser.getUsername());
            // Make sure that password and confirmPassword match
            // We don't persist or show the confirmPassword
            newUser.setConfirmPassword("");
            return Optional.of(userRepository.save(newUser));

        }catch (Exception e){
            return Optional.empty(); //Username not valid
        }

    }

    public Optional<User> get(long id){
        return userRepository.findById(id);
    }

    public Optional<User> update(User user){
        if(!userRepository.findById(user.getId()).isPresent())
            return Optional.empty(); //Account not found in repo

        //Enforcing uniqueness of emails
        User oldUser = userRepository.findByUsername(user.getUsername());
        if(oldUser != null &&
                oldUser.getId() != user.getId()){
            return Optional.empty(); //save failed by non-unique email
        }

        return Optional.of(userRepository.save(user)); //successful save
    }


}
