import { Flex } from "@chakra-ui/react";

import { allListingsContext } from "../../context/AllListingsContext";
import { useContext, useEffect } from "react";

import axios from "axios";
import host from "../../host";
import { getAuthToken } from "../../util/auth";

import TopMenu from "../TopMenu/TopMenu";
import ListingCard from "../ListingCard/ListingCard";

function Home() {
  const { allListings, setAllListings } = useContext(allListingsContext);

  const fetchListings = async () => {
    const token = getAuthToken();
    const response = await axios.get(`${host}/api/game_listings`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (response.status !== 200) {
      setAllListings([]);
    }

    setAllListings(response.data.data);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <Flex flexDirection="column" w="100%">
      <TopMenu />
      <Flex>
        {/* {allListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))} */}
      </Flex>
    </Flex>
  );
}

export default Home;
