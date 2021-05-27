import React from 'react';
import PropTypes from 'prop-types';
import { totp } from '@Lib/otp';
import CountdownPie from '@Components/CountdownPie';
import AuthMenu from '@Components/AuthMenu';

export default class AuthEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      timeLeft: 0
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
    this.setState({
      token,
      timeLeft
    });

    this.timer = setTimeout(this.updateToken, timeLeft * 1000);
  }

  componentDidUpdate(prevProps) {
    // If the secret changed make sure to recalculate token
    if (prevProps.entry.secret !== this.props.entry.secret) {
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
  }

  copyToClipboard = () => {
    const textField = document.createElement('textarea');
    textField.innerText = this.state.token;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    this.props.onCopyValue();
  }

  render() {
    const { service, account, notes, color, password } = this.props.entry;
    const { id, onEdit, onRemove, canEdit } = this.props;
    const { token, timeLeft } = this.state;

    const entryStyle = {};
    if (color) {
      entryStyle.backgroundColor = color;
    }

    return (
      <div className="sk-notification sk-base-custom" style={entryStyle}>
        <div className="auth-entry">
          <div className="auth-details">
            <div className="auth-info">
              <div className="auth-service">{service}</div>
              <div className="auth-account">{account}</div>
            </div>
            <div className="auth-token-info">
              <div className="auth-token" onClick={this.copyToClipboard}>
                <div>{token.substr(0, 3)}</div>
                <div>{token.substr(3, 3)}</div>
              </div>
              <div className="auth-countdown">
                <CountdownPie token={token} timeLeft={timeLeft} total={30} />
              </div>
            </div>
          </div>
          {canEdit && (
            <div className="auth-options">
              <AuthMenu
                onEdit={onEdit.bind(this, id)}
                onRemove={onRemove.bind(this, id)}
              />
            </div>
          )}
        </div>
        {password && (
          <div className="auth-password-row">
            <div className="auth-password-label">
              Password: ••••••••
            </div>
            <div className="auth-password-copy">
              <div onClick={this.copyToClipboard} className="sk-button info">
                <div className="sk-label">Copy password</div>
              </div>
            </div>
          </div>
        )}
        {notes && (
          <div className="auth-notes-row">
            <div className="auth-notes">{notes}</div>
          </div>
        )}
      </div>
    );
  }
}

AuthEntry.propTypes = {
  id: PropTypes.any.isRequired,
  entry: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEntryChange: PropTypes.func,
  onCopyValue: PropTypes.func.isRequired,
  canEdit: PropTypes.bool.isRequired
};
