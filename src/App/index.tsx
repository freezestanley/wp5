import React from 'react'
import Style from './style.less'

function App() {
  let a = ['a', 'b']
  let c = 'asf',
    f = 'bbas'
  return (
    <div className={Style.test}>
      <h1>123123阿斯顿发生</h1>
      <h2>Welcome to React App</h2>
      <h3>Date: {new Date().toDateString()}</h3>
      <span className={Style.iconfont}>&#xe871;</span>
      <div>test</div>
    </div>
  )
}

export default App
