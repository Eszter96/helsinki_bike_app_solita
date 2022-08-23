import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080";

class JourneyService {
  getAllJourney = async () => {
    let response;
    try {
      //response = await axios.get(REST_API_BASE_URL + "/journeys/getAllJourney");
    } catch (error) {
      console.log(error);
    }
    //return response.data;
  };
}

export default new JourneyService();
