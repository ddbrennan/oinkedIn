import React from "react";
import Pig from "./Pig"
import { API_ROOT, HEADERS } from '../constants';
import { ActionCable } from 'react-actioncable-provider';
import LoggedIn from "../hoc/LoggedIn"
import PenBackground from './PenBackground.js'


class PigPen extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      pigs: [],
      pigPenId: props.pigPen.id
    }
  }


  componentDidMount = () => {
    if (!this.props.userPig){
      this.props.routerProps.history.push("/")
    }
    fetch(`${API_ROOT}/pig_pens/${this.state.pigPenId}`)
      .then(res => res.json())
      .then(pigs => this.setState({ pigs }))
  };

  // setPigsInState = (json) => {
  //   console.log("json: ", json)
  //
  //   const newPigArr = json.pigs.map(pig => {
  //     const pig_pen_pig = json.pig_pen_pigs.find(ppp => ppp.pig_id === pig.id)
  //     return {...pig, ...pig_pen_pig}
  //   })
  //
  //   this.setState({
  //     pigs: newPigArr
  //   })
  // }



  handleReceivedPig = response => {

    if (response.removed_pig){
      let newArr = this.state.pigs.filter(s => s.id !== response.removed_pig)
      this.setState({pigs: newArr})
    } else {

      const { pig_pen_pig } = response;

      let foundPig = this.state.pigs.find(s => s.id === pig_pen_pig.id)
      let arr = this.state.pigs

      if (foundPig) { // new pig info is about pig currently in pen
        const new_arr = arr.map(s => {
          if (s.id === pig_pen_pig.id) {
            return pig_pen_pig
          } else {
            return s
          }
        })
        this.setState({
          pigs: new_arr
        });

      } else { // new pig info is about new pig, entering pen
        this.setState({
          pigs: [...arr, pig_pen_pig]
        });
      }
    }
  };

  addPig = async () => {
    if (!this.state.generatedPig) {
      let id = this.fakeId()
      let newPig = { x_coord: 30, y_coord: 30, id: id, direction: 1 }

      await fetch(`${API_ROOT}/pigs`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(newPig)
      })

      await this.setState({
        generatedPig: id
      })

    }
  }

  fakeId = () => {
    let time = new Date()
    return "" + time.getHours() + time.getMinutes() + time.getSeconds()
  }

  updatePig = (id, x, y, direction) => {
    let arr = this.state.pigs
    let pig = arr[arr.findIndex(s => s.pig_id === id)]
    // console.log(id, x, y);
    // console.log(arr)
    // console.log(arr[arr.findIndex(s => s.id === id)])
    // console.log("first", pig, id)
    // debugger
    pig.x_coord = x
    pig.y_coord = y
    pig.direction = direction

    // console.log("second", pig, id)

    fetch(`${API_ROOT}/pig_pen_pigs/${pig.id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify(pig)
    })

    this.setState({
      pigs: arr
    })
  }

  sendMessage(message, id){
    console.log(message, id)
    fetch(`${API_ROOT}/pig_pen_pigs/${id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({message: message})
    })
  }

  renderPigs(){
    return this.state.pigs.map(s => <Pig
        activePig={parseInt(s.pig_id) === parseInt(this.props.userPig.id)}
        key={s.id}
        id={s.id}
        x={s.x_coord}
        y={s.y_coord}
        direction={s.direction}
        updatePig={this.updatePig}/>)
  }

  returnToLobby = (e) => {
    this.props.routerProps.history.push("/lobby")
  }

  render() {
    console.log(this.state.pigPen)
    return (
      <div>
        <PenBackground />
        <ActionCable
       channel={{ channel: 'PigPenPigsChannel', pig_pen: this.state.pigPenId }}
       onReceived={this.handleReceivedPig}
       />
       <div id="exit-pig-pen" onClick={this.returnToLobby}>
         Return to Lobby
       </div>
      {this.state.pigs.map(s => <Pig
          activePig={parseInt(s.pig_id) === parseInt(this.props.userPig.id)}
          userPig={this.props.userPig}
          key={s.id}
          id={s.pig_id}
          pigPenPigId={s.id}
          x={s.x_coord}
          y={s.y_coord}
          direction={s.direction}
          message={s.message}
          sendMessage={this.sendMessage}
          pig={s.pig}
          updatePig={this.updatePig}/>)}
        <div className="pig-pen-name-container">
          <div className="pig-pen-name">
            {this.props.pigPen.name}
          </div>
        </div>
      </div>
    )
  }
}

export default LoggedIn(PigPen)
