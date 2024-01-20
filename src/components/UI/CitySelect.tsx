import { Select } from "@chakra-ui/react";
import { cityType } from "../../types/city-types";
import { FieldInputProps } from "formik";

function CitySelect(props: {
  cities: cityType[];
  field: FieldInputProps<string> | null | undefined;
  background?: string;
}) {
  const cities = props.cities;
  const field = props.field;
  const backgroundStyle = props.background
    ? { background: props.background }
    : {};

  return (
    <Select {...field} {...backgroundStyle} placeholder="City">
      {cities.map((city) => (
        <option key={city.id} value={city.id}>
          {city.name}
        </option>
      ))}
    </Select>
  );
}

export default CitySelect;
