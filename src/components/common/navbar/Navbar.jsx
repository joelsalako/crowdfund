import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context";
import { useLocation } from "react-router-dom";

export const Navbar = () => {
  // check to see if admin is present in the url
  const isAdmin = useMemo(() => window.location.pathname.includes("admin"), []);

  // get current pathname from react router
  const { pathname } = useLocation();

  const { user, signOut, signInAsAdmin } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <nav className="shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center mr-24">
              <Link to={isAdmin ? "/admin" : "/"}>
                <h1 className="text-4xl font-bold">Logo</h1>
              </Link>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="flex space-x-10">
              <Link
                to={isAdmin ? "/admin" : "/"}
                className="border-b-transparent hover:border-b-gray-700 border-b  px-3 py-2  text-sm font-medium"
              >
                Home
              </Link>{" "}
              <Link
                to="/about"
                className="border-b-transparent hover:border-b-gray-700 border-b  px-3 py-2  text-sm font-medium"
              >
                About
              </Link>
              {/* show investments page only if user is logged in and not admin */}
              {user && !isAdmin && (
                <Link
                  to="/investments"
                  className="border-b-transparent hover:border-b-gray-700 border-b  px-3 py-2  text-sm font-medium"
                >
                  My Investments
                </Link>
              )}
              {/* show add crowdfund page only if user is logged in and admin */}
              {user && isAdmin && (
                <Link
                  to="/admin/add-crowdfund"
                  className="border-b-transparent hover:border-b-gray-700 border-b  px-3 py-2  text-sm font-medium"
                >
                  Add Crowdfund
                </Link>
              )}
              <Link
                to="/terms-of-use"
                className="border-b-transparent hover:border-b-gray-700 border-b  px-3 py-2  text-sm font-medium"
              >
                Terms of use
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {user ? ( // if user is logged in
                <div className="relative">
                  {/* user icon that has a dropdown menu of logout */}
                  <button
                    className="flex items-center text-gray-700 focus:outline-none gap-2"
                    onClick={handleDropdown}
                  >
                    {/* user icon in round shape */}
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200">
                      {/* user svg icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M3 10a7 7 0 1114 0v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1zm7-7a5 5 0 00-4.9 6h9.8A5 5 0 0010 3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium leading-none">
                      {user?.displayName}
                    </span>
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100  shadow-lg outline-none z-50">
                      <div className="py-1">
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={signOut}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex space-x-4">
                  {isAdmin ? (
                    <button
                      onClick={signInAsAdmin}
                      className="bg-gray-900 hover:bg-gray-700 text-white rounded-md  px-3 py-2  text-sm font-medium"
                    >
                      Login
                    </button>
                  ) : (
                    <>
                      {pathname === "/login" ? (
                        <Link
                          to="/register"
                          className="bg-gray-900 hover:bg-gray-700 text-white rounded-md  px-3 py-2  text-sm font-medium"
                        >
                          Create An Account
                        </Link>
                      ) : (
                        <Link
                          to="/login"
                          className="bg-gray-900 hover:bg-gray-700 text-white rounded-md  px-3 py-2  text-sm font-medium"
                        >
                          Login/Register
                        </Link>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
