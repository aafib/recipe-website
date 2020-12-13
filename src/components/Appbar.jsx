import React from "react"
import "../styles/navbar.css"
import { Link } from "@material-ui/core"

import { Tooltip } from "@material-ui/core"

const UnAuthMenu = () => (
  <ul className="menu">
    <Tooltip title="Search" arrow>
      <li className="menu-list">
        <Link
          style={{
            textDecoration: "none",
            textShadow: "none",
            color: "#FFF",
            fontSize: "1.2rem",
            padding: "5px 0px",
            paddingBottom: "4px",
          }}
          href="/search"
        >
          Search
        </Link>
      </li>
    </Tooltip>
    <Tooltip title="Recipes" arrow>
      <li className="menu-list">
        <Link
          style={{
            textDecoration: "none",
            textShadow: "none",
            color: "#FFF",
            fontSize: "1.2rem",
            padding: "5px 0px",
            paddingBottom: "4px",
          }}
          href="/recipes"
        >
          All Recipes
        </Link>
      </li>
    </Tooltip>
  </ul>
)

const Navbar = () => (
  <header style={{ padding: "5px 0px" }} className="header">
    <span className="logo">Recipes</span>
    <input className="menu-btn" type="checkbox" id="menu-btn" />
    <label className="menu-icon" htmlFor="menu-btn">
      <span className="navicon" />
    </label>
    <UnAuthMenu />
  </header>
)

export default Navbar
