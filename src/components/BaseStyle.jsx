import React from "react"
import { Global, css } from "@emotion/core"
import emotionNormalize from "emotion-normalize"
import { googleFont } from "./theme"

const rootStyles = theme => css`
  ${emotionNormalize}

  @import url(${googleFont}); 

  body, html {
    font-size: 18px;
    font-family: ${theme.fonts.body};
    color: ${theme.colors.black};
  }

  * {
    line-height: 1.5em;
    box-sizing: border-box;
  }

  a {
    color: ${theme.colors.black};
    text-decoration: none;
  }
`

const BaseStyle = () => <Global styles={rootStyles} />

export default BaseStyle
