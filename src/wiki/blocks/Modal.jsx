import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const s = StyleSheet.create({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        pointerEvents: 'none',
        zIndex: '1000',
        transition: 'opacity 0.1s ease-out',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },

    modal_open: {
        opacity: 1,
        pointerEvents: 'auto'
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

    handleClose = () => {
        if (!this.props.force && this.props.onClose) {
            this.props.onClose();
        }
    }

    handleFogClick = (event) => {
        if (event.target === this.fog) {
            this.handleClose();
        }
    }

    handleWindowKeyDown = (event) => {
        if (event.which === 27) { // Escape
            this.handleClose();
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleWindowKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleWindowKeyDown);
    }

    render() {
        const props = this.props;

        return <div
            className={css(s.modal, props.open && s.modal_open)}
            onClick={this.handleFogClick}
            ref={fog => this.fog = fog}
        >
            <div className={css(s.content, props.padded && s.content_padded)}>
                {props.children}
            </div>
            
            {
                props.showControls &&
                <div className={css(s.controls)}>
                    {props.controls}
                    <div className={css(s.close)} onClick={this.handleClose}>Close</div>
                </div>
            }

        </div>;
    }
}
