import React from "react"
import ReactDOM from "react-dom"
import Com from "src"
import "./style.less"
import { className } from "src/utils"

class Index extends React.PureComponent {
  render() {
    return (
      <div className={className("site-container")}>
        <h2>component</h2>
        <Com />
      </div>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById("app"))
