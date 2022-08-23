package solita.assignment.bikeapp.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import solita.assignment.bikeapp.models.Journey;
import solita.assignment.bikeapp.repositories.JourneyRepository;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("journeys")
public class JourneyController {
    JourneyRepository journeyService;

    @GetMapping("getAllJourney")
    public List<Journey> getAllJourney() throws JsonProcessingException {
        return journeyService.findAll();
    }
}
