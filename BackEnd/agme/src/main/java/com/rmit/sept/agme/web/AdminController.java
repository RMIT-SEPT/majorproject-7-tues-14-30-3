package com.rmit.sept.agme.web;

import com.rmit.sept.agme.model.Admin;
import com.rmit.sept.agme.model.User;
import com.rmit.sept.agme.security.JwtTokenProvider;
import com.rmit.sept.agme.services.AdminService;
import com.rmit.sept.agme.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {
    @Autowired
    private AdminService adminService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    //Get admin by a valid jwt
    @GetMapping("")
    public ResponseEntity<?> getAdmin(@RequestHeader("Authorization") String jwt){
        try{
            Long userId = tokenProvider.getUserIdFromJWT(jwt);

            //Get user from repo
            Optional<User> user = userService.get(userId);
            if(!user.isPresent()){ //No user saved with userId
                return new ResponseEntity<>("Invalid User Id", HttpStatus.NOT_FOUND);
            }

            //Get worker by account from repo
            Optional<Admin> admin = adminService.getByUser(user.get());
            if(!admin.isPresent()){
                return new ResponseEntity<>("No Admin Found", HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(admin,HttpStatus.OK); //Admin from repo returned

        } catch(Exception e){
            return new ResponseEntity<>("Bad Jwt", HttpStatus.NOT_FOUND); //Bad Jwt string format
        }
    }

    //Update admin object
    @PutMapping("")
    public ResponseEntity<?> updateAdmin(@Valid @RequestBody Admin admin, BindingResult result){
        if(result.hasErrors()) { //Invalid admin object in request body
            return new ResponseEntity<>("Invalid Admin Object", HttpStatus.BAD_REQUEST);
        }

        //Update worker account in repo
        Optional<User> savedUser = userService.update(admin.getUser());
        if(!savedUser.isPresent()) //Bad account (bad id or non unique email
            return new ResponseEntity<>("Bad Account", HttpStatus.NOT_FOUND);

        //Update worker in repo
        Optional<Admin> savedAdmin = adminService.update(admin);
        if(!savedAdmin.isPresent()) //No worker found
            return new ResponseEntity<>("Worker Not Found", HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(savedAdmin, HttpStatus.OK); //Updated worker returned
    }

}