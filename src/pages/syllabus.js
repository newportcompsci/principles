import React from "react"

import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Heading from "../components/Heading"

const SyllabusPage = ({ data }) => {
  return (
    <Layout>
      <Heading level={1}>Syllabus</Heading>
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </Layout>
  )
}

export default SyllabusPage

export const query = graphql`
  {
    mdx(frontmatter: { path: { eq: "/syllabus" } }) {
      body
    }
  }
`
