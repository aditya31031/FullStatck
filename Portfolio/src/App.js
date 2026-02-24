import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Home from "./components/e-commerce/component/home/Home";
import Seller from "./components/e-commerce/component/seller/Seller";
import ProtectedRoute from "./components/e-commerce/ProtectedRoute";
import Product from "./components/e-commerce/component/seller/SellerProduct";
import Register from "./components/e-commerce/component/register/Register";
import Admin from "./components/e-commerce/component/admin/Admin";
import AdminCategory from "./components/e-commerce/component/admin/adminCategory/AdminCategory";
import AdminSubCategory from "./components/e-commerce/component/admin/adminSubCategory/AdminSubCategory";
import AdminSubSubCategory from "./components/e-commerce/component/admin/adminSubSubCategory/AdminSubSubCategory";
import ViewMore from "./components/e-commerce/component/viewMore/ViewMore";
import Cart from "./components/e-commerce/component/cart/Cart";
import PlaceOrder from "./components/e-commerce/component/placeOrder/PlaceOrder";
import OrderConfirmation from "./components/e-commerce/component/orderConfirmation/OrderConfirmation";
import OrderHistory from "./components/e-commerce/component/orderHistory/OrderHistory";
import AdminSubSubSubCategory from "./components/e-commerce/component/admin/adminSubSubSubCategory/AdminSubSubSubCategory";
import AdminProduct from "./components/e-commerce/component/admin/adminProduct/AdminProduct";
import Ecom from "./components/e-commerce/Ecom";
import Calculator from "./components/calculator/Calculator";
import TodoList from "./components/todoList/TodoList";
import WeatherApp from "./components/weather/WeatherApp";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useState } from "react";
import { useEffect } from "react";

import "./App.css";

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  // Progress loader
  useEffect(() => {
    const duration = 3000;
    const interval = 50;
    let time = 0;

    const timer = setInterval(() => {
      time += interval;
      setProgress(Math.min((time / duration) * 100, 100));
      if (time >= duration) {
        clearInterval(timer);
        setTimeout(() => setLoading(false), 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const [ViewMoreDetails, setViewMoreDetails] = useState(null);
  const colors = ["#FFD700", "#FF4500", "#FFFFFF", "#1E90FF"];
  const generateSparkles = (count) => {
    const sparkles = [];
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 4 + 2;
      const top = Math.random() * 100 + "%";
      const left = Math.random() * 100 + "%";
      const delay = Math.random() * 10 + "s";
      const duration = Math.random() * 20 + 10 + "s";
      const radius = Math.random() * 50 + 50;
      const color = colors[Math.floor(Math.random() * colors.length)];

      sparkles.push(
        <div
          key={i}
          className="sparkle"
          style={{
            width: size + "px",
            height: size + "px",
            top,
            left,
            backgroundColor: color,
            animationDelay: delay,
            animationDuration: duration,
            position: "absolute",
            borderRadius: "50%",
            transform: `translateX(${radius}px)`,
          }}
        />
      );
    }
    return sparkles;
  };

  return (
    <div className="relative min-h-full bg-gray-900 text-white overflow-hidden">
      {!loading && location.pathname === "/" && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {generateSparkles(100)}
        </div>
      )}
      {loading ? (
        <div className="loading-screen">
          <div className="loading-box">
            <h2 className="loading-text">Loading Portfolio...</h2>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="loading-percent">{Math.floor(progress)}%</p>
          </div>
        </div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <>
                {" "}
                <Navbar /> <Hero /> <Projects /> <Skills /> <Contact />{" "}
                <Footer />{" "}
              </>
            }
          />
          <Route
            path="/ecommerce/home"
            element={
              <ProtectedRoute
                element={<Home setViewMoreDetails={setViewMoreDetails} />}
                allowedRoles={["customer"]}
              />
            }
          />
         
          <Route
            path="/ecommerce/home/viewmore"

            element={<ViewMore ViewMoreDetails={ViewMoreDetails} />}



          />
          <Route
            path="/ecommerce/home/place-order"
            element={
              <ProtectedRoute
                element={<PlaceOrder />}
                allowedRoles={["customer"]}
              />
            }
          />
          <Route
            path="/ecommerce/home/order-confirmation/:orderId"
            element={
              <ProtectedRoute
                element={<OrderConfirmation />}
                allowedRoles={["customer", "seller", "admin"]}
              />
            }
          />
          <Route
            path="/ecommerce/home/order-history"
            element={<OrderHistory />}
          />
          <Route path="/ecommerce/home/cart" element={<Cart />} />

          {/* Seller Routes */}
          <Route
            path="/ecommerce/seller"
            element={
              <ProtectedRoute element={<Seller />} allowedRoles={["seller"]} />
            }
          />
          <Route
            path="/ecommerce/seller/product"
            element={
              <ProtectedRoute element={<Product />} allowedRoles={["seller"]} />
            }
          />

          {/* Admin Routes */}
          <Route
            path="/ecommerce/admin"
            element={
              <ProtectedRoute element={<Admin />} allowedRoles={["admin"]} />
            }
          />
          <Route
            path="/ecommerce/admin/admincategory"
            element={
              <ProtectedRoute
                element={<AdminCategory />}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/ecommerce/admin/adminsubcategory"
            element={
              <ProtectedRoute
                element={<AdminSubCategory />}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/ecommerce/admin/adminsubsubcategory"
            element={
              <ProtectedRoute
                element={<AdminSubSubCategory />}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/ecommerce/admin/adminsubsubsubcategory"
            element={
              <ProtectedRoute
                element={<AdminSubSubSubCategory />}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/ecommerce/admin/adminProduct"
            element={
              <ProtectedRoute
                element={<AdminProduct />}
                allowedRoles={["admin"]}
              />
            }
          />

          {/* Other pages */}
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/todolist" element={<TodoList />} />
          <Route path="/weather" element={<WeatherApp />} />

          {/* E-commerce wrapper (non-routing) */}
          <Route
            path="ecommerce/*"
            element={
              <Ecom
                ViewMoreDetails={ViewMoreDetails}
                setViewMoreDetails={setViewMoreDetails}
              />
            }
          />

          {/* Register */}
          <Route path="/ecommerce/register" element={<Register />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
