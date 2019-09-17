import React from "react"

import moment from "moment"
import Layout from "../components/Layout"
import Heading from "../components/Heading"
import Header from "../components/Header"
import Calendar from "../components/Calendar"
import { graphql } from "gatsby"

const IndexPage = ({
  data: {
    banner: {
      childImageSharp: { fluid: bgImage },
    },
    lessons: { edges },
  },
}) => (
  <Layout
    header={
      <Header
        bgImage={bgImage}
        recentLesson={edges[edges.length - 1].node.frontmatter.path}
      />
    }
  >
    <Heading level={1}>Course Calendar</Heading>
    <Calendar
      today={moment().startOf('day')}
      dates={edges.map(({ node: { frontmatter: { start, end, ...rest } } }) => ({
        start: moment(start).startOf('day'),
        end: moment(end).add(1, 'day').startOf('day'),
        ...rest,
      }))}
    />
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    banner: file(name: { eq: "data-center" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    lessons: allMdx(
      filter: {
        frontmatter: { start: { ne: null }, path: { regex: "/lesson/" } }
      }
      sort: { fields: [frontmatter___start, frontmatter___title] }
    ) {
      edges {
        node {
          frontmatter {
            start(formatString: "YYYY-MM-DD")
            end(formatString: "YYYY-MM-DD")
            title
            path
          }
        }
      }
    }
  }
`
