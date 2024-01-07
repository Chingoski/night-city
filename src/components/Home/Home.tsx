import { Flex, Button } from "@chakra-ui/react";

import { allListingsContext } from "../../context/AllListingsContext";
import { useContext, useEffect } from "react";

import axios from "axios";
import { getAuthToken } from "../../util/auth";
import updateURL from "../../util/request";

import TopMenu from "../TopMenu/TopMenu";

function Home() {
  const { allListings, setAllListings, isLoading, setIsLoading, url, setUrl } =
    useContext(allListingsContext);

  const fetchListings = async () => {
    setIsLoading(true);
    const token = getAuthToken();

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      if (response.data.meta.pagination.links.next) {
        const nextPage = updateURL(response.data.meta.pagination.links.next);
        setUrl(nextPage);
      } else {
        setUrl("");
      }

      const fetchedListings = response.data.data;
      const displayedListings = allListings.concat(fetchedListings);
      setAllListings(displayedListings);
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <Flex flexDirection="column" w="100%">
      <TopMenu />
      <Flex flexDirection="column"></Flex>
      {url !== "" && <Button onClick={fetchListings}>Load More</Button>}
    </Flex>
  );
}

export default Home;
