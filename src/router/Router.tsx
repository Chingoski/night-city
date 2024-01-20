import { createBrowserRouter } from "react-router-dom";

import RootLayoutPage from "../pages/RootLayoutPage/RootLayoutPage";
import HomePage from "../pages/HomePage";
import TradeOffersPage from "../pages/TradeOffersPage";
import MyListingsPage from "../pages/MyListingsPage";
import MyProfilePage from "../pages/MyProfilePage";
import ContactUsPage from "../pages/ContactUsPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AuthPage from "../pages/AuthPage/AuthPage";

import { loader as homePageLoader } from "../pages/HomePage";
import { loader as myListingsLoader } from "../pages/MyListingsPage";
import { redirectToAuthLoader } from "../util/auth";
import { redirectToHomeLoader } from "../util/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayoutPage />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: redirectToAuthLoader,

    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homePageLoader,
      },
      {
        path: "/trade-offers",
        element: <TradeOffersPage />,
      },
      {
        path: "/my-listings",
        element: <MyListingsPage />,
        loader: myListingsLoader,
      },
      {
        path: "my-profile",
        element: <MyProfilePage />,
      },
      {
        path: "contact-us",
        element: <ContactUsPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
    loader: redirectToHomeLoader,
  },
]);

export default router;
