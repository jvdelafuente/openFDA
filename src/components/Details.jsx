import "./details.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Header from "./Header";
import waterM from "../assets/watermark.png";

const API_KEY = "2WQfIohrFXbBHVM3O0Ptm0APlGRvOHiR7mDuBCcO";

const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const url = `https://api.fda.gov/drug/event.json?search=safetyreportid:${id}&api_key=${API_KEY}`;
        console.log("URL:", url);

        const response = await fetch(url);
        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data.results.length > 0) {
          setDetails(data.results[0]);
        } else {
          setDetails(null);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
        setDetails(null);
      }
    };

    fetchDetails();
  }, [id]);

  return (
    <div className="details-container">
      <Header />
      <div className="prospecto">
        <h4>
          Read the entire package leaflet carefully before you start using this
          medicine because it contains important information for you.
        </h4>
        <p>
          Follow the instructions for administering the medicine exactly as
          contained in this leaflet or as instructed by your doctor, pharmacist
          or nurse.
        </p>
        <ul>
          <li>Keep this leaflet, you may need to read it again.</li>
          <li>If you need advice or more information, ask your pharmacist.</li>
          <li>
            If you experience any side effects, consult your doctor, pharmacist
            or nurse, even if they are side effects not listed in this leaflet.
          </li>
        </ul>
      </div>
      <Box
        sx={{
          width: "50vw",
          m: "10px 0px 100px 0px",
          p: 2,
          "@media (max-width: 520px)": {
            width: "80vw",
          },
        }}
      >
        <h2 className="details-texth2">Details</h2>
        <Typography id="details-modal-description" sx={{ mt: 2 }}>
          <strong>Medicine:</strong>{" "}
          {details?.patient?.drug[0].medicinalproduct || "No Medicinal Product"}
        </Typography>
        <Typography
          sx={{
            mt: 2,
          }}
        >
          <strong>Adverse Event:</strong>{" "}
          {details?.patient?.reaction
            ?.map((r) => r.reactionmeddrapt)
            .join(", ") || "No Reaction"}
        </Typography>

        <Typography sx={{ mt: 2 }}>
          <strong>Usage: </strong>
          {details?.patient?.drug[0].drugindication || "No Medicinal Product"}
        </Typography>
          <Typography sx={{ mt: 2 }}>
          <strong>Company: </strong>
          {details?.reportduplicate?.duplicatesource|| "No Medicinal Product"}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Consumption: </strong>
          {details?.patient?.drug[0].openfda?.route.join(", ") ||
            "No Medicinal Product"}
        </Typography>
      
        <Typography sx={{ mt: 2 }}>
          <strong>Group: </strong>
          {details?.patient?.drug[0].openfda?.pharm_class_moa ||
            "No Medicinal Product"}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Type: </strong>
          {details?.patient?.drug[0].openfda?.product_type.join(", ") ||
            "No Medicinal Product"}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Classification: </strong>
          {details?.patient?.drug[0].openfda?.pharm_class_cs?.join(", ") ||
            "No Medicinal Product"}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Country:</strong>{" "}
          {details?.primarysource?.reportercountry || "No Description"}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Report Date:</strong>{" "}
          {details?.receivedate
            ? `${details?.receivedate.substring(
                0,
                4
              )}-${details?.receivedate.substring(
                4,
                6
              )}-${details?.receivedate.substring(6, 8)}`
            : "No Date"}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Safety Report ID:</strong>{" "}
          {details?.safetyreportid || "No Safety Report ID"}
        </Typography>
      </Box>
      <img id="waterM" src={waterM} alt="" />
    </div>
  );
};

export default Details;
