import { Link, Outlet } from "react-router-dom";
import hyfLogo from "../../assets/hyf.svg";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./Layout.module.css";

export default function Layout() {
  const { user, logout } = useAuth();

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
              <img src={hyfLogo} alt="HackYourFuture logo" className={styles.logo} />
            </a>
          </div>

          <div className={styles.center}>
            <Link to="/events" className={styles.link}>
              Events
            </Link>
          </div>

          <div className={styles.right}>
            {user ? (
              <>
                <span className={styles.user}>{user.email}</span>
                <button onClick={logout} className={styles.button}>
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