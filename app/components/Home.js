import React from 'react';
import update from 'immutability-helper';
import EditEntry from './EditEntry';
import ViewEntries from './ViewEntries';
import ConfirmDialog from './ConfirmDialog';
import DataErrorAlert from './DataErrorAlert';
// import BridgeManager from '../lib/BridgeManager';

const note = {
  content: {
    title: 'test title',
    text: ''
  }
};

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    let parseError = false;

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

    if (note.content.text) {
      try {
        entries = JSON.parse(note.content.text);
      } catch (e) {
        // Couldn't parse the content
        parseError = true;
      }
    }

    this.state = {
      note,
      entries,
      parseError,
      editMode: false,
      editEntry: null,
      confirmRemove: false
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
      confirmRemove: false,
      editMode: false,
      editEntry: null
    });
  };

  onRemove = id => {
    this.setState(state => ({
      confirmRemove: true,
      editEntry: {
        id,
        entry: state.entries[id]
      }
    }));
  };

  removeEntry = id => {
    this.setState(state => ({
      confirmRemove: false,
      editEntry: null,
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
        {this.state.parseError && <DataErrorAlert />}
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
          {this.state.confirmRemove && (
            <ConfirmDialog
              title={`Remove ${editEntry.entry.service}`}
              message="Are you sure you want to remove this entry?"
              onConfirm={() => this.removeEntry(editEntry.id)}
              onCancel={this.onCancel}
            />
          )}
        </div>
      </div>
    );
  }
}
