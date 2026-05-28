import { Link, useLocation } from "react-router-dom";
import { routes } from "../../../sitemap";
import { useEffect, useState } from "react";
import i18n from "../../../i18n/index.i18n";
import { FaGlobe } from "react-icons/fa";

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
  const navRoutes = extractRoutes();

  const [lang, setLang] = useState<"en" | "ar">(() => {
    const defaultLang = localStorage.getItem("lang");
    return defaultLang == "ar" || defaultLang == "en" ? defaultLang : "en";
  });

  useEffect(() => {
    document.documentElement.dir = lang == "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  }, [lang]);

  const toggleLang = () => {
    setLang((lang) => (lang == "en" ? "ar" : "en"));
  };

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
                    {route.label?.[lang]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <button
          onClick={toggleLang}
          className="btn btn-outline-primary ms-2 d-flex align-items-center gap-2"
        >
          <FaGlobe />
          {lang === "ar" ? "EN" : "AR"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
