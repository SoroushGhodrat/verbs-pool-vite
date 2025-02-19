import { Box, TextField, InputAdornment, IconButton, Zoom } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { no_verbs } from "../data/no"; // import your Verb type
import { en_verbs } from "../data/en"; // import your Verb type
import { HtmlTooltip } from "../styled/Styled";
import { useLanguage } from "../context/LanguageContext";

type Verb = {
  infinitiv?: string;
  presens?: string;
  preteritum?: string;
  perfektum?: string;
  imperative?: string;
  meaning?: string;
};
interface DataTableSearchBoxProps {
  onSearch: (filteredVerbs: Verb[], value: string) => void;
}

// Extract TextField into its own function
const SearchField: React.FC<DataTableSearchBoxProps> = ({ onSearch }) => {
  const { language } = useLanguage();
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);

    const filtered =
      language === "Norsk"
        ? no_verbs.filter((verb) => {
            return Object.values(verb).some((val) =>
              val.toLowerCase().includes(value.toLowerCase()),
            );
          })
        : en_verbs.filter((verb) => {
            return Object.values(verb).some((val) =>
              val.toLowerCase().includes(value.toLowerCase()),
            );
          });

    onSearch(filtered, value);
  };

  const handleClearInput = () => {
    setSearchValue("");

    onSearch([], ""); // reset to all verbs when input is cleared
  };

  return (
    <TextField
      id="outlined-basic"
      label="Hva leter etter du? 🤔"
      variant="outlined"
      // InputLabelProps={{ style: { padding: "0 10px" } }}
      fullWidth
          value={searchValue }

      onChange={handleInputChange}

      InputProps={{
        endAdornment: (
              <HtmlTooltip title="Fjern søk " placement="left" TransitionComponent={Zoom}>
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleClearInput}>
                <CloseIcon />
              </IconButton>
            </InputAdornment  >
          </HtmlTooltip>
        ),
      }}
    />
  );
};

// Use SearchField in DataTableSearchBox
const DataTableSearchBox: React.FC<DataTableSearchBoxProps> = (props) => {
  return (
    <Box my={5} pt={1}>
      <SearchField {...props} />
    </Box>
  );
};

export default DataTableSearchBox;
