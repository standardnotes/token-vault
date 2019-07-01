import React from 'react';

const ConfirmDialog = ({ onConfirm, onCancel }) => (
  <div className="auth-menu">
    <div className="sk-button" onClick={this.onToggle}>
      <div className="sk-label">•••</div>
    </div>
    {this.state.show && [
      <div className="auth-menu-overlay" onClick={this.onToggle} />,
      <div className="sk-menu-panel">
        <div className="sk-menu-panel-row" onClick={onEdit}>
          <div className="sk-label">Edit</div>
        </div>
        <div className="sk-menu-panel-row" onClick={onRemove}>
          <div className="sk-label">Remove</div>
        </div>
      </div>
    ]}
  </div>
);

export default ConfirmDialog;
