import { useState, useEffect } from "react";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import { CityType } from "../../shared/types";
import { toast } from "react-toastify";

type Props = {
  setCityKey: React.Dispatch<React.SetStateAction<string | undefined>>;
  setCityName: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const SearchBar = ({ setCityKey, setCityName }: Props) => {
  const [input, setInput] = useState<string>("");
  const [cities, setCities] = useState<Array<CityType>>([]);

  useEffect(() => {
    getCities();
  }, [input]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInput(e.target.value);
  };

  const getCities = async () => {
    try {
      const response = await axios.get(
        "http://dataservice.accuweather.com/locations/v1/cities/autocomplete",
        { params: { apikey: "0T4iEUmne18Bhf4NNjihAEaRTrEDJrAo" } }
      );
      setCities(response.data ?? []);
    } catch (error) {
      toast.error("Something went wrong while searching for your city...", {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }
  };

  return (
    <Autocomplete
      sx={{
        marginTop: "1rem",
      }}
      fullWidth
      autoHighlight
      options={cities}
      onChange={(_, city) => {
        setCityKey(city?.Key);
        setCityName(city?.LocalizedName);
      }}
      getOptionLabel={(city) => {
        return city.LocalizedName;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={(e) => handleInputChange(e)}
          label="City"
        />
      )}
    />
  );
};

export default SearchBar;
