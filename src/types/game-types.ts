export type genreType = { id: number; name: string; slug: string };
export type gameType = {
  id: number;
  name: string;
  slug: string;
  thumbnail: string;
  rating: string;
  release_date: string;
  genres: genreType[];
  platform: {
    id: number;
    name: string;
    slug: string;
  };
};
