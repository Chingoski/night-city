import axios from "axios";
import host from "../host";

import { json } from "react-router-dom";

import { redirect } from "react-router-dom";

export async function loader() {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${host}/api/auth/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.status !== 204) {
    throw json({ message: response.statusText }, { status: response.status });
  }
  localStorage.removeItem("token");
  redirect("/auth");
}
