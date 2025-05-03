import React from "react";
import ImageCard from "./ImageCard";
import "../styles/ImageGrid.css";

export default function ImageGrid({ images, onEdit, onDelete, onTagClick, onCardClick }) {
  return (
    <div className="image-grid">
      {images.map(img => (
        <ImageCard
          key={img.imageId}
          image={img}
          onEdit={onEdit}
          onDelete={onDelete}
          onTagClick={onTagClick}
          onClick={() => onCardClick(img)}
        />
      ))}
    </div>
  );
}


