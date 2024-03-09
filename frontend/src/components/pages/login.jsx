import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import Form from "../form";
import logo from "../images/im1.jpeg";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../navbar";

export default function Login() {
  const { t } = useTranslation(),
    serverError = () => toast.error(t("serverError"));

  return (
    <section className="d-flex flex-column h-100">
      <Navbar />
      <ToastContainer />
      <div className="container-fluid h-100 bg-secondary-subtle">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img alt="" src={logo} className="rounded-circle" />
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
