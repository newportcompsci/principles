import { css } from "@emotion/core"
import styled from "@emotion/styled"
import PropTypes from "prop-types"

const getFontSize = ({ level }) => {
  switch (level) {
    case 2:
      return css`
        font-size: 1.5em;
        margin: 0.83em 0;
        font-weight: bold;
        text-align: center;
      `
    case 3:
      return css`
        font-size: 1.17em;
        margin: 1em 0;
        font-weight: bold;
      `
    case 4:
      return css`
        font-size: 1em;
        margin: 1.33em 0;
        font-weight: bold;
      `
    case 5:
      return css`
        font-size: 0.83em;
        margin: 1.67em 0;
        font-weight: bold;
      `
    case 6:
      return css`
        font-size: 0.67em;
        margin: 2.33em 0;
        font-weight: bold;
      `
    default:
      return css`
        font-size: 2em;
        margin: 0.67em 0;
        font-weight: bold;
        text-align: center;
      `
  }
}

const Heading = styled.div`
  font-family: ${props => props.theme.fonts.heading};
  line-height: 1.5em;

  ${getFontSize}
`

Heading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
}

export default Heading
