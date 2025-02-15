import React from "react";
import { Link } from "react-router-dom";

function NavbarItem(props) {
    return (
        <li className="nav-item">
            <Link className="nav-link" to={props.href}>{props.label}</Link>
        </li>
    )
}

export default NavbarItem;