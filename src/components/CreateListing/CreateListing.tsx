import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import { userType } from "../../types/user-types";
import { tradePreferences } from "../../util/options";
import { navigationContext } from "../../context/NavigationContext";
import { gamesPickerContext } from "../../context/GamesPickerContext";
import { createListing } from "../../util/create-listing";

import { Flex, useStyleConfig, Heading, Text } from "@chakra-ui/react";
import CreateListingForm from "./CreateListingForm";
import SuccessModal from "../UI/SuccessModal";

const CreateListing: React.FC = () => {
  const { isCollapsed } = useContext(navigationContext);
  const styles = useStyleConfig("Home");

  const user = useLoaderData() as userType;
  const userID = user.id;

  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [listingDescription, setListingDescription] = useState("");
  const [selectedTradePreference, setSelectedTradePreference] = useState(
    tradePreferences[0].name
  );
  const [didSubmit, setDidSubmit] = useState(false);

  const { pickedGames, setPickedGames, setSearchValue } =
    useContext(gamesPickerContext);

  function descriptionHandler(value: string) {
    setFormErrorMessage("");
    setListingDescription(value);
  }

  function tradePreferenceHandler(value: string | null) {
    setSelectedTradePreference(value);
  }

  function createListingHandler() {
    if (listingDescription.length >= 20 && pickedGames.length > 0) {
      createListing(
        userID,
        pickedGames,
        listingDescription,
        selectedTradePreference,
        setFormErrorMessage,
        setPickedGames,
        setListingDescription,
        setSelectedTradePreference,
        setDidSubmit,
        setSearchValue
      );
    }
    if (pickedGames.length === 0) {
      setFormErrorMessage("Pick a game to list!");
    }
    if (listingDescription.length < 20) {
      setFormErrorMessage("Your listing description is too short!");
    }
  }

  useEffect(() => setFormErrorMessage(""), [pickedGames]);
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      marginBottom="15px"
      overflow="none"
      sx={{
        ...styles,
        width: isCollapsed
          ? "var(--collapsed-outlet-width)"
          : "var(--open-outlet-width)",
        marginLeft: isCollapsed
          ? "var(--collapsed-nav-width)"
          : "var(--open-nav-width)",
      }}
    >
      {!didSubmit ? (
        <>
          <Heading as="h1" mt="25px">
            Add Listing
          </Heading>
          <Text fontSize="1.1rem">Fill out the details to list your game </Text>
          <CreateListingForm
            selectedTradePreference={selectedTradePreference}
            formErrorMessage={formErrorMessage}
            setFormErrorMessage={setFormErrorMessage}
            listingDescription={listingDescription}
            descriptionHandler={descriptionHandler}
            tradePreferenceHandler={tradePreferenceHandler}
            createListingHandler={createListingHandler}
          />
        </>
      ) : (
        <SuccessModal message="You have successfully listed your trade!" />
      )}
    </Flex>
  );
};

export default CreateListing;
