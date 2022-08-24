import { useState } from "react";
import DatePicker from "../components/DatePicker";
import JourneyTable from "../components/JourneyTable";
import SplitButton from "../components/SplitButton";

export default function Journeys() {
  const [dateFilterOption, setOption] = useState("Return date");
  const [date, setDate] = useState(new Date("2021-05-18"));
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "100%",
          maxWidth: "1000px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <p
            style={{
              marginRight: "20px",
              color: "#949494",
            }}
          >
            Find by
          </p>
          <SplitButton setOption={setOption} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <p
            style={{
              marginRight: "20px",
              color: "#949494",
            }}
          >
            For date
          </p>
          <DatePicker setDate={setDate} option={dateFilterOption} />
        </div>
      </div>
      <div
        style={{
          marginTop: "20px",
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
          zIndex: "0",
        }}
      >
        <JourneyTable dateOf={dateFilterOption} date={date} />
      </div>
    </div>
  );
}
