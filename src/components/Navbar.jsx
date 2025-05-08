import React, { useState, useRef, useContext } from "react";
import { CartContext } from "../CartContext"; // Import CartContext
import { Link, useNavigate } from "react-router-dom";
import {
  SfIconShoppingCart,
  SfIconExpandMore,
  SfIconClose,
  SfIconSearch,
  SfButton,
  SfDrawer,
  SfInput,
} from "@storefront-ui/react";
import { useDisclosure } from "@storefront-ui/react";
import { CSSTransition } from "react-transition-group";

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

const Navbar = () => {
  const { cartCount, cart } = useContext(CartContext); // Access cartCount and cart from CartContext
  const cartId = cart.length > 0 ? cart[0].id : null; // Assuming the first item in the cart has an ID
  const { isOpen, toggle, close } = useDisclosure(); // Drawer state management
  const drawerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?query=${searchValue}`);
      setSearchValue("");
    }
  };

  // Handle category link click to close the drawer
  const handleCategoryClick = () => {
    close(); // Close the drawer when a category is selected
  };

  return (
    <div className="w-full h-full">
      {isOpen && <div className="fixed inset-0 bg-neutral-500 bg-opacity-50 transition-opacity" />}
      <header
        ref={menuRef}
        className="flex flex-wrap md:flex-nowrap justify-center w-full py-2 md:py-5 border-0 bg-primary-700 border-neutral-200 md:relative md:z-10"
      >
        <div className="flex items-center justify-start h-full max-w-[1536px] w-full px-4 md:px-10">
          {/* Logo */}
          <Link to="/" className="flex shrink-0 ml-4 md:ml-0 mr-2 md:mr-10 text-white">
            <picture>
              <source
                srcSet="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo_white.svg"
                media="(min-width: 1024px)"
              />
              <img
                src="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo_sign_white.svg"
                alt="Sf Logo"
                className="w-8 h-8 lg:w-[12.5rem] lg:h-[1.75rem]"
              />
            </picture>
          </Link>

          {/* Categories Button */}
          <SfButton
            className="hidden md:flex text-white bg-transparent font-body"
            aria-haspopup="true"
            aria-expanded={isOpen}
            slotSuffix={<SfIconExpandMore />}
            variant="tertiary"
            onClick={toggle}
            square
          >
            <span className="hidden md:inline-flex whitespace-nowrap px-2">Browse Products</span>
          </SfButton>

          {/* Drawer for Categories */}
          <CSSTransition in={isOpen} timeout={500} unmountOnExit nodeRef={drawerRef}>
            <SfDrawer
              ref={drawerRef}  // Use ref directly on the SfDrawer
              open
              disableClickAway
              placement="top"
              className="grid grid-cols-1 md:grid-cols-4 bg-white shadow-lg p-0 max-h-screen overflow-y-auto max-w-[400px] md:max-w-[1000px] absolute top-[calc(100%+1rem)] ml-20"
            >
              <div className="flex items-center justify-between px-4 py-2 bg-primary-700 md:hidden">
                <div className="font-medium text-white">Browse Products</div>
                <SfButton
                  square
                  variant="tertiary"
                  aria-label="Close"
                  onClick={close}
                  className="text-white"
                >
                  <SfIconClose />
                </SfButton>
              </div>
              {categoriesContent.map(({ heading, items }) => (
                <div key={heading} className="pt-6 md:pt-0">
                  <h2 className="typography-text-base font-medium text-neutral-900 p-4">{heading}</h2>
                  <hr className="mb-3.5" />
                  <ul>
                    {items.map((item) => (
                      <li key={item.title}>
                        <Link
                          to={item.link}
                          className="typography-text-base py-4 block"
                          onClick={handleCategoryClick} // Close the drawer when category is clicked
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <SfButton
                square
                variant="tertiary"
                aria-label="Close"
                onClick={close}
                className="hidden md:block absolute right-0"
              >
                <SfIconClose className="text-neutral-500" />
              </SfButton>
            </SfDrawer>
          </CSSTransition>

          {/* Search Bar */}
          <form className="hidden md:flex flex-1 mx-6" onSubmit={handleSearch}>
            <SfInput
              type="search"
              placeholder="Search products..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              wrapperClassName="flex-1"
              size="base"
              slotSuffix={
                <SfButton
                  type="submit"
                  variant="tertiary"
                  aria-label="Search"
                  className="rounded-l-none"
                >
                  <SfIconSearch />
                </SfButton>
              }
            />
          </form>

          {/* Cart Button */}
          <Link to={`/addtocart/${cartId || ''}`} className="relative flex items-center">
            <SfIconShoppingCart size="lg" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs font-bold bg-red-600 text-white rounded-full px-2 py-1">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
