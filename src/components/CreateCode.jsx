import React from "react"
import styled from "@emotion/styled"
import { Prism } from "react-syntax-highlighter"

const getLanguage = className => {
  const match = /language-(\w*)/.exec(className || "language-javascript")
  let lang = "javascript"
  if (match && match.length > 1) {
    lang = match[1]
  }

  return lang
}

export const Pre = styled.pre``

export const CreateCode = () => props => {
  const language = getLanguage(props.className)
  return (
    <Prism
      showLineNumbers
      lineNumberStyle={{
        color: "#aaaaaa",
      }}
      language={language}
      {...props}
    />
  )
}
