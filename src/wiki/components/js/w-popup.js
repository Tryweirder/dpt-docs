import React from 'react';
import block from 'propmods';
import _ from 'lodash';

import '../css/w-popup.less';

let b = block('w-popup');

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shown: false
        };
    }

    getDefaultProps() {
        return {
            show: 'bottom-center',
            mode: 'click',
            size: 'M',
            autoClose: false,
            force: false,
            type: 'normal',
            tail: false,
            offset: 8
        };
    }

    show() {
        this.setState({ shown: true });
    }

    hide() {
        this.setState({ shown: false });
    }

    toggle() {
        this.setState({ shown: !this.state.shown });
    }

    setLocation() {

    }

    handleTriggerClick() {
        if (this.props.mode === 'click') {
            if (this.props.force) {
                this.show();
            } else {
                this.toggle();
            }
        }
    }

    handleTriggerMouseEnter() {
        if (this.props.mode === 'hover') {
            this.show();
        }
    }

    handleTriggerMouseLeave() {
        if (this.props.mode === 'hover') {
            this.hide();
        }
    }

    render() {
        let propMods = _.pick(this.props, ['show', 'mode', 'size', 'type', 'tail']);
        let cn = b({shown: this.state.shown, ...propMods});

        let offsetStyle = {
            transform: 'translate(${this.props.offset}px, )'
        };

        let triggerEvents = {
            onClick: this.handleTriggerClick.bind(this),
            onMouseEnter: this.handleTriggerMouseEnter.bind(this),
            onMouseLeave: this.handleTriggerMouseLeave.bind(this)
        };

        let contentEvents = {
            onClick: this.handleClick.bind(this),
            onMouseLeave: this.handleMouseLeave.bind(this)
        };

        return <div {...cn}>
            <div {...b('trigger')} ref="trigger" {...triggerEvents}>
                { this.props.trigger }
            </div>
            <div {...b('offset')} style={offsetStyle}>
                <div {...b('popup')} ref="popup">
                    <div {...b('tail')} />
                    <div {...b('content')} {...contentEvents}>
                        { this.props.children }
                    </div>
                </div>
            </div>
        </div>
    }
}
