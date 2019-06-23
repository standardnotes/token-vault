import React from 'react';
import { totp } from '../lib/otp'
// import BridgeManager from '../lib/BridgeManager';

const note = {
  content: {
    title: 'test title',
    text: 'test content'
  }
}

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = { note, token: '' };
    this.getToken('PBDS6TSGLFYXAOBQHBHXQRDBORNEKZCD')
    // BridgeManager.get().addUpdateObserver(() => {
    //   this.setState({note: BridgeManager.get().getNote()});
    // })
  }

  async getToken (key) {
    const token = await totp.gen(key)
    this.setState({
      ...this.state,
      token
    })
  }

  render() {
    return (
      <div>
      {/* <button onClick={() => this.getToken('K5EGOS3NMFZVCK3GNZEXK6TEGNJUUQSJ')}>click me!</button> */}
      <div>
        <p>Component is ready.</p>

        {this.state.note &&
          <div>
            <p>
              Working note title: <strong>{this.state.note.content.title}</strong>
            </p>
            <p>
              Working note content: <strong>{this.state.note.content.text}</strong>
            </p>
            <p>
              {this.state.token}
            </p>
          </div>
        }
      </div>
      </div>
    )
  }
}
