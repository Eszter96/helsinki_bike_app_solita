package solita.assignment.bikeapp.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import solita.assignment.bikeapp.models.Station;
import solita.assignment.bikeapp.repositories.StationRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("stations")
public class StationController {
    @Autowired
    StationRepository stationService;

    @GetMapping("getAllStation")
    public List<Station> getAllStation() throws JsonProcessingException {
        return stationService.findAll();
    }

}
