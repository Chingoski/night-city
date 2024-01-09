export type userType = {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  date_of_birth: string;
  city_id: number;
  city: {
    id: number;
    name: string;
  };
};

export type getUserResponse = {
  meta: {
    message: string;
    code: number;
  };
  data: userType;
};
