import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080";

class JourneyService {
  getJourneysFromDB = async (dateOf, date) => {
    date = date.toISOString();
    let response;
    try {
      response = await axios.get(
        REST_API_BASE_URL + "/journeys/getJourneys/" + dateOf + "/" + date
      );
    } catch (error) {
      return [];
    }

    if (response) {
      return Promise.all(response.data);
    } else {
      return [];
    }
  };
}

export default new JourneyService();
