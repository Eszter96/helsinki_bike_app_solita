import axios from "axios";
import Moment from "moment";

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
      console.log(error);
    }
    console.log(response);
    return Promise.all(response.data);
  };
}

export default new JourneyService();
