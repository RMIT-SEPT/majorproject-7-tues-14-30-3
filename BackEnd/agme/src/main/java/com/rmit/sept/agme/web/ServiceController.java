package com.rmit.sept.agme.web;

import com.rmit.sept.agme.model.ServiceName;
import com.rmit.sept.agme.services.ServiceNameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/service")
@CrossOrigin
public class ServiceController {
    @Autowired
    ServiceNameService serviceNameService;

    //Create new customer from existing account
    @PostMapping("")
    public ResponseEntity<?> createService(@RequestParam("service") String service){

        //Create new worker from existing account
        Optional<ServiceName> savedService = serviceNameService.create(service);
        if(!savedService.isPresent()){ //No account found
            return new ResponseEntity<>("Service not unique", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(savedService, HttpStatus.CREATED); //new service object return
    }

    //Get all services
    @GetMapping("/all")
    public ResponseEntity<?> getAllServices(){
        //Get all services from repo
        Iterable<ServiceName> services = serviceNameService.getAll();

        if(!services.iterator().hasNext()){//no services in repo
            return new ResponseEntity<>("No Service Found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(services,HttpStatus.OK); //Array of services returned
    }
}
