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
        REST_API_BASE_URL + "/journeys/getStatsForDepStations"
      );
    } catch (error) {
      return [];
    }
    return response.data;
  };

  getStatsForRets = async () => {
    let response;
    try {
      response = await axios.get(
        REST_API_BASE_URL + "/journeys/getStatsForRetStations"
      );
    } catch (error) {
      return [];
    }
    return response.data;
  };
}

export default new StationService();
