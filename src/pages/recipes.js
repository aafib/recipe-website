import React, { useEffect, useState } from "react"
import {
  Box,
  Typography,
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Grid,
} from "@material-ui/core"
import { Link } from "gatsby"
import firebase from "gatsby-plugin-firebase"
import background from "../img/background.jpg"
import Appbar from "../components/Appbar"
import { Helmet } from "react-helmet"

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "68px",
    textAlign: "center",
    margin: "0 auto",
  },
  section: {
    textAlign: "center",
    paddingTop: "48px",
    margin: "0 auto",
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
  cardRoot: {
    maxWidth: 325,
    margin: "10px 0px",
  },
  cardMedia: {
    height: 200,
  },
  cardLink: {
    textShadow: "none",
    textDecoration: "none",
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
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    firebase
      .firestore()
      .collection("recipes")
      .get()
      .then((querySnapshot) => {
        setRecipes(querySnapshot.docs)
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <>
      <Appbar />
      <Helmet title="All Recipes" />
      <Box className={classes.root}>
        {recipes.length === 0 ? (
          <>
            <br />
            <br />
            <br />
            <br />
            <br />
            <Typography>Loading..</Typography>
          </>
        ) : (
          <>
            <br />
            <br />
            <br />
            <br />
            <Grid container justify={"space-evenly"}>
              {recipes.map((recipe) => {
                const data = recipe.data()
                return (
                  <Grid key={data.id} item sm={12} lg={4} md={4}>
                    <Link
                      className={classes.cardLink}
                      to={`recipe/${data.slug}`}
                    >
                      <Card className={classes.cardRoot}>
                        <CardHeader title={data.title} />
                        <CardMedia
                          className={classes.cardMedia}
                          image={data.thumbnail}
                          title={data.title}
                        />
                        <CardContent>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {data.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                )
              })}
            </Grid>
          </>
        )}
      </Box>
    </>
  )
}
