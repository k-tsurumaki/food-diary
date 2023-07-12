import { Button } from "@mui/material";
import React from "react";
import ImageLogo from "./image.svg";
import "./ImageUploader.css";

const ImageUploader = () => {
  return (
    <div className="outerBox">
      <div className="imageUplodeBox">
        <div className="imageLogo">
          <img src={ImageLogo} alt="imagelogo" />
        </div>
        <input className="imageUploadInput" multiple name="imageURL" />
      </div>
      <Button variant="contained" className="imageUploadButton">
        Upload image
        <input className="imageUploadInput" />
      </Button>
    </div>
  );
};

export default ImageUploader;
