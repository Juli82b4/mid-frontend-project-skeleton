import { Link, Outlet } from "react-router-dom";
import hyfLogo from "../../assets/hyf.svg";


export default function Layout() {
  return (
    <div>
      <header>
        <nav>
        <a href="https://www.hackyourfuture.dk/" target="_blank" className="link">
          <img src={hyfLogo} alt="HackYourFuture logo" className="logo" width={200} style={{padding: '20px'}}/>
        </a>
          {/* Navigation links go here — e.g. link to event list, cart, login */}
          <Link to="/events" className="link">Events</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        {/* Footer content goes here */}
      </footer>
    </div>
  );
}
