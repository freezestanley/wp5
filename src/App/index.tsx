import React from 'react'
import Style from './style.less'
import Astyle from './styles/index.less'

function App() {
  let a = ['a', 'b']
  console.log(Astyle)
  return (
    <div className={Style.test}>
      <h1 className={Astyle.ab}>fff</h1>
      <h2>Welcome to React App</h2>
      <h3>Date: {new Date().toDateString()}</h3>
      <span className={Style.iconfont}>&#xe871;</span>
      <div>{a}</div>
    </div>
  )
}

export default App
