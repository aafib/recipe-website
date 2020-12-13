import React, { useEffect, useState } from "react"
import firebase from "gatsby-plugin-firebase"
import { Box, makeStyles, Typography, Chip } from "@material-ui/core"
import Appbar from "../components/Appbar"
import { Helmet } from "react-helmet"

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "100px",
    paddingLeft: "30px",
    paddingRight: "10px",
    paddingBottom: "70px",
    margin: "0 auto",
    textAlign: "center",
    maxWidth: "600px",
  },
  title: {
    paddingTop: "6px",
    paddingBottom: "10px",
    fontSize: "2.5rem",
  },
  thumbnail: {
    width: "650px",
    height: "380px",
    paddingBottom: "10px",
  },
  aboutHeader: {
    marginTop: "5px",
    fontStyle: "bold",
    textAlign: "left",
    padding: "0px 5px",
  },
  list: {
    margin: 0,
    padding: 0,
    marginLeft: "20px",
  },
  chip: {
    margin: "0px 5px",
  },
  [theme.breakpoints.down("sm")]: {
    root: {
      paddingLeft: "10px",
      paddingRight: "10px",
    },
    thumbnail: {
      width: "90vw",
      height: "210px",
    },
    description: {
      marginTop: "10px",
      textAlign: "justify",
      paddingLeft: "11px",
      paddingRight: "11px",
    },
  },
}))

function Recipe() {
  const classes = useStyles()
  const [recipe, setRecipe] = useState({})

  useEffect(() => {
    const slug = window.location.pathname.split("/")[2]
    firebase
      .firestore()
      .collection("recipes")
      .where("slug", "==", slug)
      .get()
      .then((querySnapShot) => {
        setRecipe({
          id: querySnapShot.docs[0].id,
          ...querySnapShot.docs[0].data(),
        })
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <Appbar />
      {recipe.id ? (
        <>
          <Helmet title={recipe.title} />
          <Box className={classes.root}>
            <Typography className={classes.title}>{recipe.title}</Typography>
            <img
              className={classes.thumbnail}
              src={recipe.thumbnail}
              alt={recipe.title}
            />
            <Typography variant="h5" className={classes.aboutHeader}>
              About <Typography>{recipe.description}</Typography>
            </Typography>
            <br />
            <Typography variant="h5" className={classes.aboutHeader}>
              Ingredients{" "}
              <ul className={classes.list}>
                {recipe.ingredients.map((ingredient) => (
                  <li>
                    <Typography>{ingredient}</Typography>
                  </li>
                ))}
              </ul>
            </Typography>
            <br />
            <Typography variant="h5" className={classes.aboutHeader}>
              Steps{" "}
              {recipe.steps.map((step) => (
                <Typography>{step}</Typography>
              ))}
            </Typography>
            <br />
            <Typography variant="h5" className={classes.aboutHeader}>
              Tags{" "}
              {recipe.tags.map((tag) => (
                <Chip className={classes.chip} label={tag} />
              ))}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Helmet title="Loading..." />
          <Box className={classes.root}>
            <Typography>Loading...</Typography>
          </Box>
        </>
      )}
    </>
  )
}

export default Recipe
