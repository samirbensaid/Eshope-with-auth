import axios from "axios";
import { useEffect, useState } from "react";

export default function Availabilities() {
  const [data, setData] = useState([]);

  let token = JSON.parse(window.localStorage.getItem("token"));

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
  return <div>Availabilities page</div>;
}
