import styles from "./HomePage.module.css";
import bannerImage from "../../assets/banner.webp";

function HomePage() {
  return (
    <div className={styles.container}>
      <img
        src={bannerImage}
        alt="Events banner"
        className={styles.banner}
      />

      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to EventHub</h1>

        <p className={styles.text}>
          Discover amazing events, concerts, and experiences near you.
          Browse events, add tickets to your cart, and book instantly.
        </p>
      </div>
    </div>
  );
}

export default HomePage;