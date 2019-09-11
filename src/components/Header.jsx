import React from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import BackgroundImage from "gatsby-background-image"
import { ButtonLink, ButtonGroup } from "./Button"

const Filter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.colors.primary};
  opacity: 0.8;
`

const HeaderContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Tagline = styled.div`
  font-size: 3em;
  text-align: center;
  color: ${props => props.theme.colors.white};
  padding: 1em;
  line-height: 1.5em;
  font-weight: bold;
  font-family: ${props => props.theme.fonts.heading};
`

const rootStyles = css`
  height: 80vh;
  position: relative;
`

const Header = ({ bgImage, recentLesson }) => (
  <BackgroundImage css={rootStyles} fluid={bgImage}>
    <Filter />
    <HeaderContent>
      <Tagline>NHS AP Computer Science Principles</Tagline>
      <ButtonGroup>
        <ButtonLink to={recentLesson.replace(/\/lesson-\d+/, "")}>
          Current Unit
        </ButtonLink>
        <ButtonLink to={recentLesson}>Most Recent Lesson</ButtonLink>
      </ButtonGroup>
    </HeaderContent>
  </BackgroundImage>
)

export default Header
