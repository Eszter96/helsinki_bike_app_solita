package solita.assignment.bikeapp.CSVhandler;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import solita.assignment.bikeapp.models.Journey;
import solita.assignment.bikeapp.models.Station;
import solita.assignment.bikeapp.repositories.JourneyRepository;
import solita.assignment.bikeapp.repositories.StationRepository;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class CSVreader {
    @Autowired
    JourneyRepository journeyService;

    @Autowired
    StationRepository stationService;

    @PostConstruct
    public void getCSVFiles() {
        List<Station> stations = stationService.findAll();
        if(stations == null) {
            URL url = this.getClass()
                    .getClassLoader().getResource("data");

            // Reading only files in the directory
            try {
                List<File> files = Files.list(Paths.get(url.toURI()))
                        .map(Path::toFile)
                        .filter(File::isFile)
                        .collect(Collectors.toList());

                files.stream().forEach((file) -> SaveDataFromCSVFile(file));
            } catch (IOException | URISyntaxException e) {
                e.printStackTrace();
            }
        }
    }

    public void SaveDataFromCSVFile(File file) {
        String splitBy = ",";
        String line = "";
        try {
            //parsing a CSV file into BufferedReader class constructor
            BufferedReader br = new BufferedReader(new FileReader(file));
            String headerLine = br.readLine();
            if (headerLine.indexOf("Departure") > -1) {
                List<Journey> journeys = new ArrayList<>();
                while ((line = br.readLine()) != null)   //returns a Boolean value
                {
                    //System.out.println(line);
                    line = line.replace("Aalto-yliopisto (M), Korkeakouluaukio", "Aalto-yliopisto (M) Korkeakouluaukio");
                    line = line.replace("Aalto-yliopisto (M), Tietotie", "Aalto-yliopisto (M) Tietotie");

                    String[] journey = line.split(splitBy); // use comma as separator

                    Journey j = new Journey();

                    // Don't import journeys that lasted for less than ten seconds

                    if (!Arrays.stream(journey).anyMatch(""::equals)) {
                        if (Double.parseDouble(journey[6]) > 10 && Double.parseDouble(journey[7]) > 10) {
                            j.setDepDate(validateJourneyDates(journey[0]));
                            j.setRetDate(validateJourneyDates(journey[1]));

                            if (j.getDepDate() != null && j.getRetDate() != null) {

                                j.setDepStationName(journey[3]);
                                j.setRetStationName(journey[5]);
                                j.setDistance(Double.parseDouble(journey[6]));
                                j.setDuration(Double.parseDouble(journey[7]));
                                journeys.add(j);
                                //System.out.println(j);

                            }
                        }
                    }
                }
                journeyService.saveAll(journeys);
            } else {
                List<Station> stations = new ArrayList<>();
                while ((line = br.readLine()) != null)   //returns a Boolean value
                {
                    line = line.replace("Aalto-yliopisto (M), Korkeakouluaukio", "Aalto-yliopisto (M) Korkeakouluaukio");
                    line = line.replace("Aalto-yliopisto (M), Tietotie", "Aalto-yliopisto (M) Tietotie");
                    String station[] = line.split(splitBy);
                    Station s = new Station();
                    s.setStationNameSuomi(station[2]);
                    s.setAddress(station[5]);
                    s.setCity(station[7]);
                    s.setStationId(Long.valueOf(station[1]));
                    stations.add(s);
                }
                stationService.saveAll(stations);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public LocalDateTime validateJourneyDates(String strDate) {

        /* Check if date is 'null' */
        if (strDate == null) {
            return null;
        }
        /* Date is not 'null' */
        else {
            if (strDate.contains("T")) {
                String date[] = strDate.split("T");
                try {
                    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd");
                    dateFormat.setLenient(false);
                    Date d = dateFormat.parse(date[0]);
                    String dateFirstPart[] = date[0].split("-");
                    if (Integer.parseInt(dateFirstPart[0]) < 2021) {
                        return null;
                    }
                    int timeValues[] = Arrays.stream(date[1].split(":")).mapToInt(Integer::parseInt).toArray();
                    if (timeValues[0] > 24 || timeValues[1] > 60 || timeValues[2] > 60) {
                        return null;
                    }
                    return LocalDateTime.parse(strDate);
                } catch (Exception e) {
                    return null;
                }
            } else {
                return null;
            }
        }
    }

}
