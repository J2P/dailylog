import React, { Component } from 'react'
import { withRouter } from 'react-router'
import app from '../../base'

import LogInView from './LogInView'

class LogInContainer extends Component {
  handleSignUp = async e => {
    e.preventDefault()
    const { email, password } = e.target.elements
    try {
      await app
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
      this.props.history.push('/')
    } catch (error) {
      alert(error)
    }
  };

  render() {
    return <LogInView onSubmit={this.handleSignUp} />
  }
}

export default withRouter(LogInContainer);