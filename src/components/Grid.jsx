import styled from "@emotion/styled"
import PropTypes from "prop-types"

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.cols}, 1fr);
  grid-column-gap: ${props => props.gap};
  grid-row-gap: ${props => props.gap};

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`

GridLayout.propTypes = {
  gap: PropTypes.string,
  cols: PropTypes.number,
}

GridLayout.defaultProps = {
  gap: "1em",
  cols: 2,
}

export default GridLayout
