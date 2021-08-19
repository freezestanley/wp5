import React from "react"
import ReactDom from "react-dom"
import App from "./App"

let aa = _.join(['Hello', 'webpack'], ' ');
alert(aa)
ReactDom.render(<App />, document.getElementById('app'))