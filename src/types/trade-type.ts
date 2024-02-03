export type tradeType = {
  id: number;
  game_listing_id: number;
  trader_user_id: number;
  offered_amount: string;
  offered_games: [
    {
      id: number;
      name: string;
      slug: string;
      thumbnail: string;
      rating: string;
      release_date: string;
      genres: [
        {
          id: number;
          name: string;
          slug: string;
        }
      ];
      platform: {
        id: number;
        name: string;
        slug: string;
      };
    }
  ];
  owner_confirmed: boolean;
  trader_confirmed: boolean;
  status: string;
};
