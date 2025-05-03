import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/ImageCard.css";

export default function ImageCard({ image, onEdit, onDelete, onTagClick, onClick }) {
  return (
    <div className="image-card" onClick={onClick}>
      <img src={image.url} alt="User upload" />
      <div className="image-tags">
        {image.labels && image.labels.map(label => (
          <span
            className="image-tag"
            key={label}
            onClick={e => { e.stopPropagation(); onTagClick(label); }}
            title="Filter by tag"
          >
            {label}
          </span>
        ))}
        {image.detectedText && image.detectedText.length > 0 && (
          <span className="image-tag image-tag-text">
            {image.detectedText.join(", ")}
          </span>
        )}
      </div>
      <div className="image-card-actions" onClick={e => e.stopPropagation()}>
        <button onClick={() => onEdit(image)} title="Edit"><FaEdit /></button>
        <button onClick={() => onDelete(image)} title="Delete"><FaTrash /></button>
      </div>
    </div>
  );
}


