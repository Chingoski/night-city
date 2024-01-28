import axios from "axios";
import host from "../host";
import { json } from "react-router-dom";
import { getAuthToken } from "./auth";

export async function updateUser(
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  dateOfBirth: string,
  address: string,
  cityId: string
) {
  try {
    const token = getAuthToken();

    const response = await axios.put(
      `${host}/api/users/${id}`,
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber,
        address: address,
        date_of_birth: dateOfBirth,
        city_id: cityId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw json({ message: response.statusText }, { status: response.status });
    }
  } catch {
    throw new Error("The update was unsuccessful");
  }
}

export async function resetPassword(
  currentPassword: string,
  newPassword: string,
  newPasswordConfirmation: string
) {
  try {
    const token = getAuthToken();

    const response = await axios.post(
      `${host}/api/auth/password/reset`,
      {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirmation,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw json({ message: response.statusText }, { status: response.status });
    }
  } catch {
    throw new Error("The update was unsuccessful");
  }
}
