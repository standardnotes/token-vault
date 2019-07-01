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
        secret: '3333333333333333',
        notes: 'oh yeah'
      },
      {
        service: 'Gmail',
        account: 'dag.janeiro@gmail.com',
        secret: '2222222222222222',
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
    this.setState(state => ({
      editMode: false,
      editEntry: null,
      entries: state.entries.concat([entry])
    }));
    // Save note content here
  };

  editEntry = ({ id, entry }) => {
    this.setState(state => ({
      editMode: false,
      editEntry: null,
      entries: update(state.entries, { [id]: { $set: entry } })
    }));
    // Save note content here
  };

  onAddNew = () => {
    this.setState({
      editMode: true,
      editEntry: null
    });
  };

  onEdit = id => {
    console.log('editing', id);
    this.setState(state => ({
      editMode: true,
      editEntry: {
        id,
        entry: state.entries[id]
      }
    }));
  };

  onCancel = () => {
    this.setState({
      editMode: false,
      editEntry: null
    });
  };

  onRemove = id => {
    this.setState(state => ({
      entries: update(state.entries, { $splice: [[id, 1]] })
    }));
  };

  onSave = ({ id, entry }) => {
    // If there's no ID it's a new note
    if (id != null) {
      this.editEntry({ id, entry });
    } else {
      this.addNew(entry);
    }
  };

  render() {
    const editEntry = this.state.editEntry || {};
    return (
      <div className="sn-component">
        <div id="header">
          <div className="sk-button-group">
            <div onClick={this.onAddNew} className="sk-button info">
              <div className="sk-label">Add New</div>
            </div>
          </div>
        </div>

        <div id="content">
          {this.state.editMode ? (
            <EditEntry
              id={editEntry.id}
              entry={editEntry.entry}
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
