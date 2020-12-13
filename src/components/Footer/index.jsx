import React from "react"
import footerStyles from "./style.module.css"
import instagramLogo from "./instagram-logo.svg"
import facebookLogo from "./facebook-logo.svg"
import emailLogo from "./email-logo.svg"
import { Typography } from "@material-ui/core"

const Logo = ({ link, img, alt }) => {
  return (
    <i className={footerStyles.logo}>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img style={{ height: "24px", width: "24px" }} src={img} alt={alt} />
      </a>
    </i>
  )
}

const Footer = () => {
  return (
    <footer className={footerStyles.container}>
      <section className={footerStyles.logoContainer}>
        <Logo
          link={"https://www.instagram.com/"}
          img={instagramLogo}
          alt={"I"}
        />
        <Logo link={"https://www.facebook.com"} img={facebookLogo} alt={"f"} />
        <Logo
          link={"mailto:someone@example.com"}
          img={emailLogo}
          alt={"Email"}
        />
      </section>
      <Typography className={footerStyles.text}>
        All rights © reserved by the company.
      </Typography>
    </footer>
  )
}

export default Footer
