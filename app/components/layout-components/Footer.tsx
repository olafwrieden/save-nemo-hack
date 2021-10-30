import { APP_COPYRIGHT } from "../../constants/AppConfig";

const Footer = () => (
  <footer className="footer">
    <span>
      &copy; {`${new Date().getFullYear()}`}{" "}
      <span className="font-weight-semibold">{`${APP_COPYRIGHT}`}</span> All
      rights reserved.
    </span>
  </footer>
);

export default Footer;
