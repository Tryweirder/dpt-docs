import React from 'react';
import block from 'propmods';
import _ from 'lodash';

import './WMenu.less';

let b = block('WMenu');

const valueType = React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.string),
    React.PropTypes.string
]);

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue
        };
    }

    static childContextTypes = {
        menuValue: valueType,
        handleItemClick: React.PropTypes.func
    };

    static propTypes = {
        size: React.PropTypes.oneOf(['M']),
        type: React.PropTypes.oneOf(['normal', 'select']),
        multiple: React.PropTypes.bool,
        defaultValue: valueType,
        value: valueType,
        onChange: React.PropTypes.func
    };

    static defaultProps = {
        size: 'M',
        type: 'normal',
        multiple: false
    };

    getChildContext() {
        return {
            menuValue: this.state.value || this.props.value,
            handleItemClick: this.handleItemClick.bind(this)
        };
    }

    componentWillUpdate(nextProps, nextState) {
        if (!_.isEqual(this.state.value, nextState.value) && this.props.onChange) {
            this.props.onChange(nextState.value);
        }
    }

    handleItemClick(itemValue, itemChildren, wasChecked) {
        let newValue;
        if (this.props.multiple) {
            if (wasChecked) {
                newValue = this.state.value.filter(v => v !== itemValue);
            } else {
                newValue = this.state.value.concat([itemValue]);
            }
        } else {
            newValue = itemValue;
        }
        this.setState({ value: newValue });
    }

    render() {
        return <div {...b(this)}>{ this.props.children }</div>
    }
}

class Group extends React.Component {
    render() {
        return <li {...b('group', { hasTitle: !!this.props.title })}>
            { this.props.title && <div {...b('title')}>{this.props.title}</div> }
            <ul>{this.props.children}</ul>
        </li>
    }
}

Menu.Group = Group;

class Item extends React.Component {
    static propTypes = {
        checked: React.PropTypes.bool
    };

    static contextTypes = {
        menuValue: valueType,
        handleItemClick: React.PropTypes.func
    };

    handleClick() {
        let fn = this.props.onClick || this.context.handleItemClick;
        if (fn) {
            fn(this.props.value, this.props.children, this.props.checked);
        }
    }

    isChecked() {
        return this.context.menuValue === this.props.value ||
            Array.isArray(this.context.menuValue) &&
            this.context.menuValue.includes(this.props.value);
    }

    render() {
        let icon = <div {...b('icon')} style={{background: `url(${this.props.icon})`}} />
        return <li {...b('item', this.props, { checked: this.isChecked() })} onClick={this.handleClick.bind(this)}>
            <div {...b('tick')} />
            { this.props.icon && icon }
            { this.props.children || this.props.value }
        </li>;
    }
}

Menu.Item = Item;
