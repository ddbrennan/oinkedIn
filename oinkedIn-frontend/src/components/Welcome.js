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
      <div className="welcome-page">
        <div id="welcome-message">
          <h1>Welcome, y'oinker!</h1>
        </div>
        <form id="new-piggy-form" onSubmit={this.handleSubmit}>
          <input id="new-piggy-name" type="text" value={this.state.pigName} onChange={this.handleChange} placeholder="Type your piggy name..." />
          <input type="submit" value="Be A Piggy" hidden />
        </form>
      </div>
    )
  }
  }
export default Welcome
