package solita.assignment.bikeapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import solita.assignment.bikeapp.models.Journey;

import java.util.Collection;

public interface JourneyRepository extends JpaRepository <Journey, Long> {
    @Query(value = "select j " +
            "from Journey j " +
            "where CAST(j.depDate as date) = CAST(:date as date)")
    Collection<Journey> findJourneysByDepDate(@Param("date") String date);

    @Query(value = "select j " +
            "from Journey j " +
            "where CAST(j.retDate as date) = CAST(:date as date)")
    Collection<Journey> findJourneysByRepDate(@Param("date") String date);

}
