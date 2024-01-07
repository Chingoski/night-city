export type cityType = {
  id: number;
  name: string;
};

type cityResponseType = {
  meta: {
    pagination: {
      total: number;
      count: number;
      per_page: number;
      total_pages: number;
      links: {};
    };
    message: string;
    code: number;
  };
  data: cityType[];
};
export default cityResponseType;

export type cityIdType = number | null;
