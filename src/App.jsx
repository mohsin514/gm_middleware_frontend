import React, { useState } from "react";
import { ReactComponent as ReactLogo } from './assets/react.svg';

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
        {/* <ReactLogo className="logo react" />; */}
        </a>
      </div>
      <h1>React + Webpack</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test hot reload
        </p>
      </div>
      <p className="read-the-docs">
        Click on the React logo to learn more
      </p>
    </>
  );
}

export default App;
