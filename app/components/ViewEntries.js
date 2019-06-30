import React from 'react';
import AuthEntry from './AuthEntry';

const ViewEntries = ({ entries, onEdit, onRemove }) => (
  <div className="auth-list">
    {entries.map((entry, idx) => (
      <AuthEntry
        key={idx}
        id={idx}
        entry={entry}
        onEdit={onEdit.bind(this, idx)}
        onRemove={onRemove.bind(this, idx)}
      />
    ))}
  </div>
);

export default ViewEntries;
