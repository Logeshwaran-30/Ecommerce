import React, { useState, useRef, useContext, useEffect } from "react";
import { CartContext } from "../CartContext";
import { Link, useNavigate } from "react-router-dom";
import {
  SfIconShoppingCart,
  SfIconClose,
  SfButton,
  SfDrawer,
} from "@storefront-ui/react";
import { useDisclosure } from "@storefront-ui/react";
import { CSSTransition } from "react-transition-group";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

const categoriesContent = [
  {
    heading: "Clothing",
    items: [
      { title: "Men's Clothing", link: "/category/mens-clothing" },
      { title: "Women's Clothing", link: "/category/womens-clothing" },
    ],
  },
  {
    heading: "Electronics",
    items: [{ title: "Gadget", link: "/category/electronics" }],
  },
  {
    heading: "Jewellery",
    items: [{ title: "Jewels", link: "/category/jewellery" }],
  },
];

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.99 },
};

const Navbar = () => {
  const { cartCount, cart } = useContext(CartContext);
  const cartId = cart.length > 0 ? cart[0].id : null;
  const { isOpen, toggle, close } = useDisclosure();
  const drawerRef = useRef(null);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
   const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    function handleEsc(e) {
      if (e.key === "Escape") setDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?query=${searchValue}`);
      setSearchValue("");
      close();
    }
  };

  return (
    <div className="w-full">
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 transition-opacity"
          onClick={close}
        />
      )}

      {/* ✅ Single Navbar */}
      <header className="flex justify-between items-center w-full py-3 px-6 bg-white shadow-md fixed top-0 left-0 z-50">
        {/* Left: Logo + Browse */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo_sign_white.svg"
              alt="Logo"
              className="w-8 h-8 bg-primary-700 rounded-full p-1"
            />
            <span className="text-lg font-semibold text-primary-700">
              StoreFront
            </span>
          </Link>
        </div>

        {/* Middle: Search (Desktop Only) */}
        
         <div className="hidden md:flex items-center w-1/3 lg:w-1/4 relative">
  <input
    type="text"
    placeholder="Search products..."
    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <Search className="absolute right-3 text-gray-500" size={18} />
</div>

        {/* Right: Cart + Hamburger */}
        <div className="flex items-center gap-4">
          <Link to={`/addtocart/${cartId || ""}`} className="relative">
            <SfIconShoppingCart size="lg" className="text-primary-700" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs font-bold bg-red-600 text-white rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Hamburger (Mobile) */}
          <button
            className="flex flex-col justify-between w-6 h-5 md:hidden"
            onClick={toggle}
            aria-label="Menu"
          >
            <span className="block w-full h-0.5 bg-primary-700" />
            <span className="block w-full h-0.5 bg-primary-700" />
            <span className="block w-full h-0.5 bg-primary-700" />
          </button>
        </div>
      </header>

      {/* ✅ Mobile Drawer (Search on top, Close on right corner) */}
      <CSSTransition in={isOpen} timeout={300} unmountOnExit nodeRef={drawerRef}>
        <SfDrawer
          ref={drawerRef}
          open
          placement="left"
          className="bg-white w-[80%] max-w-xs h-screen fixed top-0 left-0 shadow-lg overflow-y-auto z-[60] p-5"
        >
          {/* Close Button on top-right */}
          <div className="absolute top-4 right-4">
            <SfButton
              square
              variant="tertiary"
              aria-label="Close"
              onClick={close}
            >
              <SfIconClose className="text-primary-700" />
            </SfButton>
          </div>

          {/* Search at top */}
          <form
            onSubmit={handleSearch}
            className="flex items-center border border-gray-300 rounded-full px-3 py-1.5 mb-6 mt-10"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex-1 text-sm outline-none bg-transparent"
            />
            <button
              type="submit"
              className="text-primary-700 font-medium hover:text-primary-500"
            >
              <Search className="text-gray-500" size={18} />
            </button>
          </form>

          {/* Categories */}
          {categoriesContent.map(({ heading, items }) => (
            <div key={heading} className="mb-4">
              <h3 className="font-medium text-neutral-900 mb-2">{heading}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.title}>
                    <Link
                      to={item.link}
                      className="block text-gray-700 hover:text-primary-700"
                      onClick={close}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </SfDrawer>
      </CSSTransition>
    </div>
  );
};

export default Navbar;
