import React from 'react'
import Style from './style.less'

function App() {
  return (
    <div className= {Style.test}>
      <h1>hhhhjkjhkjhkj</h1>
      <h2>Welcome to React App</h2>
      <h3>Date: {new Date().toDateString()}</h3>
      <span className = {Style.iconfont}>&#xe871;</span>
    </div>
  )
}

export default App
