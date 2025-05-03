import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { ImageEditorComponent } from "@syncfusion/ej2-react-image-editor";
import "../styles/editpage.css";
import "../App.css"; // or wherever you import Syncfusion CSS

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export default function EditPage() {
  const { imageId } = useParams();
  const { jwtToken } = useAuth();
  const [image, setImage] = useState(null);
  const editorRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwtToken) {
      axios
        .get(`${API_URL}/images`, {
          headers: { Authorization: `Bearer ${jwtToken}` },
        })
        .then((res) => {
          const found = res.data.find(img => img.imageId === imageId);
          setImage(found);
        })
        .catch(console.error);
    }
  }, [jwtToken, imageId]);

  // Open image in editor once loaded
  const handleEditorCreated = () => {
    if (editorRef.current && image?.url) {
      editorRef.current.open(image.url);
    }
  };

  if (!image) return <div>Loading...</div>;

  return (
    <div className="edit-page-root">
      <button className="back-btn" onClick={() => navigate("/")}>← Back to Dashboard</button>
      <div className="edit-page-canvas">
        <ImageEditorComponent
          ref={editorRef}
          height="600px"
          width="1000px"
          // Remove custom export buttons; use built-in Save
          toolbar={[
            'Undo', 'Redo', 'Crop', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset', 'Save',
            'Annotate', 'Line', 'Rectangle', 'Ellipse', 'Text',
            'RotateLeft', 'RotateRight', 'FlipX', 'FlipY',
            'Finetune', 'Filter'
          ]}
          created={handleEditorCreated}
        />
      </div>
    </div>
  );
}

