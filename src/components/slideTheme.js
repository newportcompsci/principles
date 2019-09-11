import React from "react"
import MDXLayout from "./mdxLayout"
import { googleFont, theme as baseTheme } from "./theme"
import { ThemeProvider } from "emotion-theming"
import { Global, css } from "@emotion/core"

const Provider = props => {
  let theme = {
    ...baseTheme,
    googleFont,
    styles: {
      root: {
        textAlign: "left",
        fontSize: "2em",
      },
      Slide: {
        display: "block",
        padding: "2em",
        textAlign: "left",
      },
    },
  }

  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={theme => css`
          @import url(${googleFont});

          body,
          html {
            font-family: ${theme.fonts.body};
          }

          pre {
            font-size: 0.75em;
          }
        `}
      />

      <MDXLayout>{props.children}</MDXLayout>
    </ThemeProvider>
  )
}

export default {
  Provider,
}
