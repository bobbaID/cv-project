import React, { Component } from 'react';

class PortfolioTextbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
        position: '',
        company: '',
        startDate: '',
        endDate: '',
        desc: '',
    };
  }

  deleteSelf = () => {
    const { onDelete } = this.props;
    this.props.onSegmentChange(this.props.id, this.props.title , '');
    onDelete();
  };

  handleInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value },() => {
      this.props.onSegmentChange(this.props.id, this.props.title, this.state);
    });
  }

  render() {
    const { position, company, startDate, endDate, desc } = this.state;
    let placeholderArray;
    if (this.props.title === 'Education') {
      placeholderArray = ['Degree','Institution','Notable Information'];
    } else {
      placeholderArray = ['Position','Company','Description'];
    }

    return (
      <div className='PortfolioTextbox'>
        <input type='text' id='position' value={position} placeholder={placeholderArray[0]} onChange={this.handleInputChange}></input>
        <input type='text' id='company' value={company} placeholder={placeholderArray[1]} onChange={this.handleInputChange}></input>
        <input type='text' id='startDate' value={startDate} placeholder='Start Date' onChange={this.handleInputChange}></input>
        <input type='text' id='endDate' value={endDate} placeholder='End Date' onChange={this.handleInputChange}></input>
        <textarea rows='6' id='desc' value={desc} type='textbox' placeholder={placeholderArray[2]} onChange={this.handleInputChange}></textarea>
        <button type="button" onClick={this.deleteSelf}>Delete</button>
      </div>
    );
  }
}

export default PortfolioTextbox;