import React, { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import prodCss from "./adminProd.module.css";
import deleteImg from "../../../images/banner/delete1.png";
import editImg from "../../../images/banner/edit-button_7124470.png";
import axios from "axios";

const AdminProduct = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [productDetails, setProductDetails] = useState([]);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Product fields
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productSubCategory, setProductSubCategory] = useState("");
  const [productSubSubCategory, setProductSubSubCategory] = useState("");
  const [productSubSubSubCategory, setProductSubSubSubCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productDescription, setProductDescription] = useState("");
  const [previewImage, setPreviewImage] = useState(null); // ✅ for image preview

  // Category data
  const [getCategoryDetails, setGetCategoryDetails] = useState([]);
  const [getSubCategoryDetails, setGetSubCategoryDetails] = useState([]);
  const [getSubSubCategoryDetails, setGetSubSubCategoryDetails] = useState([]);
  const [getSubSubSubCategoryDetails, setGetSubSubSubCategoryDetails] =
    useState([]);

  // ------------------------------
  // Fetch functions
  // ------------------------------
  const fetchProducts = useCallback(() => {
    axios
      .get(
        "https://ecommercebackend-1-fwcd.onrender.com/api/products/allProducts",
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => setProductDetails(res.data.products))
      .catch((err) => console.log("Fetch my-products error", err));
  }, [token]);

  const fetchCategories = () => {
    axios
      .get("https://ecommercebackend-1-fwcd.onrender.com/api/category")
      .then((res) => setGetCategoryDetails(res.data))
      .catch((err) => console.log("Fetch category error", err));
  };

  const fetchSubCategories = (categoryId) => {
    axios
      .get(
        `https://ecommercebackend-1-fwcd.onrender.com/api/subcategories/category/${categoryId}`
      )
      .then((res) => setGetSubCategoryDetails(res.data))
      .catch((err) => {
        console.error("Failed to fetch subcategories", err);
        setGetSubCategoryDetails([]);
      });
  };

  const fetchSubSubCategories = (subcategoryId) => {
    axios
      .get(
        `https://ecommercebackend-1-fwcd.onrender.com/api/subsubcategory/subcategory/${subcategoryId}`
      )
      .then((res) => setGetSubSubCategoryDetails(res.data))
      .catch((err) => {
        console.error("Failed to fetch sub-subcategories", err);
        setGetSubSubCategoryDetails([]);
      });
  };

  const fetchSubSubSubCategories = (subSubcategoryId) => {
    axios
      .get(
        `https://ecommercebackend-1-fwcd.onrender.com/api/subsubsubcategory/subsubcategory/${subSubcategoryId}`
      )
      .then((res) => setGetSubSubSubCategoryDetails(res.data))
      .catch((err) => {
        console.error("Failed to fetch sub-sub-subcategories", err);
        setGetSubSubSubCategoryDetails([]);
      });
  };

  // ------------------------------
  // Effects
  // ------------------------------
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts]);

  useEffect(() => {
    if (productCategory) fetchSubCategories(productCategory);
    else setGetSubCategoryDetails([]);
  }, [productCategory]);

  useEffect(() => {
    if (productSubCategory) fetchSubSubCategories(productSubCategory);
    else setGetSubSubCategoryDetails([]);
  }, [productSubCategory]);

  useEffect(() => {
    if (productSubSubCategory) fetchSubSubSubCategories(productSubSubCategory);
    else setGetSubSubSubCategoryDetails([]);
  }, [productSubSubCategory]);

  // ------------------------------
  // Auth / Logout
  // ------------------------------
  const logoutButton = () => {
    localStorage.removeItem("token");
    navigate("/ecommerce");
  };

  // ------------------------------
  // CRUD functions
  // ------------------------------
  const productDelete = (productId) => {
    axios
      .delete(
        `https://ecommercebackend-1-fwcd.onrender.com/api/products/${productId}`,
        { headers: { Authorization: token } }
      )
      .then(() => fetchProducts())
      .catch((err) => console.log("DeleteError", err));
  };

  const handlEditProduct = async (e, productId) => {
    e.preventDefault();

    if (
      !productName ||
      !productPrice ||
      !productQuantity ||
      !productSubSubSubCategory
    ) {
      alert("Name, Price, Quantity, and Sub-Sub-Subcategory ID are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", Number(productPrice));
    formData.append("quantity", Number(productQuantity));
    formData.append("subsubsubcategory_id", Number(productSubSubSubCategory)); // ✅ fixed key
    formData.append("description", productDescription);

    if (productImage instanceof File) {
      formData.append("image", productImage);
    }

    console.log("FormData being sent:", Array.from(formData.entries()));

    try {
      const response = await axios.put(
        `https://ecommercebackend-1-fwcd.onrender.com/api/products/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      console.log("✅ Product updated successfully:", response.data);
      fetchProducts();
      closeModal();
    } catch (error) {
      console.error("❌ Update failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Update failed");
    }
  };

  const closeModal = () => {
    setIsEditing(false);
    setCurrentEditId(null);
    setProductName("");
    setProductPrice("");
    setProductQuantity("");
    setProductCategory("");
    setProductSubCategory("");
    setProductSubSubCategory("");
    setProductSubSubSubCategory("");
    setProductImage(null);
    setPreviewImage(null);
    setProductDescription("");
  };

  return (
    <div className={prodCss.adminContainer}>
      <Outlet />
      <nav className={prodCss.glassNavbar}>
        <button
          className={prodCss.navBtn}
          onClick={() => navigate("/ecommerce/admin")}>
          Home
        </button>
        <div className={prodCss.navTitle}>Welcome, Admin</div>
        <button className={prodCss.navBtn} onClick={logoutButton}>
          Logout
        </button>
      </nav>

      {/* ---------- Edit Modal ---------- */}
      {isEditing && (
        <div className={prodCss.modalBackdrop}>
          <div className={`${prodCss.modalContainer} ${prodCss.glassCard}`}>
            <div className={prodCss.adminCatModalBody}>
              <h2>Edit Product</h2>
            </div>
            <div className={prodCss.productForm}>
              <form onSubmit={(e) => handlEditProduct(e, currentEditId)}>
                <div className={prodCss.productField}>
                  <label>Name</label>
                  <input
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>

                <div className={prodCss.productField}>
                  <label>Price</label>
                  <input
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </div>

                <div className={prodCss.productField}>
                  <label>Quantity</label>
                  <input
                    type="number"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                  />
                </div>

                <div className={prodCss.productField}>
                  <label>Category</label>
                  <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    {getCategoryDetails.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={prodCss.productField}>
                  <label>SubCategory</label>
                  <select
                    value={productSubCategory}
                    onChange={(e) => setProductSubCategory(e.target.value)}>
                    <option value="">Select SubCategory</option>
                    {getSubCategoryDetails.map((sub) => (
                      <option
                        key={sub.subcategory_id}
                        value={sub.subcategory_id}>
                        {sub.subcategory_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={prodCss.productField}>
                  <label>SubSubCategory</label>
                  <select
                    value={productSubSubCategory}
                    onChange={(e) => setProductSubSubCategory(e.target.value)}>
                    <option value="">Select SubSubCategory</option>
                    {getSubSubCategoryDetails.map((sub) => (
                      <option key={sub.subsub_id} value={sub.subsub_id}>
                        {sub.subsub_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={prodCss.productField}>
                  <label>SubSubSubCategory</label>
                  <select
                    value={productSubSubSubCategory}
                    onChange={(e) =>
                      setProductSubSubSubCategory(e.target.value)
                    }>
                    <option value="">Select SubSubSubCategory</option>
                    {getSubSubSubCategoryDetails.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={prodCss.productField}>
  <label>Image</label>
  <input
    type="file"
    onChange={(e) => {
      const newFile = e.target.files[0];

      if (newFile) {
        // 🧹 Clear the old image reference and show the new one
        setProductImage(newFile);
        setPreviewImage(URL.createObjectURL(newFile));
      } else {
        // If no new image is chosen, retain the old preview
        setProductImage(productImage);
      }
    }}
  />

  {/* ✅ Preview current or newly selected image */}
  {previewImage ? (
    <img
      src={previewImage}
      alt="preview"
      style={{ width: "100px", marginTop: "8px" }}
    />
  ) : (
    productImage && (
      <img
        src={`https://ecommercebackend-1-fwcd.onrender.com/${productImage}`}
        alt="current"
        style={{ width: "100px", marginTop: "8px" }}
      />
    )
  )}
</div>


                <div className={prodCss.productField}>
                  <label>Description</label>
                  <input
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                  />
                </div>

                <div className={prodCss.productField}>
                  <button className={prodCss.btn} type="submit">
                    Update
                  </button>
                  <button
                    type="button"
                    className={prodCss.btn}
                    onClick={closeModal}>
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Product Table ---------- */}
      <div className={prodCss.sellerGlassCard}>
        <div className={prodCss.scrollWrapper}>
          <div className={prodCss.product}>
            <div className={prodCss.productDetails}>SlNo</div>
            <div className={prodCss.productDetails}>Name</div>
            <div className={prodCss.productDetails}>Price</div>
            <div className={prodCss.productDetails}>Quantity</div>
            <div className={prodCss.productDetails}>Image</div>
            <div className={prodCss.productDetails}>Description</div>
            <div className={prodCss.productDetails}>Actions</div>
          </div>

          {productDetails.map((product, index) => (
            <div className={prodCss.product} key={product.id}>
              <p className={prodCss.productDetails}>{index + 1}</p>
              <p className={prodCss.productDetails}>{product.name}</p>
              <p className={prodCss.productDetails}>{product.price}</p>
              <p className={prodCss.productDetails}>{product.quantity}</p>
              <p className={prodCss.productDetails}>
                <img
                  src={
                    product.image_url.startsWith("http")
                      ? product.image_url
                      : `https://ecommercebackend-1-fwcd.onrender.com/${product.image_url}`
                  }
                  alt="product"
                />
              </p>
              <p className={prodCss.productDetailsDescription}>
                {product.description}
              </p>
              <p className={prodCss.productDetails}>
                <button
                  className={prodCss.actionButton}
                  onClick={() => {
                    setIsEditing(true);
                    setCurrentEditId(product.id);

                    // ✅ Prefill the edit modal fields
                    setProductName(product.name);
                    setProductPrice(product.price);
                    setProductQuantity(product.quantity);
                    setProductDescription(product.description);
                    setProductCategory(product.category_id || "");
                    setProductSubCategory(product.subcategory_id || "");
                    setProductSubSubCategory(product.subsub_id || "");
                    setProductSubSubSubCategory(product.subsubsub_id || "");
                    setProductImage(product.image_url || null);
                    setPreviewImage(
                      `https://ecommercebackend-1-fwcd.onrender.com/${product.image_url}`
                    );
                  }}>
                  <img src={editImg} alt="edit" />
                </button>

                <button
                  className={prodCss.actionButton}
                  onClick={() => productDelete(product.id)}>
                  <img src={deleteImg} alt="delete" />
                </button>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
