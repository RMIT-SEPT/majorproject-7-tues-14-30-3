package com.rmit.sept.agme.repositories;

import com.rmit.sept.agme.model.Admin;
import com.rmit.sept.agme.model.User;
import org.springframework.data.repository.CrudRepository;

public interface AdminRepository extends CrudRepository<Admin, Long> {

    Iterable<Admin> getByUser(User user);
}
