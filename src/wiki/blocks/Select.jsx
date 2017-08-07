import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import _ from 'lodash';

import Button from './WButton/WButton';
import Menu from './Menu/Menu';

const s = StyleSheet.create({
    select: {
        display: 'inline-block',
        position: 'relative'
    },

    popup: {
        boxSizing: 'border-box',
        position: 'absolute',
        marginTop: 17,
        minWidth: '100%',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.4)',
        background: '#fff',
        opacity: 0,
        pointerEvents: 'none',
        zIndex: 100,
        maxHeight: 188,
        overflow: 'scroll',
        transition: 'opacity 0.1s ease-out, margin-top 0.1s ease-out'
    },

    popup_open: {
        opacity: 1,
        marginTop: 7,
        pointerEvents: 'auto'
    }
});

export default class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        if (props.defaultValue) {
            this.state.value = props.defaultValue;
        } else if (props.value === void 0) {
            let child = React.Children.toArray(props.children)[0];
            if (child) {
                if (child && child.type === Select.Group) {
                    let grandChild = React.Children.toArray(child.props.children)[0]
                    this.state.value = grandChild.props.value;
                } else {
                    this.state.value = child.props.value;
                }
            }
        }
    }

    static defaultProps = {
        kind: 'normal',
        width: 'auto',
        multiple: false,
        size: 'M'
    };

    componentDidMount() {
        this.refs.select.style.width = this.refs.popup.offsetWidth + 5 + 'px';
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.open) {
            window.addEventListener('click', this.handleOutsideClick);
        } else {
            window.removeEventListener('click', this.handleOutsideClick, false);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleOutsideClick, false);
    }

    handleOutsideClick = event => {
        if (event.target === window || this.refs.select && !this.refs.select.contains(event.target)) {
            this.setState({ open: false });
        }
    }

    handleButtonClick = () => {
        this.setState({ open: !this.state.open });
    }

    handleMenuChange = value => {
        let nextState = {
            open: this.props.multiple,
            value: this.props.value === void 0 ? value : void 0
        };
        this.setState(nextState);
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    label() {
        let getItems = children =>
            _.flatten(React.Children.map(children, child => {
                if (child.type === Select.Group) {
                    return getItems(child.props.children);
                } else {
                    return child;
                }
            }));
        let labels = [];
        let value = this.value();

        React.Children.forEach(getItems(this.props.children), (child, i) => {
            if (child.props.value === value || Array.isArray(value) && value.includes(child.props.value)) {
                labels.push(child.props.children || child.props.value);
                labels.push(<span key={'comma' + i}>, </span>);
            }
        });

        labels.pop();

        return labels;
    }

    value() {
        return this.state.value || this.props.value;
    }

    render() {
        let label = this.label();

        return <div className={css(s.select)} ref="select">
            <Button
                checked={this.state.open}
                size={this.props.size}
                controlled
                mode="dropdown"
                type="button"
                kind={this.props.kind}
                style={{ width: '100%' }}
                onClick={this.handleButtonClick}
            >
                {label.length > 0 && label || this.props.placeholder}
            </Button>
            <div className={css(s.popup, this.state.open && s.popup_open)} ref="popup">
                <Menu
                    type="select"
                    multiple={this.props.multiple}
                    value={this.value()}
                    onChange={this.handleMenuChange}
                >
                    {this.props.children}
                </Menu>
            </div>
        </div>
    }
}

Select.Group = Menu.Group;

Select.Item = Menu.Item;
