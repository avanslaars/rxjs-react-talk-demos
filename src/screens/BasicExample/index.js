import React, { Component } from 'react'
import Sample from './code-sample.md'
import hljs from 'highlightjs'

export class BasicExample extends Component {
  componentDidMount() {
    hljs.initHighlighting()
  }

  render() {
    return (
      <div>
        <h1>Basic Example</h1>
        <Sample />
      </div>
    )
  }
}
