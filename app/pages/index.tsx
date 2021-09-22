import { useMsal } from "@azure/msal-react";
import { Button, Col, Row } from "antd";
import Form from "antd/lib/form/Form";
import { useContext } from "react";
import { APP_NAME } from "../constants/AppConfig";
import { MainContext } from "./_app";

const backgroundURL = "/static/img/login-background.jpg";
const backgroundStyle = {
  backgroundImage: `url(${backgroundURL})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const App = () => {
  const [state, dispatch] = useContext(MainContext);
  const { instance } = useMsal();
  const { currentTheme: theme } = state;

  return (
    <div className={`h-100 ${theme === "light" ? "bg-white" : ""}`}>
      <Row justify="center" className="align-items-stretch h-100">
        <Col xs={20} sm={20} md={24} lg={16}>
          <div className="container d-flex flex-column justify-content-center h-100">
            <Row justify="center">
              <Col xs={24} sm={24} md={20} lg={12} xl={8}>
                <h1>Sign In</h1>
                <p>
                  Sign in with your {APP_NAME} account or{" "}
                  create an account if you don't
                  have one yet.
                </p>
                <div className="mt-4">
                  <Form layout="vertical" name="login-form">
                    <Button
                      onClick={() => instance.loginRedirect()}
                      className="mr-2"
                      disabled={false}
                    >
                      Sign in or Sign up
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={0} sm={0} md={0} lg={8}>
          <div
            className="d-flex flex-column justify-content-between h-100 px-4"
            style={backgroundStyle}
          >
            <div className="text-right">
              <img
                src="/static/img/logo.png"
                alt="logo"
                height="50px"
                className="m-4"
              />
            </div>
            <Row justify="center">
              <Col xs={0} sm={0} md={0} lg={20}>
                <img
                  className="img-fluid mb-5"
                  src="/static/img/woman-run.png"
                  alt=""
                />
                <h1 className="text-white">Welcome to {APP_NAME}</h1>
                <p className="text-white">
                  Monitoring your Nemo Pi Smart Buoys is easy with Nemo Cloud.
                  This is the official portal for all things Nemo Pi.
                </p>
              </Col>
            </Row>
            <div className="d-flex justify-content-end m-4">
              <div>
                <a
                  className="text-white"
                  href="/#"
                  onClick={(e) => e.preventDefault()}
                >
                  Term of Use
                </a>
                <span className="mx-2 text-white"> | </span>
                <a
                  className="text-white"
                  href="/#"
                  onClick={(e) => e.preventDefault()}
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default App;
