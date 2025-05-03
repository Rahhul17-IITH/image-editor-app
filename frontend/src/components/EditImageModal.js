import React, { useRef, useState } from "react";
import "../styles/editimagemodal.css";

export default function EditImageModal({ open, onClose, onReplace }) {
  const fileInputRef = useRef();
  const [fileName, setFileName] = useState("");

  if (!open) return null;

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onReplace(file);
    }
  };

  return (
    <div className="edit-image-modal-bg">
      <div className="edit-image-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>Replace Image</h3>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
        />
        {fileName && <p>Selected: {fileName}</p>}
      </div>
    </div>
  );
}
