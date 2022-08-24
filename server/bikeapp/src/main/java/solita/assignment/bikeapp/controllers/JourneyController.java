package solita.assignment.bikeapp.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import solita.assignment.bikeapp.models.Journey;
import solita.assignment.bikeapp.repositories.JourneyRepository;

import java.util.Collection;
import java.util.List;

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
        if(dateOf=="Departure date") {
            return journeyService.findJourneysByDepDate(date);
        } else {
            return journeyService.findJourneysByRepDate(date);
        }
    }

}
