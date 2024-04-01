import { useState } from "react";
import Spinner from "../Spinner";
import "./style.css";

const Card = ({ title, img, onClick }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const handleImageLoad = () => {
    setImageLoading(false);
  };
  const handleCardClick = () => {
    onClick();
  };
  return (
    <div className="card-container" onClick={handleCardClick}>
      <h2 className="card-title">{title}</h2>
      {imageLoading && <Spinner />}
      <img
        className="card-image"
        src={img}
        onLoad={handleImageLoad}
        style={{ display: imageLoading ? "none" : "block" }}
      />
    </div>
  );
};
export default Card;

