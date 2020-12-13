module.exports = {
  plugins: [
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyBMPdDOBZqY4tOAPWWdWqrohrjLOAJEpz8",
          authDomain: "recepie-project.firebaseapp.com",
          projectId: "recepie-project",
          databaseURL: "https://recepie-project.firebaseio.com",
          storageBucket: "recepie-project.appspot.com",
          messagingSenderId: "646175189224",
          appId: "1:646175189224:web:d1bacf61aa1dd57719415d",
        },
      },
    },
    {
      resolve: "gatsby-source-firestore",
      options: {
        credential: require("./firebase.json"),
        types: [
          {
            type: "Recipes",
            collection: "recipes",
            map: recipe => ({
              slug: recipe.slug,
              title: recipe.title,
              description: recipe.description,
              steps: recipe.steps,
              tags: recipe.tags,
              thumbnail: recipe.thumbnail,
              ingredients: recipe.ingredients,
              recipe___NODE: recipe.id,
            }),
          },
        ],
      },
    },
  ],
}
