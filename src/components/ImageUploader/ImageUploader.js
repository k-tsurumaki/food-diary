import { Button } from "@mui/material";
import React, { useState } from "react";
import ImageLogo from "./image.svg";
import "./ImageUploader.css";
import { storage } from "../../firebase";
import CircularProgressWithLabel from "../CircularProgressWithLabel/CircularProgressWithLabel"
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const ImageUploader = ({ loading, setLoading, isUploaded, setIsUploaded, imageUrl, setImageUrl }) => {
  // アップロードの進行状況（画面に表示する）
  const [uploadProgress, setUploadProgress] = useState(0);

  const OnFileUploadToFirebase = (e) => {
    // console.log(e.target.files);
    const file = e.target.files[0];
    const storageRef = ref(storage, "images/" + file.name);
    const uploadImage = uploadBytesResumable(storageRef, file);
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        setUploadProgress(progress);
        setLoading(true);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setLoading(false);
        setIsUploaded(true);
        getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          setImageUrl(downloadURL);
        });
      }
    );
  };

  return (
    <>
      {loading ? (
        <div className="uploadImageContainer ">
          <h2>Uploading...</h2>
          <CircularProgressWithLabel value={uploadProgress} />
        </div>
      ) : (
        <>
          {isUploaded ? (
            <div className="uploadImageContainer ">
              <img
                className="uploadedImage"
                src={imageUrl}
                alt="uploaded"
              ></img>
            </div>
          ) : (
            <div className="outerBox">
              <div className="imageUploadBox">
                <div className="imageLogo">
                  <img src={ImageLogo} alt="imagelogo" />
                </div>
                <input
                  className="imageUploadInput"
                  multiple
                  name="imageURL"
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  onChange={OnFileUploadToFirebase}
                />
              </div>
              <Button variant="contained" className="imageUploadButton">
                Upload
                <input
                  className="imageUploadInput"
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  onChange={OnFileUploadToFirebase}
                />
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ImageUploader;
