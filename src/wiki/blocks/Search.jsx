import React from 'react';
import ReactDOM from 'react-dom';
import FuzzAldrin from 'fuzzaldrin-plus';
import _ from 'lodash';
import { StyleSheet, css } from 'aphrodite/no-important';

import * as API from '../lib/api-client';
import { colors, borders } from '../css/const';

import Input from './Input';
import Link from './Link';

const s = StyleSheet.create({
    search: {
        position: 'relative',
        top: 1
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
        overflowY: 'scroll',
        transition: 'opacity 0.1s ease-out, margin-top 0.1s ease-out'
    },

    popup_clickable: {
        pointerEvents: 'auto'
    },

    popup_open: {
        opacity: 1,
        marginTop: 7,
    },

    block: {
        padding: 12,

        ':not(:first-child)': {
            borderTop: borders.basic
        }
    },

    block_selected: {
        background: colors.selection,
        cursor: 'pointer'
    },

    name: {
        fontSize: 16,
        color: '#000'
    },

    library: {
        marginTop: 5,
        color: '#999'
    }
});

window.FuzzAldrin = FuzzAldrin;

export default class Search extends React.Component {
    constructor(props) {
        super(props);

        this.lastMousePosition = {
            x: 0,
            y: 0
        };

        this.state = {
            open: false,
            clickable: false,
            focused: false,
            value: props.value || '',
            blocks: [],
            foundBlocks: [],
            selected: 0,
            hover: null
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', event => {
            const platform = (/^mac/i).test(navigator.platform) ? 'mac' : 'other';
            const isCmdP = event.metaKey && (event.keyCode === 80 || event.code === 'KeyP');
            const isCtrlP = event.ctrlKey && (event.keyCode === 80 || event.code === 'KeyP');
            if ((platform === 'mac' && isCmdP) || (platform === 'other' && isCtrlP)) {
                event.preventDefault();

                // This is to close any open modals
                let escape = new KeyboardEvent('keydown');
                Object.defineProperty(escape, 'which', { value: 27 });
                window.dispatchEvent(escape);

                this.input.focus();
                this.input.moveCursorToEnd();
            }
        });
    }

    componentDidUpdate() {
        if (this.state.open && this.selected) {
            let selectedOffset = this.selected.offsetTop;
            let selectedBottom = this.selected.offsetHeight + selectedOffset;

            let popupHeight = this.popup.offsetHeight;
            let popupScroll = this.popup.scrollTop;
            let popupBottom = popupHeight + popupScroll;

            if (selectedOffset < popupScroll) {
                this.popup.scrollTop = selectedOffset;
            }

            if (selectedBottom > popupBottom) {
                this.popup.scrollTop = selectedBottom - popupHeight;
            }
        }
    }

    changeValue(value) {
        this.setState({
            value: value,
            selected: 0,
            foundBlocks: this.findBlocks(value)
        });
    }

    close() {
        this.setState({ open: false, focused: false });
        setTimeout(() => this.setState({ clickable: false }), 100);
    }

    findBlocks(query) {
        if (query) {
            return _.sortBy(FuzzAldrin.filter(this.props.blocks, query, { key: 'id' }),
                b => -FuzzAldrin.score(b.id, query)
            );
        } else {
            return this.props.blocks;
        }
    }

    handleBlur = () => {
        this.close();
    }

    handleChange = event => {
        this.changeValue(event.target.value);
    }

    handleFocus = () => {
        this.open();
    }

    handleKeyPress = event => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (this.state.selected < this.state.foundBlocks.length - 1) {
                this.setState({
                    selected: this.state.selected + 1
                });
            }
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (this.state.selected > 0) {
                this.setState({
                    selected: this.state.selected - 1
                });
            }
        } else if (event.key === 'Escape') {
            this.input.blur();
        } else if (event.key === 'Enter') {
            this.handleSelect(this.state.foundBlocks[this.state.selected]);
        }
    }

    handleMouseMove = (event, i) => {
        const { x, y } = this.lastMousePosition;
        const { pageX, pageY } = event;

        if (this.state.selected !== i && (x !== pageX || y !== pageY)) {
            this.setState({ selected: i });
            this.lastMousePosition = {
                x: pageX,
                y: pageY
            };
        }
    }

    handleSelect = block => {
        this.changeValue('');
        this.props.onSelect(block);
        this.input.blur();
    }

    open() {
        this.setState({
            focused: true,
            open: true,
            clickable: true,
            foundBlocks: this.findBlocks(this.state.value)
        });
    }

    render() {
        let blocks = this.state.foundBlocks.map((block, i) => {
            const isSelected = i === this.state.selected;
            const isHovered = i === this.state.hover;

            return <div
                className={css(
                    s.block,
                    isSelected && s.block_selected
                )}
                ref={selected => isSelected && (this.selected = selected)}
                key={block.id}
                onClick={() => this.handleSelect(block)}
                onMouseMove={event => this.handleMouseMove(event, i)}
            >
                <div className={css(s.name)}>
                    {block.name}
                </div>
                <div className={css(s.library)}>
                    {block.library}
                </div>
            </div>;
        });

        const platform = (/^mac/i).test(navigator.platform) ? 'mac' : 'other';
        const shortcut = platform === 'mac' ? '⌘P' : 'Ctrl+P';

        return <div className={css(s.search)}>
            <Input
                size="S"
                kind={this.state.focused ? 'normal' : 'head'}
                value={this.state.value}
                placeholder={`Search ${shortcut}`}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyPress}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                ref={input => this.input = input}
                style={{ borderRadius: 2 }}
            />
            <div
                className={css(s.popup, this.state.open && s.popup_open, this.state.clickable && s.popup_clickable)}
                style={{ width: '150%', maxHeight: 315 }}
                ref={popup => this.popup = popup}
            >
                {blocks}
            </div>
        </div>;
    }
}
