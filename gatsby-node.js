const path = require("path")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const lessonTemplate = path.resolve(`src/templates/lesson-template.js`)
  const unitTemplate = path.resolve(`src/templates/unit-template.js`)

  const result = await graphql(`
    {
      units: allMdx(
        filter: { frontmatter: { path: { regex: "/unit-\\\\d+$/" } } }
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
      lessons: allMdx(
        filter: {
          frontmatter: { path: { regex: "/unit-\\\\d+/lesson-\\\\d+$/" } }
        }
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    console.log(result.errors)
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  let { units, lessons } = result.data

  units.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: unitTemplate,
      context: {
        lessonRegex: `${node.frontmatter.path}\\/lesson-\\\\d+$/`,
      },
    })
  })

  lessons.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: lessonTemplate,
      context: {},
    })
  })
}
