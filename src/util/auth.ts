import { json, redirect } from "react-router-dom";
import axios from "axios";
import host from "../host";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function redirectToAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth");
  }
  return null;
}

export function redirectToHomeLoader() {
  const token = getAuthToken();
  if (token) {
    return redirect("/");
  }
  return null;
}

export async function submitLoginData(email: string, password: string) {
  try {
    const response = await axios.post(`${host}/api/auth/login`, {
      email: email,
      password: password,
    });

    if (response.status !== 200) {
      throw json({ message: response.statusText }, { status: response.status });
    }
    const token = response.data.meta.auth.token;
    localStorage.setItem("token", token);
  } catch {
    throw new Error("Sign in unsuccessful!");
  }
}
