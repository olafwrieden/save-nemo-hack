import { Card, Row, Col } from "antd";
import LoginForm from "../components/LoginForm";

const backgroundStyle = {
	backgroundImage: 'url(/static/img/login-background.jpg)',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover'
}

const Login = (props) => {
  return (
    <div className="h-100" style={backgroundStyle}>
      <div className="container d-flex flex-column justify-content-center h-100">
        <Row justify="center">
          <Col xs={20} sm={20} md={20} lg={7}>
            <Card>
              <div className="my-4">
                <div className="text-center">
                  <img className="img-fluid" src={`/static/img/logo.png`} alt="" />
                  <p>Don't have an account yet? <a href="/auth/register-1">Sign Up</a></p>
                </div>
                <Row justify="center">
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <LoginForm {...props} />
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Login