import React from "react";
import { Redirect } from "react-router-dom"

const LoggedIn = (Component) => {
  return (props) => {
    return ((props.userPig) ? <Component {...props}/> : <Redirect to="/" />)
  }
}

export default LoggedIn
