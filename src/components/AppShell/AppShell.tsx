import { useEffect, useState, type FormEvent } from "react";
import { NavLink, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleTheme } from "../../features/theme/themeSlice";
import styles from "./AppShell.module.css";

const menuItems = [
  { label: "Main", to: "/" },
  { label: "Category movies", to: "/movies/popular" },
  { label: "Filtered movies", to: "/filtered-movies" },
  { label: "Search", to: "/search" },
  { label: "Favorites", to: "/favorites" }
];

export function AppShell() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);
  const isDark = mode === "dark";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(searchParams.get("query") ?? "");

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  useEffect(() => {
    if (location.pathname === "/search") {
      setSearchValue(searchParams.get("query") ?? "");
    }
  }, [location.pathname, searchParams]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchValue.trim();
    if (!query) {
      navigate("/search");
      setIsMenuOpen(false);
      return;
    }

    navigate(`/search?query=${encodeURIComponent(query)}`);
    setIsMenuOpen(false);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <NavLink to="/" className={styles.logo} aria-label="Go to TMDB home">
          <span className={styles.logoText}>TMDB</span>
          <span className={styles.logoMark} aria-hidden="true" />
        </NavLink>

        <nav
          className={isMenuOpen ? `${styles.nav} ${styles.navOpen}` : styles.nav}
          id="main-navigation"
          aria-label="Main navigation"
        >
          {menuItems.map((item, index) => (
            <span className={styles.navItem} key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NavLink>
              {index < menuItems.length - 1 && <span className={styles.divider}>|</span>}
            </span>
          ))}
        </nav>

        <div className={styles.actions}>
          <form className={styles.searchForm} onSubmit={handleSubmit}>
            <input
              className={styles.searchInput}
              type="search"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Enter movie title"
              aria-label="Search movie by title"
            />
            <button className={styles.searchButton} type="submit">
              Search
            </button>
          </form>

          <button
            className={styles.themeButton}
            type="button"
            aria-label={isDark ? "Переключить на светлую тему" : "Переключить на темную тему"}
            onClick={() => dispatch(toggleTheme())}
          >
            <span className={styles.themeIcon} aria-hidden="true">
              {isDark ? "☀" : "☾"}
            </span>
          </button>

          <button
            className={styles.menuButton}
            type="button"
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
