import React from "react"
import { css } from "@emotion/core"
import BaseLink from "./BaseLink"
import { FaGithub } from "react-icons/fa"
import styled from "@emotion/styled-base"

const rootStyles = theme => css`
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  padding: 1em;
  font-size: 2em;
  text-align: center;
`

const FooterLink = styled(BaseLink)`
  color: ${props => props.theme.colors.white};
`

const Footer = props => (
  <footer css={rootStyles}>
    <FooterLink to="https://github.com">
      <FaGithub />
    </FooterLink>
  </footer>
)

export default Footer
