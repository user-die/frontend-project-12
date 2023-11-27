/* eslint-disable */
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../changeLanguage";
import { MoonStarsFill } from "react-bootstrap-icons";
import { SunFill } from "react-bootstrap-icons";

export default function NotFound(props) {
  const { t } = useTranslation();
  const { theme, changeTheme } = props;

  return (
    <div id="chat" className="h-100">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light">
          <div className="container">
            <div className="row w-100 align-items-center">
              <div className="col-10">
                <a className="navbar-brand" href="/">
                  Chat Slack
                </a>
              </div>
              <div className="col-1">
                <button onClick={changeTheme} className="btn border-secondary">
                  {theme === "light" && <MoonStarsFill color="royalblue" />}

                  {theme === "dark" && <SunFill color="royalblue" />}
                </button>
              </div>
              <div className="col-1">
                <ChangeLanguage />
              </div>
            </div>
          </div>
        </nav>
        <div className="text-center">
          <h1 className="h4 text-muted">{t("page not found")}</h1>
          <p className="text-muted">
            {t("But you can go")} &nbsp;
            <a href="/">{t("the main page")}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
