import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import adminCatCss from "./adminCategory.module.css";
import axios from "axios";

const AdminCategory = () => {
  const navigate = useNavigate();

  const [isCatEditOpen, setIsCatEditOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [adminCatName, setAdminCatName] = useState("");
  const [adminCatImg, setAdminCatImg] = useState("");
  const [catEditName, setCatEditName] = useState("");
  const [catEditImg, setCatEditImg] = useState(null);
  const [catId, setCatId] = useState();
  const token = localStorage.getItem("token");

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://site--portfolio-api--kwybpvsjlw26.code.run/api/category",
        {
          headers: { Authorization: token },
        }
      );
      setCategoryDetails(response.data);
    } catch (error) {
      console.log("error", error);
    }
  }, [token]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Add new category
  const handleAdminCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", adminCatName);
    formData.append("image", adminCatImg);
    try {
      await axios.post(
        "https://site--portfolio-api--kwybpvsjlw26.code.run/api/category/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      alert("Category is added");
      closeModal();
      await fetchCategories(); // Refetch after add
    } catch (error) {
      console.log(error, "error");
    }
  };

  // Edit category
  const handleEditCat = async () => {
    const formData = new FormData();
    formData.append("name", catEditName);
    if (catEditImg) {
      formData.append("image", catEditImg);
    }
    try {
      await axios.put(
        `https://site--portfolio-api--kwybpvsjlw26.code.run/api/category/${parseInt(catId)}`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setIsCatEditOpen(false);
      await fetchCategories(); // Refetch after edit
    } catch (error) {
      console.log("catEditError", error);
    }
  };

  // Delete category
  const handleDeleteCat = async (catDelId) => {
    const catDelIdNum = parseInt(catDelId);
    try {
      await axios.delete(
        `https://site--portfolio-api--kwybpvsjlw26.code.run/api/category/${catDelIdNum}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      await fetchCategories(); // Refetch after delete
    } catch (error) {
      console.log("error delete category", error);
    }
  };

  const logoutButton = () => {
    localStorage.removeItem("token");
    navigate("/ecommerce");
  };

  const handleCloseModal = () => {
    setIsCatEditOpen(false);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsCatEditOpen(false);
    setAdminCatName("");
    setAdminCatImg("");
  };

  const handleEditClick = (id) => {
    const cat = categoryDetails.find((item) => item.id === id);
    if (cat) {
      setCatId(id);
      setCatEditName(cat.name);
      setCatEditImg(null); // reset file input
      setIsCatEditOpen(true);
    }
  };

  return (
    <div className={adminCatCss.adminContainer}>
      <nav className={adminCatCss.glassNavbar}>
        <button className={adminCatCss.navBtn} onClick={() => navigate("/ecommerce/admin")}>
          Home
        </button>
        <div className={adminCatCss.navTitle}>Welcome, Admin</div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            className={`${adminCatCss.navBtn} ${adminCatCss.addBtn}`}
            onClick={() => setIsModalOpen(true)}
          >
            ➕ Add Category
          </button>
          <button
            onClick={logoutButton}
            className={`${adminCatCss.navBtn} ${adminCatCss.logout}`}
          >
            🔓 Logout
          </button>
        </div>
      </nav>

      <h2 className={adminCatCss.glassHeader}>Manage Categories</h2>

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className={adminCatCss.modalBackdrop}>
          <div className={`${adminCatCss.modalContainer} ${adminCatCss.glassCard}`}>
            <div className="adminCatModalBody">
              <form onSubmit={handleAdminCategory}>
                <h3>Add Category</h3>
                <label>Name</label>
                <input
                  type="text"
                  onChange={(e) => setAdminCatName(e.target.value)}
                  required
                />

                <label>Image</label>
                <input
                  type="file"
                  onChange={(e) => setAdminCatImg(e.target.files[0])}
                  required
                />

                <button type="submit" className={adminCatCss.saveBtn}>
                  Submit
                </button>
                <button
                  type="button"
                  className={adminCatCss.cancelBtn}
                  onClick={closeModal}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className={`${adminCatCss.tableHeader} ${adminCatCss.glassRow}`}>
        <div>ID</div>
        <div>Name</div>
        <div>Image</div>
        <div>Actions</div>
      </div>

      {/* Category Rows */}
      {categoryDetails.map((item, index) => (
        <div className={adminCatCss.glassRow} key={index}>

          <div>{item.id}</div>
          <div>{item.name}</div>
          <div>
            <img
              src={item.image_url}
              alt="Category"
              className={adminCatCss.rowImage}
            />
          </div>
          <div className="cat-actions">
            <button
              onClick={() => handleEditClick(item.id)}
              className={adminCatCss.editBtn}
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteCat(item.id)}
              className={adminCatCss.deleteBtn}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Edit Modal */}
      {isCatEditOpen && (
        <div className={adminCatCss.modalBackdrop}>
          <div className={`${adminCatCss.modalContainer} ${adminCatCss.glassCard}`}>
            <h3>Edit Category</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditCat();
              }}
            >
              <label>Category Name:</label>
              <input
                type="text"
                value={catEditName}
                onChange={(e) => setCatEditName(e.target.value)}
                required
              />
              <label>New Image (optional):</label>
              <input
                type="file"
                onChange={(e) => setCatEditImg(e.target.files[0])}
              />
              <div className={adminCatCss.modalActions}>
                <button type="submit" className={adminCatCss.saveBtn}>
                  Save
                </button>
                <button
                  type="button"
                  className={adminCatCss.cancelBtn}
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategory;
