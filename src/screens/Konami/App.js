import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startListen, stopListen } from './reducers'

class App extends Component {
  componentDidMount() {
    this.props.startListen()
  }

  componentWillUnmount() {
    // Dispatch the action that kills the interval
    this.props.stopListen()
  }

  render() {
    return <div className="App">{this.props.keyCode}</div>
  }
}

export default connect(state => state, { startListen, stopListen })(App)
