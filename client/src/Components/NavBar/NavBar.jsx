import React from "react";
import Burger from "../Burger/Burger";
import Menu from "../Menu/Menu";
import AuthService from "../../utils/AuthService";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSearch, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.scss";

const NavBar = ({ title, user }) => {
  const [open, setOpen] = React.useState(false);
  const auth = new AuthService;

  return (
    <nav className="navbar">
      <div className="container">
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
        <p>{title}</p>
        <span className="icons">
          <FontAwesomeIcon icon={faSearch} size="3x" />
        </span>
        {(user) ? <FontAwesomeIcon icon={faSignOutAlt} size="3x" onClick={auth.logout} /> : 
  <Link className="link" to="/login">
  <FontAwesomeIcon icon={faUserCircle} size="3x" />
  </Link>}
      </div>
    </nav>
  );
};

export default NavBar;
