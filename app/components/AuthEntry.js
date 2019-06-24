import React from 'react';
import { totp } from '../lib/otp';
import Countdown from './Countdown';

export default class AuthItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: ''
    };

    this.updateToken();
  }

  getTimeLeft() {
    const seconds = new Date().getSeconds();
    return seconds > 29 ? 60 - seconds : 30 - seconds;
  }

  updateToken = async () => {
    const { secret } = this.props.entry;
    const token = await totp.gen(secret);

    const timeLeft = this.getTimeLeft();
    console.log('time left', timeLeft);
    this.setState({
      token
    });

    this.timer = setTimeout(this.updateToken, timeLeft * 1000);
  };

  componentWillReceiveProps(nextProps) {
    // If the props changed make sure to recalculate token
    if (nextProps !== this.props) {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.updateToken, 0);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;

    this.props.onEntryChange({
      id: this.props.id,
      name,
      value: target.value
    });
  };

  render() {
    const { service, account } = this.props.entry;
    const { token } = this.state;
    return (
      <tr>
        <td>
          <input
            name="service"
            value={service}
            onChange={this.handleInputChange}
          />
        </td>
        <td>
          <input
            name="account"
            value={account}
            onChange={this.handleInputChange}
          />
        </td>
        <td>{token}</td>
        <td>
          <Countdown token={token} left={this.getTimeLeft()} total={30} />
        </td>
      </tr>
    );
  }
}
