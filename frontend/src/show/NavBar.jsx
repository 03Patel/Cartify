import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Cart from "../component/Cart";
import { useCart } from "../component/ContextReducer";
import { Badge } from 'react-bootstrap'


function NavBar() {
let data = useCart();
  const [cartView,setCartView] = useState(false)

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link className="text-2xl font-bold italic" to="/">
            Cartify
          </Link>

         

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded hover:bg-green-700"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-3">
            {!localStorage.getItem("authToken") ? (
              <>
                <Link className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-100" to="/loginuser">Log In</Link>
                <Link className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-100" to="/createuser">Sign Up</Link>
              </>
            ) : (
              <>
                 
                <button onClick={handleLogoutClick} className="bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-100">Log Out</button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden flex flex-col space-y-3 mt-3 pb-3 border-t border-green-500">
            <Link to="/" className="hover:text-gray-200">Home</Link>
            {!localStorage.getItem("authToken") ? (
              <>
                <Link to="/loginuser" className="hover:text-gray-200">Log In</Link>
                <Link to="/createuser" className="hover:text-gray-200">Sign Up</Link>
              </>
            ) : (
              <>
                <button onClick={handleLogoutClick} className="hover:text-gray-200">Log Out</button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
