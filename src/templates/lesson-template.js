import React from "react"
import { graphql } from "gatsby"

import styled from "@emotion/styled"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/Layout"
import BaseLink from "../components/BaseLink"
import Heading from "../components/Heading"
import Card from "../components/Card"
import Grid from "../components/Grid"

import { MdFileDownload, MdSlideshow } from "react-icons/md"

const Flex = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  svg {
    font-size: 2em;
    margin-right: 1em;
  }
`

const LessonTemplate = ({ data }) => {
  const { mdx: post } = data

  let slidesComponent = post.frontmatter.slides ? (
    <Card>
      <BaseLink to={`/slides${post.frontmatter.path}`}>
        <Flex>
          <MdSlideshow />
          Slide Deck
        </Flex>
      </BaseLink>
    </Card>
  ) : null

  let attachmentLinks = []

  if (post.frontmatter.attachments) {
    attachmentLinks = post.frontmatter.attachments.map((a, i) => (
      <Card>
        <BaseLink
          forceExternal
          key={`attachment-${i}`}
          to={a.publicURL}
          download
        >
          <Flex>
            <MdFileDownload />
            {a.name}
          </Flex>
        </BaseLink>
      </Card>
    ))
  }

  return (
    <Layout>
      <BaseLink to={post.frontmatter.path.replace(/\/lesson-\d+/, "")}>
        &lt; Back To Unit Overview
      </BaseLink>

      <Heading level={1}>{post.frontmatter.title}</Heading>

      <div style={{ marginBottom: "3em" }}>
        <MDXRenderer>{post.body}</MDXRenderer>
      </div>

      {slidesComponent || attachmentLinks.length ? (
        <div>
          <Heading level={2}>Links / Downloads</Heading>
          <Grid>
            {slidesComponent}
            {attachmentLinks}
          </Grid>
        </div>
      ) : null}
    </Layout>
  )
}

export default LessonTemplate

export const query = graphql`
  query LessonByPath($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      frontmatter {
        path
        start(formatString: "MMMM DD, YYYY")
        title
        attachments {
          publicURL
          name
        }
        slides
      }
    }
  }
`
