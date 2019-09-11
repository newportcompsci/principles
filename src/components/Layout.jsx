import React from "react"
import { ThemeProvider } from "emotion-theming"
import styled from "@emotion/styled"

import { theme } from "./theme"
import Navbar from "./Navbar"
import Footer from "./Footer"
import BaseStyle from "./BaseStyle"

const LINKS = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Units",
    url: "/units",
  },
  {
    name: "Syllabus",
    url: "/syllabus",
  },
]

const Main = styled.main`
  max-width: 900px;
  margin: auto;
  min-height: 100vh;
  margin-top: 2em;
  padding: 1em;
`

const Layout = ({ children, header }) => {
  return (
    <ThemeProvider theme={theme}>
      <BaseStyle />

      <Navbar links={LINKS} />
      {header}
      <Main>{children}</Main>
      <Footer />
    </ThemeProvider>
  )
}

export default Layout
