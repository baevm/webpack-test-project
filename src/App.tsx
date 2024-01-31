import React, {useState} from 'react';
import TestComponent from "./components/TestComponent";
import {Link, Outlet} from "react-router-dom";

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
    );
};

export default App;