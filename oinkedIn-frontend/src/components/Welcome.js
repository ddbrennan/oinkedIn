import React from "react";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="welcome-page">
        <div id="welcome-message">
          <h1>Welcome, y'oinker!</h1>
        </div>
        <form id="new-piggy-form" onSubmit={console.log}>
          <input id="new-piggy-name" type="text" placeholder="Type your piggy name..." />
          <input type="submit" value="Be A Piggy" hidden />
        </form>
      </div>
    )
  }
  }
export default Welcome
