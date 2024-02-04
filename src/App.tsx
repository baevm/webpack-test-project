import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import TestComponent from './components/TestComponent'

const App = () => {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <h1>Hello world</h1>
      <div>
        <Link to={'/about'}>about</Link>
        <br />
        <Link to={'/cart'}>cart</Link>
      </div>

      <TestComponent />
      <button onClick={() => setCounter((prev) => prev + 1)}>+1</button>
      {counter}

      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default App
