import "./input.css";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import { TextField } from "@mui/material";
import logoS from "../assets/logo.png";

const Input = ({ value, onChange, onSubmit }) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className="input-container">
      <form className="input-paper" onSubmit={handleFormSubmit}>
        <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          value={value}
          onChange={onChange}
          sx={{
            bgcolor: "#fff",
            boxSizing: "border-box",
            width: "200px",
            margin: "0px 10px 0px 10px",
            transition: "width 0.2s ease-in-out",
            "& .MuiInputLabel-root": {
              color: "#000",
              fontFamily: "Poppins, sans-serif",
            },
            "& .MuiInput-underline": {
              color: "#000",
            },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottom: "1.5px solid",
              borderBottomColor: "#000",
            },
            "& .MuiInput-underline:after": {
              borderBottom: "1.5px solid",
              borderBottomColor: "#000",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#000",
            },
            "& .MuiInputBase-input": {
              color: "#000",
              fontFamily: "Poppins, sans-serif",
            },
            "@media (max-width: 710px)": {
              width: "130px",
            },
          }}
        />
        <IconButton
          id="inputIcon"
          type="submit"
          sx={{
            p: "10px",
            color: "#000",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              bgcolor: "transparent",
              color: "#000",
              outline: "none",
            },
            "&:active": {
              transform: "scale(0.9)",
            },
          }}
          aria-label="search"
          disableRipple
        >
          <img id="inputLogo" src={logoS} alt="" />
        </IconButton>
      </form>
    </div>
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Input;
