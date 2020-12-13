import React from "react"
import { Box, makeStyles } from "@material-ui/core"
import background from "../img/background.jpg"
import Appbar from "../components/Appbar"
import TrendingRecipes from "../components/TrendingRecipes.jsx"
import TodaysSpecial from "../components/TodaysSpecial.jsx"
import Footer from "../components/Footer"
import { Helmet } from "react-helmet"

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "48px",
  },
  section: {
    textAlign: "center",
    paddingTop: "48px",
  },
  heromain: {
    display: "flex",
    width: "100%",
    height: "calc(90vh + 15px)",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  [theme.breakpoints.down("sm")]: {
    root: {
      padding: 0,
    },
    heromain: {
      height: "100vh",
    },
  },
}))

export default () => {
  const classes = useStyles()

  return (
    <>
      <Appbar />
      <Helmet title="Recipe Website" />
      <Box className={classes.root}>
        <Box className={classes.heromain}></Box>
        <TrendingRecipes />
        <TodaysSpecial />
        <Footer />
      </Box>
    </>
  )
}
