import { createBrowserRouter } from "react-router-dom";

import RootLayoutPage from "../pages/RootLayoutPage/RootLayoutPage";
import HomePage from "../pages/HomePage";
import TradeOffersPage from "../pages/TradeOffersPage";
import MyListingsPage from "../pages/MyListingsPage";
import MyProfilePage from "../pages/MyProfilePage";
import ContactUsPage from "../pages/ContactUsPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AuthPage from "../pages/AuthPage/AuthPage";
import CreateTradePage from "../pages/CreateTradePage";

import { loader as homePageLoader } from "../pages/HomePage";
import { loader as myListingsLoader } from "../pages/MyListingsPage";
import { redirectToAuthLoader } from "../util/auth";
import { redirectToHomeLoader } from "../util/auth";
import { loader as userLoader } from "../pages/MyProfilePage";
// import CreateNewListingPage from "../pages/CreateNewListingPage";
import UpdateListingPage from "../pages/UpdateListingPage";

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
        loader: userLoader,
      },
      {
        path: "contact-us",
        element: <ContactUsPage />,
      },
      {
        path: "create-trade/:listingID",
        element: <CreateTradePage />,
        loader: userLoader,
      },
      // {
      //   path: "new-listing",
      //   element: <CreateNewListingPage />,
      //   loader: userLoader,
      // },
      {
        path: "update-listing/:listingID",
        element: <UpdateListingPage />,
        loader: userLoader,
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
