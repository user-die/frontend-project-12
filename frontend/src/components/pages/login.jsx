/* eslint-disable */
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import Form from "../form";
import logo from "../images/im1.jpeg";
import "react-toastify/dist/ReactToastify.css";
import ChangeLanguage from "../changeLanguage";
import { MoonStarsFill } from "react-bootstrap-icons";
import { SunFill } from "react-bootstrap-icons";

export default function Login(props) {
  const { t } = useTranslation();
  const serverError = () => toast.error(t("serverError"));
  const { theme, changeTheme } = props;

  return (
    <section className="h-100">
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
            <div className="col -1">
              <ChangeLanguage />
            </div>
          </div>
        </div>
      </nav>
      <ToastContainer />
      <div className="container-fluid h-100 bg-secondary-subtle">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img alt="" src={logo} className="rounded-circle border" />
                </div>
                <Form serverError={serverError} />
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span className="me-1">{t("no account?")}</span>
                  <a href="/signup">{t("registration")}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
