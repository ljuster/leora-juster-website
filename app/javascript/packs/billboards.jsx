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
      title: 'Team standup meeting',
      appt_time: '25 January 2016 9am'
    }
  }

  handleUserInput (obj) {
    this.setState(obj);
  }

  handleFormSubmit () {
    const billboard = {name: this.state.name, image_url: this.state.image_url, score: this.state.score};
    $.post('/billboards',
            {billboard: billboard})
          .done((data) => {
            this.handleBillboardVote(data);
          });
  }

  handleBillboardVote (billboard) {
    const billboards = update(this.state.billboards, { $push: [billboard]});
    this.setState({
      billboards: billboards.sort(function(a,b){
        return new Date(a.appt_time) - new Date(b.appt_time);
      })
    });
  }

  render () {
    return (
      <div>
        <Register />
        <BillboardForm input_name={this.state.name}
          input_image_url={this.state.image_url}
          onUserInput={(obj) => this.handleUserInput(obj)}
          onFormSubmit={() => this.handleFormSubmit()} />
        <BillboardsList billboards={this.state.billboards} />
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
