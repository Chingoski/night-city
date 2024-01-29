import { useParams } from "react-router-dom";
import UpdateListing from "../components/MyListings/UpdateListing";

function UpdateListingPage() {
  const params = useParams();
  return <UpdateListing listingID={params.listingID} />;
}

export default UpdateListingPage;
