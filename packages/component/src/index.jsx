import React from "react"
import PropTypes from "prop-types"
import { className } from "./utils"

function Index(props) {
  return <div className={className("container")}>Components</div>
}

Index.propTypes = {}

Index.displayName = "Components"

export default Index
