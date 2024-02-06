import { gameType } from "./game-types";
import { listingType } from "./listing-type";
import { userType } from "./user-types";

export type tradeType = {
  id: number;
  game_listing_id: number;
  trader_user_id: number;
  offered_amount: string;
  offered_games: gameType[];
  owner_confirmed: boolean;
  trader_confirmed: boolean;
  status: string;
  trader?: {
    data: userType;
  };
  game_listing?: {
    data: listingType;
  };
};
