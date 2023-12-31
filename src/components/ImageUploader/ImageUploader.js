import { Button } from "@mui/material";
import React, { useState } from "react";
import ImageLogo from "./image.svg";
import "./ImageUploader.css";
import { storage } from "../../firebase";
import CircularProgressWithLabel from "../CircularProgressWithLabel/CircularProgressWithLabel";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const ImageUploader = ({
  loading,
  setLoading,
  isUploaded,
  setIsUploaded,
  imageUrl,
  setImageUrl,
}) => {
  // アップロードの進行状況（画面に表示する）
  const [uploadProgress, setUploadProgress] = useState(0);

  const OnFileUploadToFirebase = (e) => {
    // console.log(e.target.files);
    const file = e.target.files[0];

    // 画像名にランダムな文字列を追加
    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const N = 16;
    const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
      .map((n) => S[n % S.length])
      .join("");
    const fileName = randomChar + "_" + file.name;
    const storageRef = ref(storage, "images/" + fileName);
    
    const uploadImage = uploadBytesResumable(storageRef, file);
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        // アップロードの進行状況のパーセンテージ計算
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        setLoading(true);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setLoading(false);
        setIsUploaded(true);
        // アップロードした画像へのリンクを格納
        getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
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
            <div className="uploadedImageContainer ">
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
