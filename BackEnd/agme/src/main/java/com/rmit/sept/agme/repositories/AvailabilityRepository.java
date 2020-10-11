package com.rmit.sept.agme.repositories;

import com.rmit.sept.agme.model.Availability;
import com.rmit.sept.agme.model.Worker;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface AvailabilityRepository extends CrudRepository<Availability, Long> {
    Iterable<Availability> getByDayAndWorker(int day, Worker worker);

    //Custom delete for worker for day
    @Transactional
    @Modifying
    @Query("DELETE FROM Availability WHERE worker.id = (:workerId) AND day = (:day)")
    void deleteByDayAndWorker(@Param("day")int day, @Param("workerId")long workerId);
}
