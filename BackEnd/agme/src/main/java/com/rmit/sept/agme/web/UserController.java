package com.rmit.sept.agme.web;

import com.rmit.sept.agme.model.Role;
import com.rmit.sept.agme.model.User;
import com.rmit.sept.agme.payload.JWTLoginSuccessResponse;
import com.rmit.sept.agme.payload.LoginRequest;
import com.rmit.sept.agme.security.JwtTokenProvider;
import com.rmit.sept.agme.services.RoleService;
import com.rmit.sept.agme.services.UserService;
import com.rmit.sept.agme.validator.UserValidator;
import io.jsonwebtoken.lang.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.Arrays;
import java.util.Collection;
import java.util.Optional;

import static com.rmit.sept.agme.security.SecurityConstants.TOKEN_PREFIX;


@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private RoleService roleService;


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {
        if (result.hasErrors()) { //Bad user object
            return new ResponseEntity<>("Bad User", HttpStatus.BAD_REQUEST);
        }

        // Validate passwords match
        userValidator.validate(user, result);
        if (result.hasErrors()) {
            return new ResponseEntity<>("Invalid Password", HttpStatus.BAD_REQUEST);
        }

        /*Optional<Role> roleObject = roleService.getRole(role);
        if(!roleObject.isPresent()){
            return new ResponseEntity<>("Bad Role", HttpStatus.NOT_FOUND);
        }*/

        //user.setRole(Arrays.asList(roleObject.get()));

        Optional<User> newUser = userService.saveUser(user);

        if (!newUser.isPresent()) { //User creation fail, email not unique
            return new ResponseEntity<>("Email Must be Unique", HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>(newUser.get(), HttpStatus.CREATED);
    }


    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
        if (result.hasErrors()) { //Bad login object
            return new ResponseEntity<>("Bad login request", HttpStatus.BAD_REQUEST);
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication);

        //TODO maybe dont need the login success object
        return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt));
    }

    @GetMapping("")
    public ResponseEntity<?> getUserFromJwt(@RequestParam("jwt") String jwt){
        try{
            Long userId = tokenProvider.getUserIdFromJWT(jwt); //Interpret id form jwt

            Optional<User> user = userService.get(userId);
            if(!user.isPresent()){
                return new ResponseEntity<>("Bad Jwt", HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Bad Jwt", HttpStatus.BAD_REQUEST);
        }

    }
}