package com.rmit.sept.agme.repositories;

import com.rmit.sept.agme.model.User;
import com.rmit.sept.agme.model.Worker;
import org.springframework.data.repository.CrudRepository;

public interface WorkerRepository extends CrudRepository<Worker, Long> {

    Iterable<Worker> getByUser(User user);

    Iterable<Worker> getByAccepted(boolean accepted);
}
