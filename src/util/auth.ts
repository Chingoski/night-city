import { redirect } from "react-router-dom";

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
