import { useParams } from "react-router-dom";
import CreateTrade from "../components/CreateTrade/CreateTrade";

function CreateTradePage() {
  const params = useParams();

  return <CreateTrade listingID={`${params.listingID}`} />;
}

export default CreateTradePage;
