export type listingType = {
  id: number;
  description: string;
  game_id: number;
  game: {
    id: number;
    name: string;
    slug: string;
    thumbnail: string;
    rating: string;
    release_date: string;
  };
  owner_id: number;
  owner: {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    phone_number: string;
    address: string;
    date_of_birth: string;
    city_id: number;
  };
  trade_preference: "string";
  platform_id: number;
  platform: {
    id: number;
    name: string;
    slug: string;
  };
};
