import React from 'react';
import update from 'immutability-helper';
import EditEntry from './EditEntry';
import ViewEntries from './ViewEntries';
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
        service: 'Slack',
        account: 'dag.janeiro@gmail.com',
        secret: '1234567890123456',
        notes: 'oh yeah'
      },
      {
        service: 'Gmail',
        account: 'dag.janeiro@gmail.com',
        secret: '12345678902222',
        notes:
          'lots of notes in this one. Cause I can, and some more too. hahahaha. no, really, it has lots of notes.'
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
      editMode: false,
      editEntry: null
    };
    // BridgeManager.get().addUpdateObserver(() => {
    //   this.setState({note: BridgeManager.get().getNote()});
    // })
  }

  addNew = entry => {
    this.setState({
      entries: this.state.entries.concat([entry])
    });
    // Save note content here
  };

  editEntry = entry => {
    this.setState({
      entries: update(this.state, { entries: { [id]: { $set: entry } } })
    });
    // Save note content here
  };

  onSave = entry => {
    // If there's no ID it's a new note
    if (!entry.id) {
      this.addNew(entry);
    } else {
      this.editEntry(entry);
    }
  };

  onEdit = id => {
    this.setState({
      editMode: true,
      editItem: this.state.entries[id]
    });
  };

  onRemove = id => {
    this.setState({
      entries: update(this.state, { entries: { $splice: [[id, 1]] } })
    });
  };

  render() {
    return (
      <div className="sn-component">
        <div id="header">
          <div className="sk-button-group">
            <div onClick={() => {}} className="sk-button info">
              <div className="sk-label">Add New</div>
            </div>
          </div>
        </div>

        <div id="content">
          {this.state.editMode ? (
            <EditEntry
              entry={editItem}
              onSave={this.onSave}
              onCancel={this.onCancel}
            />
          ) : (
            <ViewEntries
              entries={this.state.entries}
              onEdit={this.onEdit}
              onRemove={this.onRemove}
            />
          )}
        </div>
      </div>
    );
  }
}
