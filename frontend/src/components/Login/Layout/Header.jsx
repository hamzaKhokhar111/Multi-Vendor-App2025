import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
// import Cart from "../../../cart/Cart";
// import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import { categoriesData, productData } from "../../../static/data";
import { backend_url } from "../../../server";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  //   const { isSeller } = useSelector((state) => state.seller);
  //   const { wishlist } = useSelector((state) => state.wishlist);
  //   const { cart } = useSelector((state) => state.cart);
  //   const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);


  // console.log(user.avatar)

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  // console.log("Backend URL:", backend_url);
// console.log("User Avatar:", user?.avatar);
// console.log("Full Image Path:", `${backend_url}/uploads/${user?.avatar}`);

 

  return (
   <>
  {loading ? null : (
    <div className={`${styles.section}`}>
      <div className="md:h-[50px] 800px:my-[20px] flex mt-2 items-center justify-between gap-3">
        {/* Logo */}
        <div>
          <Link to="/">
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt="logo"
            />
          </Link>
        </div>

        {/* Search Box */}
        <div className="w-[50%] relative">
          <input
            type="text"
            placeholder="Search Product..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
          />
          <AiOutlineSearch
            size={30}
            className="absolute right-2 top-1.5 cursor-pointer"
          />

          {searchData && searchData.length > 0 && (
            <div className="absolute min-h-[30vh] w-full bg-slate-50 shadow-sm-2 z-[9] p-4">
              {searchData.map((i, index) => {
                const Product_name = i.name.replace(/\s+/g, "-");
                return (
                  <Link to={`/product/${Product_name}`} key={index}>
                    <div className="w-full flex items-center py-2 hover:bg-gray-100 transition">
                      <img
                        src={i.image_Url[0].url}
                        alt={i.name}
                        className="w-[40px] h-[40px] mr-[10px] object-cover rounded"
                      />
                      <h1>{i.name}</h1>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Seller Button */}
        <div className={`${styles.button}`}>
          <Link to="/seller">
            <div className="text-[#fff] flex items-center">
              Become Seller <IoIosArrowForward className="ml-1" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )}

  {/* Navbar Section */}
  <div
    className={`${
      active ? "shadow-sm fixed top-0 left-0 z-10" : ""
    } transition 800px:flex items-center justify-between w-full mt-4 bg-[#3321c8] h-[70px]`}
  >
    <div
      className={`${styles.section} relative ${styles.noramlFlex} flex flex-row justify-between`}
    >
      {/* Categories */}
      <div>
        <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
          <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
          <button
            className="h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md"
          >
            All Categories
          </button>
          <IoIosArrowDown
            size={20}
            className="absolute right-2 top-4 cursor-pointer"
            onClick={() => setDropDown(!dropDown)}
          />
          {dropDown && (
            <DropDown categoriesData={categoriesData} setDropDown={setDropDown} />
          )}
        </div>
      </div>

      {/* Nav Items */}
      <div className={`${styles.noramlFlex}`}>
        <Navbar active={activeHeading} />
      </div>

      {/* Icons */}
      <div className="flex">
        {/* Wishlist */}
        <div className="relative cursor-pointer mr-[15px]">
          <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
          <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white text-[12px] leading-tight text-center">
            0
          </span>
        </div>

        {/* Cart */}
        <div className="relative cursor-pointer mr-[15px]">
          <AiOutlineShoppingCart size={30} color="rgb(255 255 255 / 83%)" />
          <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white text-[12px] leading-tight text-center">
            1
          </span>
        </div>

        {/* Profile */}
        <div className="relative cursor-pointer mr-[15px]">
          {isAuthenticated ? (
            <Link to="/profile">
              <img
                  //  src={"http://localhost:8000/uploads/edit2-1757353424329-725425818.jpg"}
                   src={`${backend_url}uploads/${user?.avatar}`}
                    className="w-[30px] h-[35px] rounded-full object-cover"
                   alt="profile"
              />
            </Link>
          ) : (
            <Link to="/login">
              <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
            </Link>
          )}
        </div>
      </div>
    </div>
  </div>
</>

  );
};

export default Header;
