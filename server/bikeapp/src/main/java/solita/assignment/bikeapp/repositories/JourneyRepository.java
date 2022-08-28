package solita.assignment.bikeapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import solita.assignment.bikeapp.models.Journey;
import java.util.Collection;
import java.util.List;

public interface JourneyRepository extends JpaRepository <Journey, Long> {
    @Query(value = "select j " +
            "from Journey j " +
            "where CAST(j.depDate as date) = CAST(:date as date)")
    Collection<Journey> findJourneysByDepDate(@Param("date") String date);

    @Query(value = "select j " +
            "from Journey j " +
            "where CAST(j.retDate as date) = CAST(:date as date)")
    Collection<Journey> findJourneysByRepDate(@Param("date") String date);

    @Query(value = "SELECT dep_station_name, " +
            "COUNT(id) " +
            "FROM journey " +
            "GROUP BY dep_station_name", nativeQuery = true)
    List<Object[]> getStatsForDeps();

    @Query(value = "SELECT ret_station_name, " +
            "COUNT(id) " +
            "FROM journey " +
            "GROUP BY ret_station_name", nativeQuery = true)
    List<Object[]> getStatsForRets();

}
