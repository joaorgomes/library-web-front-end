import React from "react";
import { Link } from "react-router-dom";

function NavbarItem(props) {
    console.log(`Renderizando NavbarItem: ${props.label} -> ${props.to}`);
    return (
        <li className="nav-item">
            <Link className="nav-link" to={props.to}>{props.label}</Link>
        </li>
    );
}

export default NavbarItem;