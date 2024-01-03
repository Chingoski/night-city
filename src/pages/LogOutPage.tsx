import axios from "axios";
import host from "../host";

import { json } from "react-router-dom";

import { redirect } from "react-router-dom";

export async function action() {
  const response = await axios.post(`${host}/api/auth/logout`);
  if (response.status !== 200) {
    throw json({ message: response.statusText }, { status: response.status });
  }
  localStorage.removeItem("token");
  return redirect("/auth");
}
