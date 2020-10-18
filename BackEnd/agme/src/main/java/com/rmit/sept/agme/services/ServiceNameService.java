package com.rmit.sept.agme.services;

import com.rmit.sept.agme.model.ServiceName;
import com.rmit.sept.agme.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ServiceNameService {
    @Autowired
    ServiceRepository serviceRepository;

    //Create new service in repo
    public Optional<ServiceName> create(String service){
        if(serviceRepository.getByService(service).iterator().hasNext()){
            return Optional.empty(); //Service name is not unique
        }

        //Create new service in repo
        return Optional.of(serviceRepository.save(new ServiceName(service)));
    }

    //Get service by name
    public Iterable<ServiceName> getByService(String service){
        return serviceRepository.getByService(service);
    }

    //Get all services
    public Iterable<ServiceName> getAll(){
        return serviceRepository.findAll();
    }

}
