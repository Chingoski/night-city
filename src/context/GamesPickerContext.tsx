import { createContext, useState } from "react";
import { gameType } from "../types/game-types";

type gamesPickerContextType = {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  gamesErrorMessage: string;
  setGamesErrorMessage: (gamesErrorMessage: string) => void;
  gameResults: gameType[];
  setGameResults: (gameResults: gameType[]) => void;
  pickedGames: gameType[];
  setPickedGames: (pickedGames: gameType[]) => void;
  resultsOpen: boolean;
  setResultsOpen: (resultsOpen: boolean) => void;
};

export const gamesPickerContext = createContext<gamesPickerContextType>({
  searchValue: "",
  setSearchValue: () => {},
  gamesErrorMessage: "",
  setGamesErrorMessage: () => {},
  gameResults: [],
  setGameResults: () => {},
  pickedGames: [],
  setPickedGames: () => {},
  resultsOpen: false,
  setResultsOpen: () => {},
});

const GamesPickerContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [pickedGames, setPickedGames] = useState<gameType[]>([]);
  const [gameResults, setGameResults] = useState<gameType[]>([]);
  const [gamesErrorMessage, setGamesErrorMessage] = useState("");
  const [resultsOpen, setResultsOpen] = useState(false);

  const value = {
    searchValue,
    setSearchValue,
    pickedGames,
    setPickedGames,
    gameResults,
    setGameResults,
    gamesErrorMessage,
    setGamesErrorMessage,
    resultsOpen,
    setResultsOpen,
  };

  return (
    <gamesPickerContext.Provider value={value}>
      {children}
    </gamesPickerContext.Provider>
  );
};

export default GamesPickerContextProvider;
