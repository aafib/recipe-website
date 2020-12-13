exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const results = await graphql(`
    query {
      allRecipes {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  results.data.allRecipes.edges.forEach(({ node }) => {
    const slug = node.slug
    createPage({
      path: `recipe/${slug}`,
      component: require.resolve("./src/templates/recipe.jsx"),
      context: {
        slug: slug,
      },
    })
  })
}
