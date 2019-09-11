import React from "react"
import { graphql } from "gatsby"

import Card from "../components/Card"
import BaseLink from "../components/BaseLink"
import Layout from "../components/Layout"
import Heading from "../components/Heading"
import GridLayout from "../components/Grid"

const UnitsPage = ({ data }) => {
  let unitComponents = data.units.edges.map(({ node }) => (
    <BaseLink to={node.frontmatter.path}>
      <Card>
        <Heading level={3}>{node.frontmatter.title}</Heading>
      </Card>
    </BaseLink>
  ))

  return (
    <Layout>
      <Heading level={1}>Units</Heading>
      <GridLayout>{unitComponents}</GridLayout>
    </Layout>
  )
}

export default UnitsPage

export const query = graphql`
  {
    units: allMdx(
      filter: { frontmatter: { path: { regex: "/unit-\\\\d+$/" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`
