import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
   FaHeart, FaShoppingBag,  FaTruck, FaHeadset, FaShieldAlt, FaUndo, FaArrowRight, FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import NavBar from "../NavBar";

const Home = ({ setViewMoreDetails }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [subSubSubCategories, setSubSubSubCategories] = useState([]);
  const [showSubcategory, setShowSubcategory] = useState(false);
  const [showSubSubcategory, setShowSubSubcategory] = useState(false);
  const [showSubSubSubcategory, setShowSubSubSubcategory] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [totalCartCount, setTotalCartCount] = useState(0);
  const navigate = useNavigate();

  const baseUrl = "https://ecommercebackend-1-fwcd.onrender.com";

  useEffect(() => {
    axios.get(`${baseUrl}/api/products/`).then((res) => {
      setProducts(res.data.products);

    });

    axios.get(`${baseUrl}/api/category`).then((res) => {
      setCategory(res.data)
    });
  }, [totalCartCount]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://ecommercebackend-1-fwcd.onrender.com/api/cart", {
          headers: { Authorization: token },
        })
        .then((res) => {
          setTotalCartCount(res.data.length || 0);
          console.log("Updated totalCartCount in App:", res.data.length);
        })
        .catch((err) => {
          console.error("Failed to fetch cart count in App:", err);
        });
    }
  }, []);
  const handleCategoryClick = async (id) => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/subcategories/category/${id}`
      );
      setSubCategories(res.data);
      setShowSubcategory(true);
      setShowSubSubcategory(false);
      setShowSubSubSubcategory(false);
      setFilteredProducts([]);
      setCurrentPage(1);
    } catch (err) {
      console.log("Subcategory fetch failed:", err);
    }
  };

  const handleSubCategoryClick = async (subCatId) => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/subsubcategory/subcategory/${subCatId}`
      );
      setSubSubCategories(res.data);
      setShowSubSubcategory(true);
      setShowSubSubSubcategory(false);
      setFilteredProducts([]);
      setCurrentPage(1);
    } catch (err) {
      console.log("Sub-subcategory fetch failed:", err);
    }
  };

  const handleSubSubCategoryClick = async (subSubCatId) => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/subsubsubcategory/subsubcategory/${subSubCatId}`
      );
      setSubSubSubCategories(res.data);

      setShowSubSubSubcategory(true);
      setFilteredProducts([]);
      setCurrentPage(1);
    } catch (err) {
      console.log("Sub-sub-subcategory fetch failed:", err);
    }
  };

  const handleSubSubSubCategoryClick = async (subSubSubCatId) => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/products?sub_sub_subcategory=${subSubSubCatId}`
      );
      setFilteredProducts(res.data.products);
      setCurrentPage(1);
    } catch (err) {
      console.log("Product filter by sub-sub-subcategory failed:", err);
    }
  };

  const handleUserVm = (itemId) => {
    const selectedItem = [...products, ...filteredProducts].find(
      (product) => product.id === itemId
    );
    if (selectedItem) {
      navigate("/ecommerce/home/viewmore", { state: selectedItem });

    }
  };

  const handleBackToCategories = () => {
    setShowSubcategory(false);
    setShowSubSubcategory(false);
    setShowSubSubSubcategory(false);
    setFilteredProducts([]);
    setCurrentPage(1);
  };

  const handleBackToSubcategories = () => {
    setShowSubSubcategory(false);
    setShowSubSubSubcategory(false);
    setFilteredProducts([]);
    setCurrentPage(1);
  };

  const handleBackToSubSubcategories = () => {
    setShowSubSubSubcategory(false);
    setFilteredProducts([]);
    setCurrentPage(1);
  };


  const paginate = (items) => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  };




  const displayedProducts =
    filteredProducts.length > 0 ? filteredProducts : products;
  const totalPages = Math.ceil(displayedProducts.length / itemsPerPage);

  return (
    <>
      <NavBar />


      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left: Text content */}
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1 text-xs font-semibold text-blue-600 uppercase tracking-wide">
                New In · Summer 2025
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug text-gray-900">
                Upgrade Your Wardrobe with{" "}
                <span className="text-blue-600">Everyday Essentials</span>
              </h1>

              <p className="text-gray-600 text-sm md:text-base max-w-md">
                Discover handpicked fashion, footwear, and accessories designed for
                comfort, quality, and style — all at prices that make sense.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  className="inline-flex items-center rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
                >
                  Shop Now
                  <FaArrowRight className="ml-2 text-xs" />
                </button>

                <button
                  type="button"
                  className="inline-flex items-center rounded-full border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-100 transition"
                >
                  Browse Categories
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 pt-4 text-xs md:text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FaTruck className="text-blue-500" />
                  <span>Free delivery over ₹999</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-blue-500" />
                  <span>Secure payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUndo className="text-blue-500" />
                  <span>Easy 7-day returns</span>
                </div>
              </div>

              {/* Stats (compact) */}
              <div className="flex flex-wrap gap-6 pt-3 text-sm">
                <div>
                  <p className="text-lg font-semibold text-gray-900">10K+</p>
                  <p className="text-gray-500">Happy customers</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">500+</p>
                  <p className="text-gray-500">Products</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">4.8/5</p>
                  <p className="text-gray-500">Average rating</p>
                </div>
              </div>
            </div>

            {/* Right: Product highlight card */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop"
                  alt="Featured outfit"
                  className="h-64 md:h-80 w-full object-cover"
                  loading="lazy"
                />

                <div className="p-4 md:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">
                      Featured Look · Casual Street
                    </h3>
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                      In Stock
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-gray-500">
                    Includes jacket, tee, and denim combo. Perfect for daily wear,
                    meetups, and weekend outings.
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <p className="text-lg font-bold text-gray-900">₹2,999</p>
                      <p className="text-xs text-gray-500">
                        MRP ₹3,999 <span className="text-green-600 font-semibold">· 25% OFF</span>
                      </p>
                    </div>

                    <button className="inline-flex items-center rounded-full border border-gray-300 px-4 py-2 text-xs md:text-sm font-semibold text-gray-800 hover:bg-gray-100 transition">
                      View Details
                    </button>
                  </div>
                </div>
              </div>

              {/* Small pill for responsiveness hint / secondary info */}
              <div className="hidden sm:flex items-center gap-2 mt-3 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>New arrivals added this week</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* category */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Tap through categories to quickly drill down to what you’re looking for.
            </p>
          </div>

          {/* Outer rounded container */}
          <div className="bg-slate-50/80 border border-slate-200 rounded-3xl p-4 md:p-6 shadow-sm">
            {/* ===================== TOP-LEVEL CATEGORIES ===================== */}
            {!showSubcategory && !showSubSubcategory && !showSubSubSubcategory && (
              <>
                {/* Level label */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                    All Categories
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
                  {category.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleCategoryClick(item.id)}
                      className="group flex flex-col rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 overflow-hidden text-left"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="px-3 py-2.5">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {item.name}
                        </p>
                        {/* If you later have count, show here */}
                        {/* <p className="text-xs text-slate-500 mt-0.5">{item.product_count}+ products</p> */}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* ===================== SUBCATEGORIES ===================== */}
            {showSubcategory && !showSubSubcategory && !showSubSubSubcategory && (
              <>
                {/* Top bar: back + label */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <button
                    type="button"
                    onClick={handleBackToCategories}
                    className="inline-flex items-center text-xs md:text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    <span className="mr-1">←</span> Back to Categories
                  </button>
                  <span className="text-[11px] md:text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">
                    Subcategories
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
                  {subCategories.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSubCategoryClick(item.subcategory_id)}
                      className="group flex flex-col rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 overflow-hidden text-left"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={item.image_url}
                          alt={item.subcategory_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="px-3 py-2.5">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {item.subcategory_name}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* ===================== SUB-SUBCATEGORIES ===================== */}
            {showSubSubcategory && !showSubSubSubcategory && (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <button
                    type="button"
                    onClick={handleBackToSubcategories}
                    className="inline-flex items-center text-xs md:text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    <span className="mr-1">←</span> Back
                  </button>
                  <span className="text-[11px] md:text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium">
                    Sub-subcategories
                  </span>
                </div>

                {subSubCategories.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
                    {subSubCategories.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSubSubCategoryClick(item.subsub_id)}
                        className="group flex flex-col rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 overflow-hidden text-left"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img
                            src={item.image_url}
                            alt={item.subsub_name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="px-3 py-2.5">
                          <p className="text-sm font-semibold text-slate-900 truncate">
                            {item.subsub_name}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">No sub-subcategories found.</p>
                )}
              </>
            )}

            {/* ===================== SUB-SUB-SUBCATEGORIES ===================== */}
            {showSubSubSubcategory && (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <button
                    type="button"
                    onClick={handleBackToSubSubcategories}
                    className="inline-flex items-center text-xs md:text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    <span className="mr-1">←</span> Back
                  </button>
                  <span className="text-[11px] md:text-xs px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 font-medium">
                    Final level
                  </span>
                </div>

                {subSubSubCategories.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
                    {subSubSubCategories.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSubSubSubCategoryClick(item.id)}
                        className="group flex flex-col rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 overflow-hidden text-left"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="px-3 py-2.5">
                          <p className="text-sm font-semibold text-slate-900 truncate">
                            {item.name}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">No categories found.</p>
                )}
              </>
            )}
          </div>
        </div>
      </section>





      {/* products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">
                Featured Products
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Handpicked items just for you ·{" "}
                <span className="font-semibold text-gray-800">
                  {displayedProducts?.length || 0} items
                </span>
              </p>
            </div>

            <button className="inline-flex items-center self-start md:self-auto text-blue-600 text-sm font-medium hover:text-blue-700 transition">
              View All <FaArrowRight className="ml-2 text-xs" />
            </button>
          </div>

          {/* Product grid (API + map) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginate(displayedProducts).map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Image area */}
                <div className="relative overflow-hidden rounded-2xl rounded-b-none">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-56 md:h-60 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Top-left badge */}
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-gray-800 shadow">
                    Featured
                  </span>

                  {/* Wishlist icon */}
                  <button
                    type="button"
                    className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 text-gray-700 hover:text-red-500 hover:bg-white transition"
                  >
                    <FaHeart className="text-xs" />
                  </button>

                  {/* Hover overlay + View Details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <button
                    type="button"
                    onClick={() => handleUserVm(item.id)}
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 inline-flex items-center rounded-full bg-white/95 px-4 py-1.5 text-xs font-semibold text-gray-900 shadow hover:bg-white transition-all"
                  >
                    View Details
                    <FaArrowRight className="ml-1 text-[10px]" />
                  </button>
                </div>

                {/* Info area */}
                <div className="p-4 space-y-2">
                  <p className="text-sm font-medium text-gray-900 line-clamp-2">
                    {item.name}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <p className="text-base font-bold text-blue-600">
                        ₹ {item.price}
                      </p>
                      {item?.original_price && (
                        <p className="text-[11px] text-gray-400 line-through">
                          ₹ {item.original_price}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center rounded-full border border-gray-300 px-3 py-1.5 text-[11px] font-semibold text-gray-800 hover:bg-gray-100 transition"
                    >
                      <FaShoppingBag className="mr-1 text-[10px]" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {paginate(displayedProducts).length === 0 && (
              <div className="col-span-full text-center text-gray-500 text-sm py-10">
                No products found.
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <ul className="flex flex-wrap gap-2">
                <li>
                  <button
                    className="px-3 py-1.5 text-xs border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    &laquo;
                  </button>
                </li>

                {[...Array(totalPages)].map((_, i) => (
                  <li key={i}>
                    <button
                      className={`px-3.5 py-1.5 text-xs border rounded-full ${currentPage === i + 1
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                        }`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

                <li>
                  <button
                    className="px-3 py-1.5 text-xs border border-gray-300 rounded-full hover:bg-blue-gray-500 disabled:opacity-40 disabled:cursor-not-allowed"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    &raquo;
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            {/* Free Shipping */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                <FaTruck className="text-blue-600 text-2xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Free Shipping</h3>
              <p className="text-gray-500 text-sm">On orders over $50</p>
            </div>

            {/* Easy Returns */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                <FaUndo className="text-green-600 text-2xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Easy Returns</h3>
              <p className="text-gray-500 text-sm">30-day return policy</p>
            </div>

            {/* Secure Payment */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                <FaShieldAlt className="text-purple-600 text-2xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Secure Payment</h3>
              <p className="text-gray-500 text-sm">100% secure checkout</p>
            </div>

            {/* Support */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                <FaHeadset className="text-orange-600 text-2xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">24/7 Support</h3>
              <p className="text-gray-500 text-sm">Dedicated support</p>
            </div>

          </div>
        </div>
      </section>

      <footer className="bg-gray-900 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand / About */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="text-2xl font-bold text-white">
                  Shop<span className="text-blue-400">Lux</span>
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Your one-stop destination for premium products at affordable
                prices.
              </p>
              <div className="flex space-x-4">
                <p
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  <FaFacebookF className="text-xl" />
                </p>
                <p
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  <FaTwitter className="text-xl" />
                </p>
                <p
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  <FaInstagram className="text-xl" />
                </p>
                <p
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  <FaPinterestP className="text-xl" />
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <p href="#" className="text-gray-400 hover:text-white transition">
                    Home
                  </p>
                </li>
                <li>
                  <p href="#" className="text-gray-400 hover:text-white transition">
                    Shop
                  </p>
                </li>
                <li>
                  <p href="#" className="text-gray-400 hover:text-white transition">
                    About Us
                  </p>
                </li>
                <li>
                  <p href="#" className="text-gray-400 hover:text-white transition">
                    Contact
                  </p>
                </li>
                <li>
                  <p href="#" className="text-gray-400 hover:text-white transition">
                    Blog
                  </p>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-white font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li>
                  <p href="#" className="text-gray-400 hover:text-white transition">
                    FAQ
                  </p>
                </li>
                <li>
                  <p href="#" className="text-gray-400 hover:text-white transition">
                    Shipping Info
                  </p>
                </li>
                <li>
                  <p href="#" className="text-gray-400 hover:text-white transition">
                    Returns
                  </p>
                </li>
                <li>
                  <p href="#" className="text-gray-400 hover:text-white transition">
                    Track Order
                  </p>
                </li>
                <li>
                  <p href="#" className="text-gray-400 hover:text-white transition">
                    Size Guide
                  </p>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  Bangalore,India
                </li>
                <li className="flex items-center">
                  <FaPhoneAlt className="mr-2" />
                  +91 9066910183
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="mr-2" />
                  aditya@gmail.com
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 ShopLux. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/100px-Visa_Inc._logo.svg.png"
                alt="Visa"
                className="h-6 brightness-0 invert opacity-60"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/100px-Mastercard-logo.svg.png"
                alt="Mastercard"
                className="h-8 opacity-60"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/100px-PayPal.svg.png"
                alt="PayPal"
                className="h-5 brightness-0 invert opacity-60"
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
