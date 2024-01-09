import axios from "axios";
import { getAuthToken } from "../util/auth";
import host from "../host";
import MyListings from "../components/MyListings/MyListings";

function MyListingsPage() {
  return <MyListings />;
}

export default MyListingsPage;

export async function loader() {
  const token = getAuthToken();
  const response = await axios.get(`${host}/api/auth/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return response.data.data;
}
