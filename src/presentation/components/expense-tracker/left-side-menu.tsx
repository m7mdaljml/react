import { NavLink } from "react-router-dom";
import { routes } from "../../../sitemap";
import { useTranslation } from "react-i18next";
import { useConfig } from "../../../context/context";

const LeftSideMenu = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const config = useConfig();

  const expenseRoute = routes?.[0]?.children?.find(
    (r) => r.path == "expense-tracker",
  );

  const children = expenseRoute?.children || [];

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 vh-100 border-end bg-light"
      style={{ width: "280px" }}
    >
      <ul className="nav flex-column gap-1">
        {children.map((child, i) => {
          const fullPath = `/expense-tracker/${child.path}`;
          return (
            <li key={i}>
              <NavLink
                to={fullPath}
                className={({ isActive }) =>
                  `nav-link py-1 ${isActive ? "active" : "link-body-emphasis"}`
                }
              >
                {child.handle?.label?.[lang] ||
                  child.handle?.label?.[
                    config.cultures.find((c) => c.isDefault)?.lang
                  ]}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeftSideMenu;
