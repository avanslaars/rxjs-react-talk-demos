# Sample Code

```js
import React, { Component } from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import './index.css'
import { BasicExample } from './screens/BasicExample'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="main-wrapper">
          <header className="mainHeader">
            <h1> A bunch of awesome demos</h1>
          </header>
          <nav className="mainNav">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/basic">Basic Example</NavLink>
              </li>
            </ul>
          </nav>
          <main className="mainContent">
            <Route path="/" exact render={() => <h1>Home</h1>} />
            <Route path="/basic" component={BasicExample} />
          </main>
        </div>
      </Router>
    )
  }
}

export default App
```
