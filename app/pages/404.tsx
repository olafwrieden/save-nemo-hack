import { ArrowLeftOutlined } from "@ant-design/icons";
import { useIsAuthenticated } from "@azure/msal-react";
import { Button, Col, Row } from "antd";
import Link from "next/link";
import { useContext } from "react";
import { MainContext } from "./_app";

const ErrorComponent = () => (
  <div className="container">
    <Row align="middle">
      <Col xs={24} sm={24} md={8}>
        <h1 className="font-weight-bold mb-4 display-4">Not Found</h1>
        <p className="font-size-md mb-4">
          The page or resource you are trying to access could not be found. It
          may have moved location.
        </p>
        <Link href="/">
          <Button type="primary" icon={<ArrowLeftOutlined />}>
            Go back
          </Button>
        </Link>
      </Col>
      <Col xs={24} sm={24} md={{ span: 14, offset: 2 }}>
        <img
          className="img-fluid mt-md-0 mt-4"
          src="/static/img/404.png"
          alt=""
        />
      </Col>
    </Row>
  </div>
);

const Error404 = () => {
  const [state, dispatch] = useContext(MainContext);
  const { currentTheme: theme } = state;

  const isAuthed = useIsAuthenticated();

  if (isAuthed) {
    return <ErrorComponent />;
  }

  return (
    <div className={`h-100 ${theme === "light" ? "bg-white" : ""}`}>
      <div className="container-fluid d-flex flex-column h-100 px-md-4 pb-md-4 pt-md-1">
        <div>
          <img
            src="/static/img/logo.png"
            alt="Logo"
            height="50px"
            className="m-4"
          />
        </div>
        <ErrorComponent />
      </div>
    </div>
  );
};

export default Error404;
