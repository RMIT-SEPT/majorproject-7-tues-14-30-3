package com.rmit.sept.agme.repositories;

import com.rmit.sept.agme.model.ServiceName;
import org.springframework.data.repository.CrudRepository;

public interface ServiceRepository extends CrudRepository<ServiceName, Long> {

    Iterable<ServiceName> getByService(String service);

}
