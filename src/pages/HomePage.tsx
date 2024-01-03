import axios from "axios";
import host from "../host";

import { json } from "react-router-dom";

import Home from "../components/Home/Home";

function HomePage() {
  return <Home />;
}

export default HomePage;

export async function loader() {
  //get token function
  const response = await axios.get(`${host}/api/cities`, {
    headers: {
      Authorization:
        "Bearer 6|3TgO7voUSwo2md2Hsz50zZuj5cfOZVrBBF1FJoHH7bf127b5",
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });
  if (response.status !== 200) {
    throw json({ message: response.statusText }, { status: response.status });
  }
  return response.data.data;
}
