import React from "react";

class Welcome extends React.Component {
  state = {
    pigName: ""
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.setUserPig(this.state.pigName)
  }

  handleChange = (e) => {
    this.setState({
      pigName: e.target.value
    })
  }

  render() {
    return (
      <div id="welcome-body">
        <div id="main-content">
          <img id="logo" src={require("../images/oinkedIn.png")} />
          <h3 id="welcome">Welcome, Y'Oinker!</h3>
          <form onSubmit={ this.handleSubmit }>
            <input id="new-piggy-name" type="text" value={this.state.pigName} onChange={this.handleChange} placeholder="Type Your Piggy Name..."/>
            <input type="submit" value="Be A Piggy" hidden/>
          </form>
        </div>
      </div>
    )
  }
  }
export default Welcome
