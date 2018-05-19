import React from 'react'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime'

export default class BillboardForm extends React.Component {
  handleChange (e) {
    const name = e.target.name;
    const obj = {};
    obj[name] = e.target.value;
    this.props.onUserInput(obj);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onFormSubmit();
  }

  setBillboardScore(e) {
    const name = 'score';
    const obj = {};
    if(obj[name] = e) {
      this.props.onUserInput(obj);
    }
  }
  
  render () {
    const inputProps = {
      name: 'score'
    };

    return (
      <div>
        <h2>Make a new </h2>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input name='title' placeholder='Billboard Title'
            value={this.props.input_name}
            onChange={(event) => this.handleChange(event)} />

          <Datetime input={false} open={true} inputProps={inputProps}
            value={this.props.score}
            onChange={(event) => this.setBillboardScore(event)} />

          <input type='submit' value='Submit Billboard' className='submit-button' />
        </form>        
      </div>
    )
  }
}
