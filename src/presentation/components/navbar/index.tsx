import { Link, useLocation } from "react-router-dom";
import { routes } from "../../../sitemap";
import { useEffect, useState } from "react";
import i18n from "../../../i18n/index.i18n";
import { FaGlobe } from "react-icons/fa";
import { useConfig } from "../../../context/context";

const extractRoutes = () => {
  const appRoutes = routes?.[0]?.children || [];

  return appRoutes
    .filter((route) => route.handle?.label && route.path !== "*")
    .map((route) => {
      const basePath = route.path || "";
      let fullPath = `/${basePath}`;
      if (route.children?.length) {
        const firstChild = route.children.find((c) => c.path && !c.index);
        if (firstChild?.path) fullPath = `/${basePath}`;
      }
      return {
        label: route.handle.label,
        path: fullPath,
        children: route.children,
      };
    });
};

const Navbar = () => {
  const config = useConfig();

  const navRoutes = extractRoutes();

  const [lang, setLang] = useState(() => {
    const defaultLang = localStorage.getItem("lang");
    return (
      config.cultures.find((c) => c.lang === defaultLang)?.lang ||
      config.cultures.find((c) => c.isDefault)?.lang
    );
  });

  useEffect(() => {
    document.documentElement.dir =
      config.cultures.find((c) => c.lang == lang)?.dir || "ltr";
    document.documentElement.lang =
      config.cultures.find((c) => c.lang == lang)?.lang ||
      config.cultures.find((c) => c.isDefault)?.lang;
    i18n.changeLanguage(
      config.cultures.find((c) => c.lang == lang)?.lang ||
        config.cultures.find((c) => c.isDefault)?.lang,
    );
    localStorage.setItem("lang", lang);
  }, [lang]);

  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg bg-primary-subtle">
      <div className="d-flex justify-content-between container-fluid">
        <div className="d-flex justify-content-between align-items-center">
          <span className="navbar-brand">React Projects</span>

          <ul className="navbar-nav d-flex gap-3">
            {navRoutes.map((route, i) => {
              const isActive = location.pathname.startsWith(route.path);

              return (
                <li key={i} className="nav-item">
                  <Link
                    to={
                      route.children?.length
                        ? `${route.path}/${route.children?.[0]?.path}`
                        : route.path
                    }
                    className={`nav-link ${isActive ? "active fw-bold" : ""}`}
                  >
                    {route.label?.[lang] ||
                      route.label?.[
                        config.cultures.find((c) => c.isDefault)?.lang
                      ]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {config.cultures.length === 2 ? (
          <button
            onClick={() =>
              setLang(
                (currentLang) =>
                  config.cultures.find((c) => c.lang !== currentLang)?.lang ||
                  currentLang,
              )
            }
            className="btn btn-outline-primary ms-2 d-flex align-items-center gap-2"
          >
            <FaGlobe />
            {config.cultures.find((c) => c.lang !== lang)?.lang.toUpperCase()}
          </button>
        ) : (
          <div className="dropdown ms-2">
            <button
              className="btn btn-outline-primary dropdown-toggle d-flex align-items-center gap-2"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaGlobe />
              {lang.toUpperCase()}
            </button>

            <ul
              className={`dropdown-menu ${
                lang !== "ar" ? "dropdown-menu-end" : "dropdown-menu-start"
              }`}
            >
              {config.cultures.map((culture) => (
                <li key={culture.id}>
                  <button
                    className={`dropdown-item ${
                      culture.lang === lang ? "active" : ""
                    }`}
                    onClick={() => setLang(culture.lang)}
                  >
                    {culture.name || culture.lang.toUpperCase()}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
