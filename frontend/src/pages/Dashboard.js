import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ImageGrid from "../components/ImageGrid";
import SearchBar from "../components/SearchBar";
import EditImageModal from "../components/EditImageModal";
import ProfilePanel from "../components/ProfilePanel";
import "../styles/dashboard.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export default function Dashboard({ theme, setTheme }) {
  const { user, signOut, jwtToken } = useAuth();
  const [images, setImages] = useState([]);
  const [editingImage, setEditingImage] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [filterTag, setFilterTag] = useState("");
  const [currentTab, setCurrentTab] = useState("gallery");
  const navigate = useNavigate();

  useEffect(() => {
    if (jwtToken) {
      axios
        .get(`${API_URL}/images`, {
          headers: { Authorization: `Bearer ${jwtToken}` },
        })
        .then((res) => setImages(res.data))
        .catch(console.error);
    }
  }, [jwtToken]);

  // Upload new image
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    await axios.post(`${API_URL}/images/upload`, formData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    // Refresh images
    const res = await axios.get(`${API_URL}/images`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    setImages(res.data);
  };

  // Edit (replace) image
  const handleEdit = (img) => {
    setEditingImage(img);
    setShowEditModal(true);
  };

  const handleReplace = async (file) => {
    if (!editingImage) return;
    // For simplicity, delete old and upload new
    await axios.delete(`${API_URL}/images/${editingImage.imageId}`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    const formData = new FormData();
    formData.append("image", file);
    await axios.post(`${API_URL}/images/upload`, formData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    setShowEditModal(false);
    setEditingImage(null);
    // Refresh images
    const res = await axios.get(`${API_URL}/images`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    setImages(res.data);
  };

  // Delete image
  const handleDelete = async (img) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    await axios.delete(`${API_URL}/images/${img.imageId}`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    setImages(images.filter(i => i.imageId !== img.imageId));
  };

  // Card click: go to editing page
  const handleCardClick = (img) => {
    navigate(`/edit/${img.imageId}`);
  };

  // Tag filtering logic
  const filteredImages = filterTag
    ? images.filter(img =>
        Array.isArray(img.labels) &&
        img.labels.some(label =>
          label.toLowerCase().includes(filterTag.toLowerCase())
        )
      )
    : images;

  return (
    <div className="dashboard-root">
      <Sidebar current={currentTab} setCurrent={setCurrentTab} />
      <main className="dashboard-main">
        <Header user={user} onSignOut={signOut} theme={theme} setTheme={setTheme} />
        <div className="dashboard-content">
          {currentTab === "gallery" && (
            <>
              <div className="dashboard-toolbar">
                <label className="upload-btn">
                  <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleUpload} />
                  Upload Image
                </label>
                <SearchBar value={filterTag} onChange={setFilterTag} />
              </div>
              <ImageGrid
                images={filteredImages}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onTagClick={setFilterTag}
                onCardClick={handleCardClick}
              />
              <EditImageModal
                open={showEditModal}
                onClose={() => setShowEditModal(false)}
                onReplace={handleReplace}
              />
            </>
          )}
          {currentTab === "profile" && (
            <ProfilePanel user={user} />
          )}
        </div>
      </main>
    </div>
  );
}
