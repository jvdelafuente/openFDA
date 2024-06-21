/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import "./search.css";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";
import Header from "./Header";
import waterM from "../assets/watermark.png";
import CircularProgress from "@mui/material/CircularProgress";

const API_KEY = "2WQfIohrFXbBHVM3O0Ptm0APlGRvOHiR7mDuBCcO";
const SEARCH_API = "https://api.fda.gov/drug/event.json";

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setIsNotFound(false);

    const trimmedSearchTerm = searchTerm.trim().toLowerCase();

    if (!trimmedSearchTerm) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);

    try {
      let url = `${SEARCH_API}?api_key=${API_KEY}&search=(
        patient.drug.medicinalproduct:${trimmedSearchTerm}
        openfda.brand_name:${trimmedSearchTerm} OR
        openfda.generic_name:${trimmedSearchTerm}
        )&limit=30`;

      let response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();

      if (data.error) {
        console.error("Error fetching:", data.error);
        setError(data.error.message);
        setSearchResults([]);
        setIsLoading(false);
        return;
      }

      let filteredResults = data.results.filter((result) => {
        const medicinalProduct =
          result.patient?.drug[0]?.medicinalproduct?.toLowerCase() || "";
        const brandNames =
          result.patient?.drug[0]?.openfda?.brand_name?.map((name) =>
            name.toLowerCase()
          ) || [];
        const genericNames =
          result.patient?.drug[0]?.openfda?.generic_name?.map((name) =>
            name.toLowerCase()
          ) || [];
        const reportCountry = result.primarysource?.reportercountry?.toLowerCase() || "";

        return (
          (medicinalProduct.includes(trimmedSearchTerm) ||
          brandNames.includes(trimmedSearchTerm) ||
          genericNames.includes(trimmedSearchTerm)) &&
          reportCountry === "us"
        );
      });

      if (filteredResults.length === 0) {
        setIsNotFound(true);
      }

      setSearchResults(filteredResults);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError("An unexpected error occurred");
      setSearchResults([]);
      setIsLoading(false);
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="search-container">
      <Header />
      <Input
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onSubmit={handleSubmit}
      />


      {isLoading && (
        <CircularProgress
          sx={{
            m: "25px",
            color: "#0063A7",
          }}
        />
      )}

      {error && <div className="error-message">{error}</div>}
      
      {isNotFound && !isLoading && (
        <div className="not-found-message">Not found...</div>
      )}

      {searchResults.length > 0 && (
        <Grid
          className="grid-container"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          container
          direction="column"
        >
          {searchResults.length > 0 && (
            <Grid
              sx={{
                width: "40vw",
                "@media (max-width: 1015px)": {
                  display: "flex",
                  width: "75vw",
                  flexDirection: "column",
                  "@media (max-width: 710px)": {
                    p: "0px",
                  },
                },
              }}
              item
              className="search-result"
            >
              <List className="grid-list">
                {searchResults.map((result, index) => (
                  <ListItem
                    sx={{
                      marginBottom: "20px",
                      "@media (max-width: 1225px)": {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      },
                    }}
                    key={index}
                    className="search-result-item"
                  >
                    <ListItemText
                      primary={
                        result.patient?.drug[0]?.openfda?.brand_name?.[0] ||
                        result.patient?.drug[0]?.medicinalproduct ||
                        "Error en el nombre"
                      }
                      secondary={
                        <Typography variant="body2">
                          <strong>Medicine:</strong>{" "}
                          {result.patient?.drug[0]?.medicinalproduct ||
                            "No Medicinal Product"}
                        </Typography>
                      }
                    />
                    <Button
                      sx={{
                        m: "0px 20px 0px 0px",
                        textTransform: "none",
                        width: "120px",
                        color: "#fff",
                        bgcolor: "#0063a7",
                        borderRadius: "0px",
                        textAlign: "center",
                        transition: "all 0.3s",
                        "&:hover": {
                          outline: "1px solid #0063a7",
                          bgcolor: "#fff",
                          color: "#0063a7",
                        },
                        "&:focus": {
                          transform: "scale(1.05)",
                        },
                        "@media (max-width: 710px)": {
                          width: "100px",
                        },
                      }}
                      onClick={() => handleViewDetails(result.safetyreportid)}
                      variant="outlined"
                    >
                      View Details
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Grid>
          )}
        </Grid>
      )}
      <img id="waterM" src={waterM} alt="" />
    </div>
  );
};

export default Search;
