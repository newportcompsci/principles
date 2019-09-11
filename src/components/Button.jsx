import styled from "@emotion/styled"
import BaseLink from "./BaseLink"

export const ButtonGroup = styled.div`
  display: flex;
`

export const ButtonLink = styled(BaseLink)`
  font-size: 1em;
  padding: 1em;
  margin: 1em;
  border-radius: 2em;
  outline: none;
  background-color: transparent;
  border: 3px solid
    ${props =>
      props.dark ? props.theme.colors.black : props.theme.colors.white};
  color: ${props =>
    props.dark ? props.theme.colors.black : props.theme.colors.white};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: ${props =>
      props.dark ? props.theme.colors.white : props.theme.colors.black};
    border-color: ${props =>
      props.dark ? props.theme.colors.white : props.theme.colors.black};
  }
`
