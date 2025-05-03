import React, { useRef } from "react";
import { PinturaEditor } from "@pqina/react-pintura";
import "@pqina/pintura/pintura.css";

export default function ImageEditor({ imageUrl, onProcess, onClose }) {
  const editorRef = useRef();

  return (
    <div>
      <button onClick={onClose} style={{ marginBottom: "10px" }}>Close Editor</button>
      <PinturaEditor
        ref={editorRef}
        src={imageUrl}
        imageCropAspectRatio={1}
        style={{ height: "600px", width: "100%" }}
        onProcess={({ dest }) => {
          // dest is a Blob of the edited image
          if (onProcess) onProcess(dest);
        }}
      />
    </div>
  );
}
