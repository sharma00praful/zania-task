import { useState } from "react";
import Spinner from "../Spinner";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./style.css";

const Card = ({ title, position, img, isGrabbing, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: position });

  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };
  const handleCardClick = () => {
    onClick();
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1,
    cursor: isGrabbing ? "grabbing" : "grab",
  };
  return (
    <div
      className="card-container"
      ref={setNodeRef}
      onClick={handleCardClick}
      style={style}
      {...listeners}
      {...attributes}
    >
      <h2 className="card-title">{title}</h2>
      {imageLoading && <Spinner className="card-loader" />}
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

