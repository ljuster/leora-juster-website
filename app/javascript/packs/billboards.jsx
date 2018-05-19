import React from 'react'
import ReactDOM from 'react-dom'
import BillboardForm from './billboard_form'
import { BillboardsList } from './billboards_list'
import update from 'immutability-helper'
import Register from './register'

export default class Billboards extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      billboards: this.props.billboards,
      registeredUser: this.props.registeredUser
    }
  }

  handleRegistration (obj) {
    this.setState({ obj })
  }


  handleBillboardVote (data) {
    const billboards = update(this.state.billboards, { $push: []});
    this.setState({
      billboards: billboards.sort(function(a,b){
        return new b.score
      })
    });
  }

  render () {
    return (
      <div>
        {!this.state.registeredUser && <Register handleClick={this.handleRegistration}/> }
        {this.state.registeredUser &&
        <BillboardsList billboards={this.state.billboards} handleVote={this.handleBillboardVote}/>
        }
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('billboard_data')
  const data = JSON.parse(node.getAttribute('data'))

  ReactDOM.render(
    <Billboards billboards={data} />,
    document.body.appendChild(document.createElement('div')),
  )
})
