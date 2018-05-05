import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ping } from './reducers'

class App extends Component {
  handleStart = evt => {
    evt.preventDefault()
    this.props.ping()
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.handleStart}>Start</button>
        <h1>{this.props.message}</h1>
      </div>
    )
  }
}

export default connect(state => state, { ping })(App)
