import { Form } from "./form";
import logo from "./images/im1.jpeg";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { t } = useTranslation();
  const serverError = () => toast.error(t("serverError"));

  return (
    <section className="h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">
            Chat Slack
          </a>
        </div>
      </nav>
      <ToastContainer />
      <div className="container-fluid h-100 bg-light">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src={logo} className="rounded-circle"></img>
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
};

export default Login;
