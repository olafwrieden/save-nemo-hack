import { APP_COPYRIGHT } from "../../constants/AppConfig";

const Footer = () => (
  <footer className="footer">
    <span>
      &copy; {`${new Date().getFullYear()}`}{" "}
      <span className="font-weight-semibold">{`${APP_COPYRIGHT}`}</span> All
      rights reserved.
    </span>
    <a className="text-gray" href="/#" onClick={(e) => e.preventDefault()}>
      Privacy Policy
    </a>
  </footer>
);

export default Footer;
