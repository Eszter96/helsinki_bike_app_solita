package solita.assignment.bikeapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import solita.assignment.bikeapp.models.Journey;

public interface JourneyRepository extends JpaRepository <Journey, Long> {
}
