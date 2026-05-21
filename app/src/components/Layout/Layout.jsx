import { Link, Outlet, useNavigate } from "react-router-dom";
import hyfLogo from "../../assets/hyf.svg";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

export default function Layout() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white">

      <header className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-lg"
          >
            <span className="font-logo text-2xl">
              EventHub
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/" className="hover:text-white text-gray-600">
              Home
            </Link>

            <Link to="/events" className="hover:text-white text-gray-600">
              Events
            </Link>

            <Link to="/about" className="hover:text-white text-gray-600">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-4">

            <Link
              to="/cart"
              className="relative flex items-center gap-2 text-gray-700 hover:text-white"
            >
              <FaShoppingCart />
              <span className="hidden sm:inline">Cart</span>

              {cart.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <Link
                  to="/orders"
                  className="hidden sm:block text-sm text-gray-600 hover:text-white"
                >
                  Orders
                </Link>

                <span className="hidden lg:block text-sm text-gray-500">
                  {user.email}
                </span>

                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-gray-600 hover:text-white"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-black text-white px-4 py-2 rounded-lg text-sm hover: bg-yellow-600 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        <Outlet />
      </main>


      <footer className="border-t text-center py-4 text-xs text-gray-500 bg-slate-900 border-b border-slate-800">
        © {new Date().getFullYear()} EventHub — Buy tickets, experience life
      </footer>
    </div>
  );
}