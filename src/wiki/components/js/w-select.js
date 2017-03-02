import React from 'react';
import block from 'propmods';
import _ from 'lodash';

import Button from './w-button';
import Menu from './w-menu';

import '../css/w-select.less';

let b = block('w-select');

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
            window.addEventListener('click', this.handleOutsideClick.bind(this));
        } else {
            window.removeEventListener('click', this.handleOutsideClick, false );
        }
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleOutsideClick, false );
    }

    handleOutsideClick(event) {
        if (event.target === window || this.refs.select && !this.refs.select.contains(event.target)) {
            this.setState({ open: false });
        }
    }

    handleButtonClick() {
        this.setState({ open: !this.state.open });
    }

    handleMenuChange(value) {
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

        return <div {...b(this)} ref="select">
            <Button
                checked={this.state.open}
                size={this.props.size}
                controlled
                mode="dropdown"
                type="button"
                kind={this.props.kind}
                onClick={this.handleButtonClick.bind(this)}
            >
                {label.length > 0 && label || this.props.placeholder}
            </Button>
            <div {...b('popup')} ref="popup">
                <Menu
                    type="select"
                    multiple={this.props.multiple}
                    value={this.value()}
                    onChange={this.handleMenuChange.bind(this)}
                >
                    { this.props.children }
                </Menu>
            </div>
        </div>
    }
}

Select.Group = Menu.Group;

Select.Item = Menu.Item;
