import { APP_NAME } from "../../constants/AppConfig";

const Footer = () => (
  <footer className="footer">
    <span>
      &copy; {`${new Date().getFullYear()}`}{" "}
      <span className="font-weight-semibold">{`${APP_NAME}.`}</span> All rights
      reserved.
    </span>
  </footer>
);

export default Footer;
