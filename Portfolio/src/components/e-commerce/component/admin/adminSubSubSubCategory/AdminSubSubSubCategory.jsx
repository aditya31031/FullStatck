import React, { useEffect, useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import adminSubSubCatCss from "./adminSubSubCategory.module.css";

const AdminSubSubSubCategory = () => {

  const token = localStorage.getItem("token");

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [subSubSubCategories, setSubSubSubCategories] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [subSubCategoryId, setSubSubCategoryId] = useState("");
  const [subSubSubCategoryName, setSubSubSubCategoryName] = useState("");

  const fetchAll = useCallback(async () => {
    try {
      const [sssRes, ssRes, sRes, cRes] = await Promise.all([
        axios.get("https://site--portfolio-api--kwybpvsjlw26.code.run/api/subsubsubcategory"),
        axios.get("https://site--portfolio-api--kwybpvsjlw26.code.run/api/subsubcategory"),
        axios.get("https://site--portfolio-api--kwybpvsjlw26.code.run/api/subcategories"),
        axios.get("https://site--portfolio-api--kwybpvsjlw26.code.run/api/category", {
          headers: { Authorization: token },
        }),
      ]);

      setSubSubSubCategories(sssRes.data);
      setSubSubCategories(ssRes.data);
      setSubCategories(sRes.data);
      setCategories(cRes.data);
    } catch (error) {
      console.error("Fetch all data error:", error);
    }
  }, [token]);

  const fetchSubCategories = useCallback(
    async (catId) => {
      try {
        const res = await axios.get(
          `https://site--portfolio-api--kwybpvsjlw26.code.run/api/subcategories/category/${catId}`,
          { headers: { Authorization: token } }
        );
        setSubCategories(res.data);
      } catch (err) {
        console.error("SubCategory fetch error:", err);
      }
    },
    [token]
  );

  const fetchSubSubCategories = useCallback(
    async (subCatId) => {
      try {
        const res = await axios.get(
          `https://site--portfolio-api--kwybpvsjlw26.code.run/api/subsubcategory/subcategory/${subCatId}`,
          { headers: { Authorization: token } }
        );
        setSubSubCategories(res.data);
      } catch (err) {
        console.error("SubSubCategory fetch error:", err);
      }
    },
    [token]
  );


  const handleAddSubSubSubCategory = async (e) => {
    e.preventDefault();
    if (!subSubCategoryId || !subSubSubCategoryName.trim()) {
      alert("Please fill all fields before adding.");
      return;
    }

    try {
      await axios.post(
        "https://site--portfolio-api--kwybpvsjlw26.code.run/api/subsubsubcategory",
        {
          subsubcategoryId: subSubCategoryId,
          name: subSubSubCategoryName.trim(),
        },
        {
          headers: { Authorization: token },
        }
      );

      alert("Sub-Sub-Sub Category added successfully!");
      setSubSubSubCategoryName("");
      fetchAll();
    } catch (error) {
      console.error("Add SubSubSubCategory error:", error);
      alert("Failed to add category.");
    }
  };

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    if (categoryId) fetchSubCategories(categoryId);
  }, [categoryId, fetchSubCategories]);

  useEffect(() => {
    if (subCategoryId) fetchSubSubCategories(subCategoryId);
  }, [subCategoryId, fetchSubSubCategories]);

  return (
    <div className={adminSubSubCatCss.container}>
      <h1 className={adminSubSubCatCss.title}>Manage Sub-Sub-Sub Categories</h1>

      <form
        onSubmit={handleAddSubSubSubCategory}
        className={adminSubSubCatCss.formContainer}
      >
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className={adminSubSubCatCss.dropdown}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={subCategoryId}
          onChange={(e) => setSubCategoryId(e.target.value)}
          className={adminSubSubCatCss.dropdown}
          disabled={!categoryId}
        >
          <option value="">Select SubCategory</option>
          {subCategories.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.name}
            </option>
          ))}
        </select>

        <select
          value={subSubCategoryId}
          onChange={(e) => setSubSubCategoryId(e.target.value)}
          className={adminSubSubCatCss.dropdown}
          disabled={!subCategoryId}
        >
          <option value="">Select SubSubCategory</option>
          {subSubCategories.map((ss) => (
            <option key={ss._id} value={ss._id}>
              {ss.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter Sub-Sub-Sub Category Name"
          value={subSubSubCategoryName}
          onChange={(e) => setSubSubSubCategoryName(e.target.value)}
          className={adminSubSubCatCss.input}
        />

        <button type="submit" className={adminSubSubCatCss.addButton}>
          Add Category
        </button>
      </form>

      <div className={adminSubSubCatCss.listContainer}>
        <h2>Existing Sub-Sub-Sub Categories</h2>
        <ul className={adminSubSubCatCss.list}>
          {subSubSubCategories.map((item) => (
            <li key={item._id} className={adminSubSubCatCss.listItem}>
              <span>{item.name}</span>
              <span className={adminSubSubCatCss.subInfo}>
                {item.subsubcategoryId?.name || "N/A"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Outlet />
    </div>
  );
};

export default AdminSubSubSubCategory;
