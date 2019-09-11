import React from "react"
import styled from "@emotion/styled"
import { MDXProvider } from "@mdx-js/react"
import { Pre, CreateCode } from "./CreateCode"
import Heading from "./Heading"

const _Heading = level => props => <Heading level={level} {...props} />

const _Blockquote = styled.blockquote`
  font-style: italic;
`

const Link = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: underline;
`

export const components = {
  a: Link,
  h1: _Heading(1),
  h2: _Heading(2),
  h3: _Heading(3),
  h4: _Heading(4),
  h5: _Heading(5),
  h6: _Heading(6),
  blockquote: _Blockquote,
  pre: Pre,
  code: CreateCode(),
}

export default ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
)
