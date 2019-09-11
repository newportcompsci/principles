import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/Layout"
import BaseLink from "../components/BaseLink"
import Heading from "../components/Heading"
import Card from "../components/Card"
import GridLayout from "../components/Grid"

const UnitTemplate = ({ data }) => {
  let lessonComponents = data.lessons.edges.map(({ node }, i) => (
    <BaseLink to={node.frontmatter.path}>
      <Card>
        <div style={{ textAlign: "right" }}>{node.frontmatter.start}</div>
        <Heading level={3}>{node.frontmatter.title}</Heading>
      </Card>
    </BaseLink>
  ))

  return (
    <Layout>
      <Heading level={1}>{data.unit.frontmatter.title}</Heading>
      <MDXRenderer>{data.unit.body}</MDXRenderer>

      <Heading level={2}>Lessons</Heading>
      <GridLayout>{lessonComponents}</GridLayout>
    </Layout>
  )
}

export default UnitTemplate

export const query = graphql`
  query UnitByPath($lessonRegex: String!, $path: String!) {
    unit: mdx(frontmatter: { path: { eq: $path } }) {
      body
      frontmatter {
        title
      }
    }
    lessons: allMdx(
      filter: { frontmatter: { path: { regex: $lessonRegex } } }
      sort: { fields: [frontmatter___start, frontmatter__title] }
    ) {
      edges {
        node {
          frontmatter {
            start(formatString: "ddd MMM Do, YYYY")
            title
            path
          }
        }
      }
    }
  }
`
