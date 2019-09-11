import React from "react"
import PropTypes from "prop-types"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import BaseLink from "./BaseLink"

const rootStyles = css`
  box-shadow: 0 3px 2px rgba(0, 0, 0, 0.2);
`

const MenuItem = styled.li`
  padding: 1.5em;
`

const Menu = styled.ul`
  display: flex;
  margin: 0;
  justify-content: flex-end;
  list-style-type: none;
  padding: 0;
`

class Navbar extends React.Component {
  render() {
    let navLinks = this.props.links.map(l => (
      <BaseLink to={l.url} key={l.name}>
        <MenuItem>{l.name}</MenuItem>
      </BaseLink>
    ))

    return (
      <nav css={rootStyles}>
        <Menu>{navLinks}</Menu>
      </nav>
    )
  }
}

Navbar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired
  ),
}

export default Navbar
