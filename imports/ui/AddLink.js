import React, { Component } from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

class AddLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: '',
    };
  }
  onSubmit = (e) => {
    e.preventDefault();
    const { url } = this.state;
    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({ error: err.reason });
      }
    });
  };

  onChange = (e) => {
    this.setState({ url: e.target.value });
  };

  handleModalClose = () => {
    this.setState({ url: '', isOpen: false, error: '' });
  }

  render() {
    return (
      <div>
        <button onClick={ () => this.setState({ isOpen: true }) }>Add Link</button>
        <Modal
          isOpen={ this.state.isOpen }
          contentLabel="Add link"
          onAfterOpen={ () => this.input.focus() }
          onRequestClose={ this.handleModalClose }
          className="box"
          overlayClassName="boxed-view modal"
        >
          <h1>Add Link</h1>
          { this.state.error && <p>{ this.state.error }</p> }
          <form onSubmit={ this.onSubmit }>
            <input
              type="text"
              placeholder="URL"
              ref={ (el) => this.input = el }
              value={ this.state.url }
              onChange={ this.onChange }
            />
            <button type="submit">+ Add</button>
            <button type="button" className="secondary" onClick={ this.handleModalClose }>Cancel</button>
          </form>
        </Modal>
      </div>
    )
  }
}

export default AddLink;
