import React from 'react';
import block from 'propmods';

import Link from '../Link';

import './WButton.less';

let b = block('WButton');

export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = { clicked: false };
        if (props.defaultChecked !== void 0) {
            this.state.checked = this.props.defaultChecked;
        }
    }

    static defaultProps = {
        kind: 'normal',
        size: 'M',
        mode: 'button',
        disabled: false
    };

    componentWillUpdate(nextProps, nextState) {
        if (nextState.checked !== this.state.checked && this.props.onChange) {
            this.props.onChange(nextState.checked);
        }
    }

    handleBlur() {
        this.setState({ clicked: false });
        if (this.props.onBlur) this.props.onBlur();
    }

    handleClick(event) {
        if (this.props.onClick) {
            this.props.onClick(event);
        }

        if (!event.defaultPrevented) {
            let nextState = { clicked: true };
            let isCheckable = ['check', 'clear-check'].includes(this.props.kind);
            let isDropDown = this.props.mode === 'dropdown';
            if (this.state.checked !== void 0 && (isCheckable || isDropDown)) {
                nextState.checked = !this.state.checked;
            }

            this.setState(nextState);
        }
    }

    render() {
        let component = this.props.href ? Link : 'button';

        return React.createElement(component,
            {
                ...b(this, { iconOnly: this.props.icon && this.props.children === void 0 }),
                ...this.props,
                onClick: this.handleClick.bind(this),
                onBlur: this.handleBlur.bind(this),
                ref: 'button'
            },
            ( this.props.icon &&
                React.createElement('div', {
                    ...b('icon'),
                    style: {
                        backgroundImage: 'url(' + this.props.icon + ')'
                    }
                })
            ),
            ( this.props.children &&
                React.createElement('div', b('label'), this.props.children)
            ),
            ( ['dropdown', 'next', 'back'].includes(this.props.mode) &&
                React.createElement('div', b('arrow'))
            ),
            ( this.props.mode === 'close' &&
                React.createElement('div', b('close'))
            )
        );
    }
}
