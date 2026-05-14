import { Link, Outlet, useNavigate } from "react-router-dom";
import hyfLogo from "../../assets/hyf.svg";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext";
import styles from "./Layout.module.css";
import { FaShoppingCart } from "react-icons/fa";

export default function Layout() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.left}>
            <a
              href="https://www.hackyourfuture.dk/"
              target="_blank"
              rel="noreferrer"
              className={styles.logoLink}
            >
              <img
                src={hyfLogo}
                alt="HackYourFuture logo"
                className={styles.logo}
              />
            </a>
          </div>

          <div className={styles.center}>

            <Link to="/" className={styles.link}>
              Home
            </Link>

            <Link to="/events" className={styles.link}>
              Events
            </Link>

            <Link to="/cart" className={styles.link}>
              <FaShoppingCart className={styles.icon} />
              Cart ({cart.length})
            </Link>
          </div>

          <div className={styles.right}>
            {user ? (
              <>
                <span className={styles.user}>{user.email}</span>

                <Link to="/orders" className={styles.link}>
                  Orders
                </Link>

                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className={styles.button}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.link}>
                  Login
                </Link>
                <Link to="/register" className={styles.link}>
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}