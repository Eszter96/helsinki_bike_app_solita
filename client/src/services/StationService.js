import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080";

class StationService {
  getStationsFromDB = async () => {
    let response;
    try {
      response = await axios.get(REST_API_BASE_URL + "/stations/getAllStation");
    } catch (error) {
      return [];
    }
    console.log(response.data);
    if (response) {
      return Promise.all(response.data);
    } else {
      return [];
    }
  };

  getStatsForDeps = async () => {
    let response;
    try {
      response = await axios.get(
        REST_API_BASE_URL + "/stations/getStatsForDepStations"
      );
    } catch (error) {
      return [];
    }
    console.log(response.data);
    if (response) {
      return Promise.all(response.data);
    } else {
      return [];
    }
  };

  getStatsForDeps = async () => {
    let response;
    try {
      response = await axios.get(
        REST_API_BASE_URL + "/stations/getStatsForRetStations"
      );
    } catch (error) {
      return [];
    }
    console.log(response.data);
    if (response) {
      return Promise.all(response.data);
    } else {
      return [];
    }
  };
}

export default new StationService();
