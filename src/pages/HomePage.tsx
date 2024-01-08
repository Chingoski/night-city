import axios from "axios";
import host from "../host";

import { json } from "react-router-dom";

import Home from "../components/Home/Home";
import { getAuthToken } from "../util/auth";

function HomePage() {
  return <Home />;
}

export default HomePage;

export async function loader() {
  const token = getAuthToken();
  const response = await axios.get(`${host}/api/cities`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });
  if (response.status !== 200) {
    throw json({ message: response.statusText }, { status: response.status });
  }

  return response.data.data;
}
