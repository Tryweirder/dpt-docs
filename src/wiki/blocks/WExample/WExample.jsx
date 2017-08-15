import React from 'react';
import Highlight from 'react-highlight';
import block from 'propmods';
import _ from 'lodash';

import '../../../vendor/beast';

import Spinner from '../Spinner';
import Cut from '../Cut';

if (process.env.BROWSER) {
    var cookie = require('cookie_js').cookie;
    require('./WExample.less');
    require('./github.css');

    document.addEventListener('DOMContentLoaded', maintainScroll);
}

const b = block('WExample');

function maintainScroll() {
    let previousScroll = cookie.get('scrollPosition');
    if (previousScroll) {
        window.scrollTo(window.scrollX, previousScroll);
    }
}

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseDown: false
        };
    }

    handleContentMouseDown = () => {
        this.setState({ mouseDown: true });
    };

    handleContentMouseUp = () => {
        this.setState({ mouseDown: false });
    };

    render() {
        const props = this.props;
        let parts = props.lang.split('_');
        let [lang, modName, modValue = true] = parts;

        let mods = (modName = { [modName]: modValue });

        let result;

        const language =
            props.lang === 'bml' ? 'language-html' : `language-${props.lang}`;

        return (
            <div {...b(this, mods)}>
                {!props.src &&
                    <div {...b('preloader')}>
                        <Spinner />
                    </div>}
                <Content
                    code={props.code}
                    src={props.src && props.src + '?platform=' + props.platform}
                    width={props.width}
                    height={props.height}
                    onLoad={() => this.setState({ loaded: true })}
                    onMouseDown={this.handleContentMouseDown}
                    onMouseUp={this.handleContentMouseUp}
                />
                {!props.src &&
                    <div {...b('code')}>
                        <Cut title="Code">
                            <div {...b('code-content')}>
                                <Highlight className={language}>
                                    {props.code.replace(
                                        /(<dptexample>\s+)|<\/dptexample>/g,
                                        ''
                                    )}
                                </Highlight>
                            </div>
                        </Cut>
                    </div>}
            </div>
        );
    }
}

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.mouseDown = false;
        this.lastMouseDownX = null;
        this.lastWidth = null;

        this.state = {
            loaded: false,
            width: null
        };
    }

    handleMouseDown = event => {
        this.mouseDown = true;
        this.lastMouseDownX = event.pageX;
        this.lastWidth = this.refs.example.offsetWidth;
        this.lastBodyUserSelect = document.body.style.userSelect;
        this.lastBodyCursor = document.body.style.cursor;
        document.body.style.cursor = 'ew-resize';
        document.body.style.userSelect = 'none';
        this.props.onMouseDown && this.props.onMouseDown();
    };

    handleWindowMouseMove = _.throttle(event => {
        if (this.mouseDown) {
            this.setState({
                width: this.lastWidth + (event.pageX - this.lastMouseDownX)
            });
        }
    }, 16);

    handleWindowMouseUp = event => {
        this.mouseDown = false;
        document.body.style.cursor = this.lastBodyCursor;
        document.body.style.userSelect = this.lastBodyUserSelect;
        this.props.onMouseUp && this.props.onMouseUp();
    };

    componentDidMount() {
        if (!this.props.src) {
            let node = eval(Beast.parseBML(this.props.code));
            this.props.onLoad();

            let dom = this.refs.example;

            node.render(dom);

            setTimeout(maintainScroll, 0);
        } else {
            this.props.onLoad();
        }

        window.addEventListener('mousemove', this.handleWindowMouseMove);
        window.addEventListener('mouseup', this.handleWindowMouseUp);
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleWindowMouseMove);
        window.removeEventListener('mouseup', this.handleWindowMouseUp);
    }

    render() {
        const props = this.props;

        const style = {
            width: this.state.width || props.width,
            height: props.height
        };

        return (
            <div {...b('container')}>
                {props.src
                    ? <iframe src={props.src} style={style} ref="example" />
                    : <div {...b('content')} style={style} ref="example" />}
                <div {...b('handle')} onMouseDown={this.handleMouseDown} />
            </div>
        );
    }
}
