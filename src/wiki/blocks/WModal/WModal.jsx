import React from 'react';
import block from 'propmods';

import './WModal.less';

let b = block('WModal');

export default class Modal extends React.Component {
    static defaultProps = {
        force: false,
        showControls: false
    };

    componentDidMount() {
        window.addEventListener('keydown', this.handleWindowKeyDown.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleWindowKeyDown);
    }

    handleWindowKeyDown(event) {
        if (event.which === 27) { // Escape
            this.handleClose();
        }
    }

    handleClose() {
        if (!this.props.force && this.props.onClose) {
            this.props.onClose();
        }
    }

    handleFogClick(event) {
        if (event.target === this.refs.fog) {
            this.handleClose();
        }
    }

    render() {
        return <div {...b(this.props)}>
            <div {...b('fog')} onClick={this.handleFogClick.bind(this)} ref="fog">
                <div {...b('content')}>
                    {this.props.children}
                </div>
            </div>
            <div {...b('controls')}>
                {this.props.controls}
                <div {...b('close')} onClick={this.handleClose.bind(this)}>Close</div>
            </div>
        </div>;
    }
}
