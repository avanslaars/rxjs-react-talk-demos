import React, { Component } from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import { ExampleRoute } from './ExampleRoute'
import './index.css'

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
              <li>
                <NavLink to="/ping-pong">Ping Pong</NavLink>
              </li>
              <li>
                <NavLink to="/interval-reducers">Interval Reducers</NavLink>
              </li>
              <li>
                <NavLink to="/konami-code">Konami Code</NavLink>
              </li>
            </ul>
          </nav>
          <main className="mainContent">
            <Route path="/" exact render={() => <h1>Home</h1>} />
            <ExampleRoute path="/basic" component="BasicExample" />
            <ExampleRoute path="/ping-pong" component="PingPong" />
            <ExampleRoute
              path="/interval-reducers"
              component="IntervalReducers"
            />
            <ExampleRoute path="/konami-code" component="Konami" />
          </main>
        </div>
      </Router>
    )
  }
}

export default App
