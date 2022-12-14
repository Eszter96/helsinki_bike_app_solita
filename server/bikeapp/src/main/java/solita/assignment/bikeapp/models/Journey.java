package solita.assignment.bikeapp.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

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

    @Column(name = "dep_date")
    LocalDateTime depDate;

    @Column(name = "ret_date")
    LocalDateTime retDate;

    @Column(name = "dep_station_name")
    String depStationName;

    @Column(name = "ret_station_Name")
    String retStationName;

    @Column(name = "covered_distance")
    Double distance;

    @Column(name = "duration")
    Double duration;
}
