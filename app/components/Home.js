import React from 'react';
import AuthEntry from './AuthEntry';
import update from 'immutability-helper';
// import BridgeManager from '../lib/BridgeManager';

const note = {
  content: {
    title: 'test title',
    text: 'test content'
  }
};

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    let entries = [
      {
        service: 'a',
        account: 'b',
        secret: '1234567890123456'
      }
    ];

    try {
      entries = JSON.parse(note.content.text);
    } catch (e) {
      // Couldn't parse the content
    }

    this.state = {
      note,
      entries,
      service: '',
      account: '',
      secret: ''
    };
    // BridgeManager.get().addUpdateObserver(() => {
    //   this.setState({note: BridgeManager.get().getNote()});
    // })
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  };

  addNew = () => {
    const { service, account, secret, entries } = this.state;
    this.setState({
      entries: entries.concat([{ service, account, secret }])
    });
    // Save note content here
  };

  onEntryChange = ({ id, name, value }) => {
    this.setState({
      entries: update(this.state.entries, { [id]: { [name]: { $set: value } } })
    });
    // Save note content here
  };

  render() {
    return (
      <div>
        <input
          name="service"
          placeholder="Service"
          onChange={this.handleInputChange}
        />
        <input
          name="account"
          placeholder="Account"
          onChange={this.handleInputChange}
        />
        <input
          name="secret"
          placeholder="Secret"
          onChange={this.handleInputChange}
        />
        <button
          onClick={this.addNew}
          disabled={this.state.secret.length !== 16}
        >
          Add New
        </button>
        <div>
          <p>Component is ready.</p>
          <table>
            {this.state.entries.map((entry, idx) => (
              <AuthEntry
                key={idx}
                id={idx}
                entry={entry}
                onEntryChange={this.onEntryChange}
              />
            ))}
          </table>
        </div>
      </div>
    );
  }
}
