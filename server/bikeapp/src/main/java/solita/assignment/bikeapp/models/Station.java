package solita.assignment.bikeapp.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name="stations")

public class Station {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    Long id;

    @Column(name = "station_id")
    Long stationId;

    @Column(name = "station_name_suomi")
    String stationNameSuomi;

    @Column(name = "address")
    String address;

    @Column(name = "city")
    String city;

}
