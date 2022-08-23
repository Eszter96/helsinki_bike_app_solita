package solita.assignment.bikeapp.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jetbrains.annotations.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="journey")
public class Journey {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    Long id;

    @JsonFormat(pattern=("yyyy-MM-dd HH:mm"))
    @Column(name = "dep_date")
    LocalDateTime depDate;

    @JsonFormat(pattern=("yyyy-MM-dd HH:mm"))
    @Column(name = "ret_date")
    LocalDateTime retDate;

    // Don't need this info
/*    @Column(name = "dep_station_id")
    String depStationId;*/

    @Column(name = "dep_station_name")
    String depStationName;

    // Don't need this info
/*    @Column(name = "ret_station_id")
    String retStationId;*/

    @Column(name = "ret_station_Name")
    String retStationName;

    @Column(name = "covered_distance")
    Double distance;

    @Column(name = "duration")
    Double duration;
}
