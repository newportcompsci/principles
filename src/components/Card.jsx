import React from "react"
import { css } from "@emotion/core"

const rootStyles = css`
  padding: 1em;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 1em;
  height: 100%;
`

const Card = ({ children }) => <div css={rootStyles}>{children}</div>

export default Card
