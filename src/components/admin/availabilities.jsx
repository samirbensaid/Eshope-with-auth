import axios from "axios";
import { useEffect, useState } from "react";
import useMode from "../zustand/useMode";
import useBasket from "../zustand/useBasket";
export default function Availabilities() {
  const [data, setData] = useState([]);
  const { mode, setMode } = useMode();
  let token = JSON.parse(window.localStorage.getItem("token"));
  if (!mode) {
    document.body.style.background = "black";
  } else {
    document.body.style.background = "white";
  }
  const fetchData = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await axios.get(
      "https://reals-api-staging.ewm.dev/api/availabilities",
      config
    );
    setData(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {!mode ? (
        <p className="text-white">
          Availabilities page{" "}
          <button className="text-white" onClick={setMode}>
            dark
          </button>
        </p>
      ) : (
        <p className="text-black">
          Availabilities page
          <button className="text-black" onClick={setMode}>
            dark
          </button>
        </p>
      )}
    </div>
  );
}
