import React from 'react';
import PropTypes from 'prop-types';

const AlertDialog = ({ title, message, onDismiss }) => (
  <div className="auth-overlay">
    <div className="auth-dialog sk-panel">
      <div className="sk-panel-header">
        <div className="sk-panel-header-title">{title}</div>
      </div>
      <div className="sk-panel-content">
        <div className="sk-panel-section sk-panel-hero">
          <div className="sk-panel-row">
            <div className="sk-h1">{message}</div>
          </div>
        </div>
      </div>
      <div className="sk-panel-footer">
        <div className="sk-button-group stretch">
          <div className="sk-button info" onClick={onDismiss}>
            <div className="sk-label">OK</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

AlertDialog.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired
};

export default AlertDialog;
