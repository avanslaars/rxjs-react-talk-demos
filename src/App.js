import React, { Component } from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import './index.css'
import { BasicExample } from './screens/BasicExample'
import { IntervalReducers } from './screens/IntervalReducers'
import { PingPong } from './screens/PingPong'

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
            </ul>
          </nav>
          <main className="mainContent">
            <Route path="/" exact render={() => <h1>Home</h1>} />
            <Route path="/basic" component={BasicExample} />
            <Route path="/ping-pong" component={PingPong} />
            <Route path="/interval-reducers" component={IntervalReducers} />
          </main>
        </div>
      </Router>
    )
  }
}

export default App
