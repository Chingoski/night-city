import { getAuthToken } from "./auth";

const token = getAuthToken();

export const getHeaders = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": "true",
};
