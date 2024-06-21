import "./header.css";
import log from "../assets/logo.png";

export default function Header() {
  return (
    <div className="homeinput-header-container">
      <div className="header-text-container">
        <a href="/">
          <h1 className="header-texth1">
            <img id="logo" src={log} alt="" />
            pen<span id="FDA">FDA</span>
          </h1>
        </a>
      </div>
    </div>
  );
}
