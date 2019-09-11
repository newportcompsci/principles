module.exports = {
  pathPrefix: "/principles",
  siteMetadata: {
    title: `AP Computer Science Principles`,
    description: ``,
    author: `Joshua Rasmussen`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `notes`,
        path: `${__dirname}/src/notes`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        remarkPlugins: [require(`remark-emoji`)],
      },
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: "gatsby-theme-mdx-deck",
      options: {
        basePath: `/slides`,
        contentPath: `./src/slides`,
        mdx: false,
      },
    },
    `gatsby-plugin-emotion`,
  ],
}
