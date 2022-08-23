package solita.assignment.bikeapp;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import solita.assignment.bikeapp.CSVhandler.CSVreader;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class BikeappApplication {
	public static void main(String[] args) throws FileNotFoundException {

		SpringApplication.run(BikeappApplication.class, args);


	}

}
