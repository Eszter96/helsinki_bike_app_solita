package solita.assignment.bikeapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import solita.assignment.bikeapp.models.Station;

public interface StationRepository extends JpaRepository <Station, String> {
}
