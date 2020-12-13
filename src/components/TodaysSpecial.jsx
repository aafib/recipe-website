import React from "react"
import {
  makeStyles,
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Grid,
} from "@material-ui/core"
import { Link, useStaticQuery, graphql } from "gatsby"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "60px",
    textAlign: "center",
  },
  header: {
    fontSize: "3rem",
    paddingBottom: "20px",
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
    header: {
      fontSize: "1.8rem",
    },
  },
}))

const Header = ({ title }) => {
  const classes = useStyles()
  return <Typography className={classes.header}>{title}</Typography>
}

const RecipeCard = ({ title, description, thumbnail, slug }) => {
  const classes = useStyles()
  return (
    <Link className={classes.cardLink} to={`recipe/${slug}`}>
      <Card className={classes.cardRoot}>
        <CardHeader title={title} />
        <CardMedia
          className={classes.cardMedia}
          image={thumbnail}
          title={title}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

function TodaysSpecial() {
  const classes = useStyles()
  const data = useStaticQuery(graphql`
    query {
      first: recipes(slug: { eq: "strawberry-tiramisu-recipe" }) {
        title
        thumbnail
        slug
        description
        id
      }
      second: recipes(slug: { eq: "jalapeno-cheese-fingers-recipe" }) {
        title
        thumbnail
        slug
        description
        id
      }
      third: recipes(slug: { eq: "egg-hakka-noodles-recipe" }) {
        title
        thumbnail
        slug
        description
        id
      }
    }
  `)

  return (
    <Box className={classes.root}>
      <Header title={"Todays Special"} />
      <Grid container justify={"space-evenly"}>
        <Grid key={data.first.id} item sm={12} lg={3} md={3}>
          <RecipeCard
            title={data.first.title}
            thumbnail={data.first.thumbnail}
            description={data.first.description}
            slug={data.first.slug}
          />
        </Grid>
        <Grid key={data.second.id} item sm={12} lg={3} md={3}>
          <RecipeCard
            title={data.second.title}
            thumbnail={data.second.thumbnail}
            description={data.second.description}
            slug={data.second.slug}
          />
        </Grid>
        <Grid key={data.third.id} item sm={12} lg={3} md={3}>
          <RecipeCard
            title={data.third.title}
            thumbnail={data.third.thumbnail}
            description={data.third.description}
            slug={data.third.slug}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default TodaysSpecial
