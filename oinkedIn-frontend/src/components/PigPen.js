import React from "react";
import Pig from "./Pig"
import { API_ROOT, HEADERS } from '../constants';
import { ActionCable } from 'react-actioncable-provider';

class PigPen extends React.Component {
  state = {
    pigs: [],
    generatedPig: null
  }

  componentDidMount = () => {
    fetch(`${API_ROOT}/pigs`)
      .then(res => res.json())
      .then(pigs => this.setState({ pigs }));
  };

  handleReceivedPig = response => {
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
    const pigs = this.state.pigs
    // console.log(pigs)
    return (
      <div>
        <button onClick={ this.addPig }>Add Pig</button>
        <div>
          <ActionCable
         channel={{ channel: 'PigsChannel' }}
         onReceived={this.handleReceivedPig}
         />
       {this.state.pigs.map(s => <Pig
            activePig={parseInt(s.id) === parseInt(this.state.generatedPig)}
            key={s.id}
            id={s.id}
            x={s.x_coord}
            y={s.y_coord}
            direction={s.direction}
            color={s.id % 2 ? "blue" : "red"}
            updatePig={this.updatePig}/>)}
        </div>
      </div>
    )
  }
}

export default PigPen
