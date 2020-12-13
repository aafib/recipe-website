import React, { useState } from "react"
import {
  Box,
  Typography,
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  InputBase,
  IconButton,
} from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import { Link } from "gatsby"
import firebase from "gatsby-plugin-firebase"
import Appbar from "../components/Appbar"
import { Helmet } from "react-helmet"

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "68px",
    textAlign: "center",
  },
  section: {
    textAlign: "center",
    paddingTop: "48px",
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
  searchRoot: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    margin: "0 auto",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  [theme.breakpoints.down("sm")]: {
    root: {
      padding: 0,
    },
    heromain: {
      height: "100vh",
    },
    searchRoot: {
      padding: "2px 0px",
      display: "flex",
      alignItems: "center",
      width: "95%",
      margin: "0 auto",
    },
  },
}))

export default () => {
  const classes = useStyles()
  const [recipes, setRecipes] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [text, setText] = useState("Search some recipes")

  function handleSubmit(event) {
    event.preventDefault()
    setIsSearching(true)
    setRecipes([])
    firebase
      .firestore()
      .collection("recipes")
      .where("tags", "array-contains", searchQuery)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length === 0) {
          setText('No recipes found. Try "cheese"')
        } else {
          setRecipes(querySnapshot.docs)
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setIsSearching(false))
  }

  return (
    <>
      <Appbar />
      <Helmet title="All Recipes" />
      <Box className={classes.root}>
        <br />
        <br />
        <br />
        <br />
        <Paper
          component="form"
          className={classes.searchRoot}
          onSubmit={handleSubmit}
        >
          <InputBase
            className={classes.input}
            placeholder="Eg: cheese, fried"
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <IconButton type="submit" className={classes.iconButton}>
            <SearchIcon />
          </IconButton>
        </Paper>
        {recipes.length === 0 ? (
          <>
            <br />
            <br />
            <br />
            <br />
            <br />
            {isSearching ? (
              <Typography style={{ color: "gray", fontStyle: "italic" }}>
                {" "}
                "Loading Recipes..."{" "}
              </Typography>
            ) : (
              <Typography>{text}</Typography>
            )}
          </>
        ) : (
          <>
            <br />
            <br />
            <Box style={{ margin: "0 auto" }}>
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
            </Box>
          </>
        )}
      </Box>
    </>
  )
}
