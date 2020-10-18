package com.rmit.sept.agme.services;

import com.rmit.sept.agme.model.Admin;
import com.rmit.sept.agme.model.User;
import com.rmit.sept.agme.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {
    @Autowired
    AdminRepository adminRepository;

    public Optional<Admin> getByUser(User user) {
        Iterable<Admin> admins = adminRepository.getByUser(user);

        if(admins.iterator().hasNext())
            return Optional.of(admins.iterator().next()); //admin found
        else
            return Optional.empty(); //No admin found
    }

    public Optional<Admin> update(Admin worker){
        if(!adminRepository.findById(worker.getId()).isPresent())
            return Optional.empty(); //No admin with

        return Optional.of( adminRepository.save(worker)); //Admin updated
    }

    public Optional<Admin> create(Admin admin){
        return Optional.of(adminRepository.save(admin));
    }
}
