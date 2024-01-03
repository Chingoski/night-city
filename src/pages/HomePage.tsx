import axios from "axios";
import Home from "../components/Home/Home";

function HomePage() {
  return <Home />;
}

export default HomePage;

export async function loader() {
  const response = await axios.get(
    "https://cf2c-46-217-94-68.ngrok-free.app/api/cities",
    {
      headers: {
        Authorization:
          "Bearer 2|mrnCLQZqRHidackEOP5ESbP6QHd9onGESJs3iknN41d6ea9d",
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    }
  );

  return response.data.data;
}
