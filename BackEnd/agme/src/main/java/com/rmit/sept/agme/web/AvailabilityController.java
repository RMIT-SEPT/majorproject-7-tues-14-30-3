package com.rmit.sept.agme.web;

import com.rmit.sept.agme.model.Availability;
import com.rmit.sept.agme.model.DayEnum;
import com.rmit.sept.agme.model.Worker;
import com.rmit.sept.agme.services.AvailabilityService;
import com.rmit.sept.agme.services.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/worker/availability")
@CrossOrigin
public class AvailabilityController {
    @Autowired
    AvailabilityService availabilityService;

    @Autowired
    WorkerService workerService;

    @GetMapping("")
    public ResponseEntity<?> getAvailabilities(@RequestParam(name = "workerId") Long workerId,
                                               @RequestParam(name = "date", required = false)@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate date){
        Optional<Worker> worker = workerService.get(workerId);
        if(!worker.isPresent()){ //No worker with workerid found in repo
            return new ResponseEntity<>("No Worker Found", HttpStatus.NOT_FOUND);
        }

        if(date != null){
            //Get availabilities for date (bookings considered)
            Collection<LocalTime> timeSlots = availabilityService.getByDate(date, workerId);

            return new ResponseEntity<>(timeSlots, HttpStatus.OK);
        }else{
            //Get week of availabilities
            Collection<Iterable<LocalTime>> days = new ArrayList<>();

            for(int i = 1; i <= 7; i++) { //get worker's availabilities for each day
                days.add(availabilityService.getByDay(i, workerId));
            }

            return new ResponseEntity<>(days, HttpStatus.OK);
        }
    }

    @PostMapping("")
    public ResponseEntity<?> setAvailabilities(@RequestBody List<LocalTime> timeSlots,
                                               @RequestParam("workerId") Long workerId, @RequestParam("day") int day){
        Optional<Worker> worker = workerService.get(workerId);
        if(!worker.isPresent()){
            return new ResponseEntity<>("No Worker Found", HttpStatus.NOT_FOUND);
        }

        Collection<LocalTime> savedTimeSlots = availabilityService.updateByDay(timeSlots, day, workerId);

        return new ResponseEntity<>(savedTimeSlots, HttpStatus.CREATED);
    }

}
