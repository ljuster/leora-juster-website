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
    $.post('/sign_up',
      {
        password: obj.password,
        email: obj.email,
        name: `${obj.first_name} ${obj.last_name}`
      }).done((data) => {
      this.setState({ registeredUser: data})
    })
  }

  handleBillboardVote (data) {
    $.put('/billboards',
      {
        billboard: data.billboard,
        vote: data.vote
      }).done((data) => {

    })
    this.setState({
      billboards: this.props.billboards.sort(function(a,b){
        return new b.score
      })
    })

  }

  render () {
    return (
      <div>
        {!this.state.registeredUser && <Register handleClick={(data) => this.handleRegistration(data)}/> }
        {this.state.registeredUser &&
        <BillboardsList billboards={this.state.billboards} handleVote={(data) => this.handleBillboardVote(data)}/>
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
