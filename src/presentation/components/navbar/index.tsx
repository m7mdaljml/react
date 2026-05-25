import { Link, useLocation } from "react-router-dom";
import { routes } from "../../../sitemap";
import { useEffect, useState } from "react";
import i18n from "../../../i18n/index.i18n";
import type { TAppRoute } from "../../../domain/meta/i-types";
import { FaGlobe } from "react-icons/fa";

const extractRoutes = (routeList: TAppRoute[], parentPath = "") => {
  let result = [] as TAppRoute[];
  routeList.forEach((route) => {
    const fullPath = route.path ? `${parentPath}${route.path}` : parentPath;
    if (route.handle?.label) {
      result.push({
        ...route,
        path: route.index ? parentPath || "/" : fullPath,
      });
    }
    if (route.children)
      result = result.concat(extractRoutes(route.children, fullPath));
  });
  return result;
};

const Navbar = () => {
  const navRoutes = extractRoutes(routes);

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
      <div className="container-fluid">
        <span className="navbar-brand">React Projects</span>

        <div className="collapse navbar-collapse d-flex justify-content-between align-items-center">
          <ul className="navbar-nav">
            {navRoutes.map((route, index) => (
              <li key={index} className="nav-item">
                <Link
                  className={`nav-link ${route.path && location.pathname == route.path ? "active fw-bold" : ""}`}
                  to={route.path || "/"}
                >
                  {route.handle?.label[lang]}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={toggleLang}
            className="btn btn-outline-primary ms-2 d-flex align-items-center gap-2"
          >
            <FaGlobe />
            {lang === "ar" ? "EN" : "AR"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
