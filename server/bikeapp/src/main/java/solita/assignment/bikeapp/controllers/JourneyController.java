package solita.assignment.bikeapp.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import solita.assignment.bikeapp.models.Journey;
import solita.assignment.bikeapp.repositories.JourneyRepository;

import java.sql.ResultSet;
import java.util.*;

@CrossOrigin("*")
@RestController
@RequestMapping("journeys")
public class JourneyController {
    @Autowired
    JourneyRepository journeyService;

    @GetMapping("getAllJourney")
    public List<Journey> getAllJourney() throws JsonProcessingException {
        return journeyService.findAll();
    }

    @GetMapping("getJourneys/{dateOf}/{date}")
    public Collection<Journey> getAllJourney(@PathVariable("dateOf") String dateOf, @PathVariable("date") String date) throws JsonProcessingException {

        if (dateOf.equals("Departure date")) {
            return journeyService.findJourneysByDepDate(date);
        } else {
            return journeyService.findJourneysByRepDate(date);
        }
    }

    @GetMapping("getStatsForDepStations")
    public List<Object[]> getStatsForDepStations() {
        return journeyService.getStatsForDeps();
    }

    @GetMapping("getStatsForRetStations")
    public List<Object[]> getStatsForRetStations() {
        return journeyService.getStatsForRets();
    }

}
