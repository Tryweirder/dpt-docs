import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import _ from 'lodash';

import { colors, borders } from '../../css/const';
import tick from './tick-m.svg';

const s = StyleSheet.create({
    menu: {
        display: 'block',
        userSelect: 'none',
        cursor: 'default',
        padding: '4px 0'
    },

    item: {
        display: 'flex',
        alignItems: 'center',
        color: '#000',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        fontSize: 13,
        padding: '0 13px',
        height: 24,

        ':hover': {
            backgroundColor: colors.selection
        }
    },

    group: {
        display: 'block',

        ':not(:first-of-type)': {
            borderTop: borders.basic,
            paddingTop: 4
        },

        ':not(:last-of-type)': {
            paddingBottom: 4
        }
    },

    group_titled: {
        paddingLeft: 33
    },

    title: {
        display: 'flex',
        color: '#999',
        alignItems: 'center',
        fontSize: 13,
        padding: '0 13px',
        height: 24
    },

    icon: {
        height: 16,
        flex: '0 0 16px',
        marginRight: 4
    },

    tick: {
        backgroundImage: `url(${tick})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        marginRight: 4,
        height: 24,
        width: 13,
        visibility: 'hidden'
    },

    tick_checked: {
        visibility: 'visible'
    }
});

const valueType = PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
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
        handleItemClick: PropTypes.func
    };

    static propTypes = {
        size: PropTypes.oneOf(['M']),
        type: PropTypes.oneOf(['normal', 'select']),
        multiple: PropTypes.bool,
        defaultValue: valueType,
        value: valueType,
        onChange: PropTypes.func
    };

    static defaultProps = {
        size: 'M',
        type: 'normal',
        multiple: false
    };

    getChildContext() {
        return {
            menuValue: this.state.value || this.props.value,
            handleItemClick: this.handleItemClick
        };
    }

    componentWillUpdate(nextProps, nextState) {
        if (!_.isEqual(this.state.value, nextState.value) && this.props.onChange) {
            this.props.onChange(nextState.value);
        }
    }

    handleItemClick = (itemValue, itemChildren, wasChecked) => {
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
        return <div className={css(s.menu)}>{this.props.children}</div>
    }
}

class Group extends React.Component {
    render() {
        return <li className={css(s.group)}>
            {this.props.title && <div className={css(s.title)}>{this.props.title}</div>}
            <ul className={css(this.props.title && s.group_titled)}>{this.props.children}</ul>
        </li>
    }
}

Menu.Group = Group;

class Item extends React.Component {
    static propTypes = {
        checked: PropTypes.bool
    };

    static contextTypes = {
        menuValue: valueType,
        handleItemClick: PropTypes.func
    };

    handleClick = () => {
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
        let icon = <div className={css(s.icon)} style={{ background: `url(${this.props.icon})` }} />
        return <li className={css(s.item)} onClick={this.handleClick}>
            <div className={css(s.tick, this.isChecked() && s.tick_checked)} />
            {this.props.icon && icon}
            {this.props.children || this.props.value}
        </li>;
    }
}

Menu.Item = Item;
