import React from 'react';

class DataImportDialog extends React.Component {
    state = {
        selectedFile: null
    };

    onFileChange = event => {
        this.setState({ selectedFile: document.getElementById('fileImport').files[0] })
    }

    render() {
        return (
            <div className="auth-overlay">
                <div className="auth-dialog sk-panel">
                    <div className="sk-panel-header">
                        <div className="sk-panel-header-title">Import File</div>
                    </div>
                    <div className="sk-panel-content">
                        <div className="sk-panel-section sk-panel-hero">
                            <div className="sk-panel-row">
                                <input type="file" id="fileImport" accept=".json" onChange={this.onFileChange.bind(this)} />
                            </div>
                        </div>
                    </div>
                    <div className="sk-panel-footer">
                        <div className="sk-button-group stretch">
                            <div className="sk-button neutral" onClick={this.props.onCancel}>
                                <div className="sk-label">Cancel</div>
                            </div>
                            <div className="sk-button info" onClick={(event) => this.props.onConfirm(this.state.selectedFile)}>
                                <div className="sk-label">Import</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DataImportDialog;
