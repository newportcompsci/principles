import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import { Link as GatsbyLink } from "gatsby"

const Link = ({
  children,
  to,
  activeClassName,
  partiallyActive,
  forceExternal = false,
  ...other
}) => {
  const internal = /^\/(?!\/)/.test(to)

  if (forceExternal || !internal) {
    return (
      <a href={to} {...other}>
        {children}
      </a>
    )
  } else {
    return (
      <GatsbyLink
        to={to}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        {...other}
      >
        {children}
      </GatsbyLink>
    )
  }
}

const BaseLink = styled(Link)`
  transition: all 0.3s;
  color: ${props => props.theme.colors.black};

  &:hover {
    color: ${props => props.theme.colors.primary};
    cursor: pointer;
  }
`
BaseLink.propTypes = {
  to: PropTypes.string.isRequired,
  activeClassName: PropTypes.string,
  partiallyActive: PropTypes.bool,
  forceExternal: PropTypes.bool,
}

export default BaseLink
