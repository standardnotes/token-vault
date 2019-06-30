import React from 'react';

export default class EditEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      service: props.service || '',
      account: props.service || '',
      secret: props.service || ''
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  };

  onSave = () => {
    const { service, account, secret } = this.state;
    this.props.onAdd({ service, account, secret });
  };

  render() {
    return (
      <div>
        <input
          name="service"
          className="sk-input contrast"
          placeholder="Service"
          onChange={this.handleInputChange}
        />
        <input
          name="account"
          className="sk-input contrast"
          placeholder="Account"
          onChange={this.handleInputChange}
        />
        <input
          name="secret"
          className="sk-input contrast"
          placeholder="Secret"
          onChange={this.handleInputChange}
        />
        <div className="sk-button-group">
          <div onClick={this.props.onCancel} className="sk-button warning">
            <div className="sk-label">Cancel</div>
          </div>
          <div onClick={this.onAdd} className="sk-button info">
            <div className="sk-label">Save</div>
          </div>
        </div>
      </div>
    );
  }
}
