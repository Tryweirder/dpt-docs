import React from 'react';
import ReactDOM from 'react-dom';
import block from 'propmods';
import FuzzAldrin from 'fuzzaldrin-plus';
import _ from 'lodash';
import reqwest from 'reqwest';

import Input from '../WInput/WInput';
import Link from '../Link';

import './WSearch.less';

let b = block('WSearch');

window.FuzzAldrin = FuzzAldrin;

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            clickable: false,
            focused: false,
            loaded: false,
            value: props.value || '',
            blocks: [],
            foundBlocks: [],
            selected: 0
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

                this.refs.input.focus();
                this.refs.input.moveCursorToEnd();
            }
        });
    }

    componentDidUpdate() {
        if (this.state.open && this.refs.selected) {
            let selectedOffset = this.refs.selected.offsetTop;
            let selectedBottom = this.refs.selected.offsetHeight + selectedOffset;

            let popupHeight = this.refs.popup.offsetHeight;
            let popupScroll = this.refs.popup.scrollTop;
            let popupBottom = popupHeight + popupScroll;

            if (selectedOffset < popupScroll) {
                this.refs.popup.scrollTop = selectedOffset;
            }

            if (selectedBottom > popupBottom) {
                this.refs.popup.scrollTop = selectedBottom - popupHeight;
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

    findBlocks(query, blocks = this.state.blocks) {
        if (query) {
            return _.sortBy(FuzzAldrin.filter(blocks, query, { key: 'id' }),
                b => -FuzzAldrin.score(b.id, query)
            );
        } else {
            return blocks;
        }
    }

    handleChange(event) {
        this.changeValue(event.target.value);
    }

    handleKeyPress(event) {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (this.state.selected < this.state.foundBlocks.length - 1) {
                this.setState({ selected: this.state.selected + 1 });
            }
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (this.state.selected > 0) {
                this.setState({ selected: this.state.selected - 1 });
            }
        } else if (event.key === 'Escape') {
            this.refs.input.blur();
        } else if (event.key === 'Enter') {
            this.handleSelect(this.state.foundBlocks[this.state.selected]);
        }
    }

    handleBlur(event) {
        this.close();
    }

    handleSelect(block) {
        this.changeValue('');
        this.props.onSelect(block);
        this.refs.input.blur();
    }

    loadBlocks() {
        return reqwest({
            url: '/api/wiki/blocks'
        });
    }

    async open() {
        this.setState({ focused: true });

        let nextState = {
            open: true,
            clickable: true
        };

        if (!this.state.loaded) {
            nextState.blocks = await this.loadBlocks();
            nextState.foundBlocks = this.findBlocks(this.state.value, nextState.blocks);
            nextState.loaded = true;
        }

        this.setState(nextState);
    }

    render() {
        let selected = this.state.selected;

        let blocks = this.state.foundBlocks.map((block, i) =>
            <div
                {...b('block', { selected: i === selected }) }
                ref={i === selected ? 'selected' : ''}
                key={block.id}
                onClick={() => this.handleSelect(block)}
            >
                <div {...b('block-name') }>
                    {block.name}
                </div>
                <div {...b('block-library') }>
                    {block.library}
                </div>
        </div>);

        const platform = (/^mac/i).test(navigator.platform) ? 'mac' : 'other';
        const shortcut = platform === 'mac' ? '⌘P' : 'Ctrl+P';

        return <div {...b(this) } ref="search">
            <Input
                size="S"
                kind={this.state.focused ? 'normal' : 'pseudo-head'}
                value={this.state.value}
                placeholder={`Search ${shortcut}`}
                onChange={this.handleChange.bind(this)}
                onKeyDown={this.handleKeyPress.bind(this)}
                onFocus={this.open.bind(this)}
                onBlur={this.handleBlur.bind(this)}
                ref="input"
                style={{ borderRadius: 2 }}
            />
            <div {...b('popup') } ref="popup">
                {blocks}
            </div>
        </div>;
    }
}
