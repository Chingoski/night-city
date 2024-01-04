import { Select } from "@chakra-ui/react";
import { cityType } from "../../types/city-types";
import { FieldInputProps } from "formik";

function CitySelect(props: {
  cities: cityType[];
  field: FieldInputProps<string> | null | undefined;
}) {
  const cities = props.cities;
  const field = props.field;

  return (
    <Select {...field} placeholder="City">
      {cities.map((city) => (
        <option key={city.id} value={city.id}>
          {city.name}
        </option>
      ))}
    </Select>
  );
}

export default CitySelect;
