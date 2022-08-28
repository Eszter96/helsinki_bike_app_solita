package solita.assignment.bikeapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import solita.assignment.bikeapp.models.Journey;
import solita.assignment.bikeapp.models.Station;

import java.util.Collection;

public interface StationRepository extends JpaRepository <Station, String> {

}
