import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const s = StyleSheet.create({
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        pointerEvents: 'none',
        zIndex: '1000',
        transition: 'opacity 0.1s ease-out'
    },

    modal_open: {
        display: 'block',
        opacity: 1,
        pointerEvents: 'auto'
    },

    fog: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    content: {
        maxHeight: '80%',
        maxWidth: '80%',
        backgroundColor: '#fff',
        boxShadow: '0 45px 100px -10px rgba(0, 0, 0, 0.5)'
    },

    content_padded: {
        padding: '30px 30px 40px'
    },

    controls: {
        position: 'absolute',
        top: 25,
        right: 30,
        fontSize: 15,
        lineHeight: '20px'
    }
});

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
        return <div className={css(s.modal, this.props.open && s.modal_open)}>
            <div className={css(s.fog)} onClick={this.handleFogClick.bind(this)} ref="fog">
                <div className={css(s.content, this.props.padded && s.content_padded)}>
                    {this.props.children}
                </div>
            </div>
            {
                this.props.showControls &&
                <div className={css(s.controls)}>
                    {this.props.controls}
                    <div className={css(s.close)} onClick={this.handleClose.bind(this)}>Close</div>
                </div>
            }
        </div>;
    }
}
