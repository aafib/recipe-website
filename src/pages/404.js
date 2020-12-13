import React from "react"
import { Box, Typography, makeStyles } from "@material-ui/core"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
  },
  link: { textShadow: "none" },
})

export default function() {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Helmet title="404 Not Found" />
      <Typography variant="h5">404 Page not found</Typography>
      <Link className={classes.link} to="/">
        <Typography variant="h6">Go to Home</Typography>
      </Link>
    </Box>
  )
}
