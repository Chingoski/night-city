import { createBrowserRouter } from "react-router-dom";

import RootLayoutPage from "../pages/RootLayoutPage/RootLayoutPage";
import HomePage from "../pages/HomePage";
import TradeOffersPage from "../pages/TradeOffersPage";
import MyListingsPage from "../pages/MyListingsPage";
import MyProfilePage from "../pages/MyProfilePage";
import HelpPage from "../pages/HelpPage";
import ContactUsPage from "../pages/ContactUsPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayoutPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/trade-offers",
        element: <TradeOffersPage />,
      },
      {
        path: "/my-listings",
        element: <MyListingsPage />,
      },
      {
        path: "my-profile",
        element: <MyProfilePage />,
      },
      {
        path: "help",
        element: <HelpPage />,
      },
      {
        path: "contact-us",
        element: <ContactUsPage />,
      },
    ],
  },
]);

export default router;
