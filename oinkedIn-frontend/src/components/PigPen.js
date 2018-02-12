import React from "react";
import Pig from "./Pig"
import { API_ROOT, HEADERS } from '../constants';
import { ActionCable } from 'react-actioncable-provider';

class PigPen extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      pigs: []
    }

    if (props.routerProps.match) {
      this.state.pigPenId = props.routerProps.match.params.id
    }
  }



  componentDidMount = () => {
    fetch(`${API_ROOT}/pig_pens/${this.state.pigPenId}`)
      .then(res => res.json())
      .then(this.setPigsInState)
      // .then(pigs => this.setState({ pigs }));
  };

  setPigsInState = (json) => {
    console.log(json)


    const newPigArr = json.pigs.map(pig => {
      const pig_pen_pig = json.pig_pen_pigs.find(ppp => ppp.pig_id === pig.id)
      console.log("pig: ", pig, ", pig_pen_pig: ", pig_pen_pig)
      return {...pig, ...pig_pen_pig}
    })
    console.log("new pig arr: ", newPigArr)

    this.setState({
      pigs: newPigArr
    })
  }

  handleReceivedPig = response => {
    debugger
    const { pig } = response;


    let foundPig = this.state.pigs.find(s => s.id === pig.id)
    let arr = this.state.pigs

    if (foundPig) {
      // console.log("old array: ", arr)
      const new_arr = arr.map(s => {
        if (s.id === pig.id) {
          return pig
        } else {
          return s
        }
      })

      // console.log("new array: ", new_arr)

      this.setState({
        pigs: new_arr
      });

    } else {
      this.setState({
        pigs: [...arr, pig]
      });
      // console.log('new pig')
    }
  };

  addPig = async () => {
    if (!this.state.generatedPig) {
      let id = this.fakeId()
      let newPig = { x_coord: 300, y_coord: 300, id: id, direction: 1 }

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
    let pig = arr[arr.findIndex(s => s.id === id)]
    // console.log(id, x, y);
    // console.log(arr)
    // console.log(arr[arr.findIndex(s => s.id === id)])
    // console.log("first", pig, id)

    pig.x_coord = x
    pig.y_coord = y
    pig.direction = direction

    // console.log("second", pig, id)

    fetch(`${API_ROOT}/pigs/${pig.id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify(pig)
    })

    this.setState({
      pigs: arr
    })
  }

  render() {
    return (
      <div>
        <ActionCable
       channel={{ channel: 'PigPenPigsChannel', pig_pen: this.state.pigPenId }}
       onReceived={this.handleReceivedPig}
       />
      {this.state.pigs.map(s => <Pig
          activePig={parseInt(s.id) === parseInt(this.state.generatedPig)}
          key={s.id}
          id={s.id}
          x={s.x_coord}
          y={s.y_coord}
          direction={s.direction}
          source={s.mediastream}
          color={s.id % 2 ? "blue" : "red"}
          updatePig={this.updatePig}/>)}
      </div>
    )
  }
}

export default PigPen

// <div>
//   <ActionCable
//  channel={{ channel: 'PigPenPigsChannel', pig_pen: this.state.pigPenId }}
//  onReceived={this.handleReceivedPig}
//  />
// {this.state.pigs.map(s => <Pig
//     activePig={parseInt(s.id) === parseInt(this.state.generatedPig)}
//     key={s.id}
//     id={s.id}
//     x={s.x_coord}
//     y={s.y_coord}
//     direction={s.direction}
//     source={s.mediastream}
//     color={s.id % 2 ? "blue" : "red"}
//     updatePig={this.updatePig}/>)}
// </div>
