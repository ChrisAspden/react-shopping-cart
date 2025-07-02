import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import PaintingsDropdown from "./DropDowns/PaintingsDropdown";
import CrossStitchDropdown from "./DropDowns/CrossStitchDropdown";
import KnittingDropdown from "./DropDowns/KnittingDropdown";
import ModelsDropdown from "./DropDowns/ModelsDropdown";
import Login from "./Login";
import SignupFormPopup from "./SignupFormPopup";

const categories = [
  {
    name: "Paintings",
    attribution: {
      text: "Animation by",
      name: "Todd Rocheford",
      link: "https://lottiefiles.com/toddrocheford",
    },
    subcategories: [
      {
        name: "Diamond Paintings",
        link: "/products/paintings/diamondPaintings",
      },
      {
        name: "Completed Paint by Numbers",
        link: "/products/paintings/paintByNumbers",
      },
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
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [showAttribution, setShowAttribution] = useState(false);
  const timeoutId = useRef(null);

  const handleMouseEnter = (categoryName) => {
    clearTimeout(timeoutId.current);
    setOpenCategory(categoryName);
  };

  const handleMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      setOpenCategory(null);
    }, 300);
  };

  useEffect(() => {
    const activeCategory = categories.find((cat) => cat.name === openCategory);
    if (activeCategory?.attribution) {
      const timeout = setTimeout(() => setShowAttribution(true), 150);
      return () => clearTimeout(timeout);
    } else {
      setShowAttribution(false);
    }
  }, [openCategory]);

  return (
    <div className="bg-primary bg-opacity-90">
      <div className="max-w-7xl flex items-center justify-between p-2 z-10 relative">
        {/* Left-aligned category buttons */}
        <div className="flex space-x-4">
          {categories.map(
            ({ name, subcategories, attribution, DropdownComponent }, idx) => {
              const isOpen = openCategory === name;
              return (
                <div
                  key={idx}
                  className="relative z-10"
                  onMouseEnter={() => handleMouseEnter(name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="px-3 py-2 hover:text-white">{name}</button>

                  <div
                    className={`absolute left-0 mt-1 w-[6rem] z-10 ${
                      isOpen ? "block" : "hidden"
                    }`}
                  >
                    <div className="relative bg-green-500 text-slate-900 rounded overflow-visible min-h-[160px] z-0">
                      {isOpen && name === "Paintings" && <PaintingsDropdown />}
                      <div className="relative z-10 pointer-events-auto">
                        <ul className="text-sm text-gray-900 font-medium leading-tight">
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

                          {isOpen &&
                            name !== "Paintings" &&
                            DropdownComponent && (
                              <li className="pointer-events-none mt-2">
                                <DropdownComponent />
                              </li>
                            )}
                        </ul>

                        {isOpen && attribution && (
                          <div
                            className={`mt-1 bg-black bg-opacity-60 text-white text-[10px] px-2 py-1 rounded pointer-events-auto transition-opacity duration-500 ${
                              showAttribution
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          >
                            <div className="leading-snug break-words max-w-[9rem]">
                              {attribution.text} {attribution.name}
                            </div>
                            <a
                              href={attribution.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onMouseDown={() =>
                                clearTimeout(timeoutId.current)
                              }
                              className="underline text-white break-words block mt-1 max-w-[9rem]"
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
            }
          )}
        </div>

        {/* Login + Signup popups beneath login button */}
        <div className="flex justify-end translate-x-14">
          <div className="relative">
            <button
              onClick={() => {
                setShowLogin((prev) => !prev);
                setShowSignup(false);
              }}
              className="text-black hover:text-white"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;








