import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../Context/useAuth";
import Login from "./LoginFormPopup";
import SignupFormPopup from "./SignupFormPopup";
import PaintingsDropdown from "./DropDowns/PaintingsDropdown";
import CrossStitchDropdown from "./DropDowns/CrossStitchDropdown";
import KnittingDropdown from "./DropDowns/KnittingDropdown";
import ModelsDropdown from "./DropDowns/ModelsDropdown";

// 💡 Category Config
const categories = [
  {
    name: "Paintings",
    attribution: {
      text: "Animation by",
      name: "Todd Rocheford",
      link: "https://lottiefiles.com/toddrocheford",
    },
    subcategories: [
      { name: "Diamond Paintings", link: "/products/paintings/diamondPaintings" },
      { name: "Completed Paint by Numbers", link: "/products/paintings/paintByNumbers" },
    ],
    DropdownComponent: PaintingsDropdown,
  },
  {
    name: "Cross Stitch",
    attribution: {
      text: "Animation by",
      name: "Cherry Waussell",
      link: "https://lottiefiles.com/vpsjqfc1cnrenzk4",
    },
    subcategories: [
      { name: "Landscapes", link: "/products/crossStitch/landscapes" },
      { name: "People", link: "/products/crossStitch/people" },
      { name: "Fantasy", link: "/products/crossStitch/fantasy" },
      { name: "Masterpieces", link: "/products/crossStitch/masterPieces" },
    ],
    DropdownComponent: CrossStitchDropdown,
  },
  {
    name: "Knitting",
    attribution: {
      text: "Animation by",
      name: "Jeffrey Christopher",
      link: "https://lottiefiles.com/zeffchris",
    },
    subcategories: [
      { name: "Crochet", link: "/products/home/crochet" },
      { name: "Scarfs", link: "/products/home/scarfs" },
      { name: "Bags", link: "/products/home/bags" },
    ],
    DropdownComponent: KnittingDropdown,
  },
  {
    name: "Miniature Models",
    attribution: {
      text: "Animation by",
      name: "Neel Dandiwala",
      link: "https://lottiefiles.com/oczz0mmmdx",
    },
    subcategories: [
      { name: "Lego", link: "/products/toys/lego" },
      { name: "Paper", link: "/products/toys/paper" },
    ],
    DropdownComponent: ModelsDropdown,
  },
];


const CategoryBar = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [showAttribution, setShowAttribution] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const timeoutId = useRef(null);
  const { user, logout } = useAuth();
  const accountPopupRef = useRef(null);

  const handleMouseEnter = (categoryName) => {
    clearTimeout(timeoutId.current);
    setOpenCategory(categoryName);
  };

  const handleMouseLeave = () => {
    timeoutId.current = setTimeout(() => setOpenCategory(null), 300);
  };

  useEffect(() => {
    const activeCat = categories.find((cat) => cat.name === openCategory);
    if (activeCat?.attribution) {
      const timeout = setTimeout(() => setShowAttribution(true), 150);
      return () => clearTimeout(timeout);
    }
    setShowAttribution(false);
  }, [openCategory]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountPopupRef.current && !accountPopupRef.current.contains(event.target)) {
        setShowAccountPopup(false);
      }
    };

    if (showAccountPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAccountPopup]);

  return (
    <div className="bg-primary bg-opacity-90">
      <div className="max-w-7xl flex justify-between items-center p-2 relative z-10">

        {/* 🧵 Category Buttons */}
        <div className="flex space-x-4">
          {categories.map(({ name, subcategories, attribution, DropdownComponent }, idx) => {
            const isOpen = openCategory === name;

            return (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => handleMouseEnter(name)}
                onMouseLeave={handleMouseLeave}
              >
                <button className="px-3 py-2 hover:text-white">{name}</button>

                <div className={`absolute left-0 mt-1 w-[6rem] z-10 ${isOpen ? "block" : "hidden"}`}>
                  <div className="bg-green-500 text-slate-900 rounded min-h-[160px] overflow-visible relative z-0">
                    {isOpen && name === "Paintings" && <PaintingsDropdown />}

                    <div className="pointer-events-auto relative z-10">
                      <ul className="text-sm font-medium leading-tight text-gray-900">
                        {subcategories.map((sub, subIdx) => (
                          <li key={subIdx}>
                            <Link
                              to={sub.link}
                              onMouseDown={() => clearTimeout(timeoutId.current)}
                              className="block px-3 py-2 hover:bg-white/10"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                        {isOpen && name !== "Paintings" && DropdownComponent && (
                          <li className="pointer-events-none mt-2">
                            <DropdownComponent />
                          </li>
                        )}
                      </ul>

                      {/* ℹ️ Attribution */}
                      {isOpen && attribution && (
                        <div
                          className={`mt-1 px-2 py-1 bg-black bg-opacity-60 text-white text-[10px] rounded transition-opacity duration-500 ${
                            showAttribution ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <div className="leading-snug break-words max-w-[9rem]">
                            {attribution.text} {attribution.name}
                          </div>
                          <a
                            href={attribution.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseDown={() => clearTimeout(timeoutId.current)}
                            className="underline block mt-1 break-words max-w-[9rem]"
                          >
                            {attribution.link}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 🛒 Auth + Cart */}
        <div className="flex justify-end translate-x-14">
          <div className="relative text-black">
            <div className="flex items-center space-x-2">
              {user ? (
                <>
                  <UserCircleIcon className="w-6 h-6 text-gray-800" />
                  <span
                    className="text-sm cursor-pointer hover:underline"
                    onClick={() => setShowAccountPopup((prev) => !prev)}
                  >
                    {user.email}
                  </span>

                  {showAccountPopup && (
                    <div
                      ref={accountPopupRef}
                      className="absolute top-full left-0 mt-2 min-h-[100px] bg-green-500 border border-gray-300 shadow-lg px-4 pt-4 pb-2 rounded z-50 text-white w-40 flex flex-col justify-end"
                    >
                      <button
                        className="text-xs py-1 w-full bg-primary rounded hover:bg-green-600"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <button
                    className="hover:text-white"
                    onClick={() => {
                      setShowLogin((prev) => !prev);
                      setShowSignup(false);
                      setShowAccountPopup(false);
                    }}
                  >
                    Login
                  </button>

                  {showLogin && (
                    <div className="absolute right-0 top-full mt-2 z-50">
                      <Login
                        onClose={() => setShowLogin(false)}
                        onCreateAccount={() => {
                          setShowLogin(false);
                          setShowSignup(true);
                        }}
                      />
                    </div>
                  )}

                  {showSignup && (
                    <div className="absolute right-0 top-full mt-2 z-50">
                      <SignupFormPopup onClose={() => setShowSignup(false)} />
                    </div>
                  )}
                </>
              )}

              {/* 🛒 Cart for all users */}
              <a href="/cart">
                <FiShoppingCart className="h-10 w-10 text-white p-2 rounded-md ml-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;











