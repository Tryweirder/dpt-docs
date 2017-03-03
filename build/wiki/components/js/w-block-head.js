'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = BlockHead;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propmods = require('propmods');

var _propmods2 = _interopRequireDefault(_propmods);

var _wLink = require('./w-link');

var _wLink2 = _interopRequireDefault(_wLink);

var _wButton = require('./w-button');

var _wButton2 = _interopRequireDefault(_wButton);

var _wSelect = require('./w-select');

var _wSelect2 = _interopRequireDefault(_wSelect);

require('../css/w-block-head.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var b = (0, _propmods2.default)('w-block-head');

function BlockHead(props, context) {
    var githubUrl = void 0;

    if (context.depotConfig.repository) {
        githubUrl = context.depotConfig.repository + '/tree/master' + props.path + '/' + props.currentVersion;
    }

    return _react2.default.createElement(
        'div',
        b(props),
        _react2.default.createElement(
            Group,
            null,
            _react2.default.createElement(Owner, { username: props.owner })
        ),
        _react2.default.createElement(
            Group,
            null,
            _react2.default.createElement(Platforms, {
                onChange: props.onPlatformChange,
                current: props.currentPlatform,
                platforms: props.platforms
            })
        ),
        _react2.default.createElement(
            Group,
            null,
            _react2.default.createElement(Versions, {
                versions: props.versions,
                current: props.currentVersion,
                onChange: props.onVersionChange,
                onSnapshotClick: props.onSnapshot
            })
        ),
        githubUrl && _react2.default.createElement(
            Group,
            null,
            _react2.default.createElement(
                _wLink2.default,
                { icon: '/.core/assets/icons/favicon-github.png', href: githubUrl },
                'Show the code'
            )
        ),
        _react2.default.createElement(
            Group,
            { align: 'right' },
            _react2.default.createElement(_wButton2.default, { external: true, icon: '/.core/assets/icons/maximize.svg', href: props.docSrc, kind: 'clear', size: 'S' })
        )
    );
}

BlockHead.contextTypes = {
    isLocal: _react2.default.PropTypes.bool,
    depotConfig: _react2.default.PropTypes.object
};

function Group(props) {
    return _react2.default.createElement(
        'div',
        b('group', props),
        props.children
    );
}

function Owner(props) {
    return _react2.default.createElement(
        'div',
        b('owner'),
        _react2.default.createElement(
            'span',
            b('owner-name'),
            props.username
        )
    );
}

function Platforms(props) {
    var defaultPlatforms = ['desktop', 'tablet', 'mobile'];
    var platforms = props.platforms.only || defaultPlatforms;

    var options = platforms.map(function (p) {
        return _react2.default.createElement(
            _wSelect2.default.Item,
            { value: p, key: p },
            _react2.default.createElement(
                'span',
                b('platform'),
                p
            )
        );
    });

    return _react2.default.createElement(
        'div',
        b('platforms'),
        _react2.default.createElement(
            'label',
            b('label'),
            'Platform:'
        ),
        _react2.default.createElement(
            _wSelect2.default,
            { size: 'S', value: props.current, onChange: props.onChange },
            options
        )
    );
}

function Versions(props, context) {
    var hasNext = props.versions.includes('next');
    var snapshotButtonProps = {
        disabled: !hasNext,
        onClick: props.onSnapshotClick,
        size: 'S',
        title: !hasNext ? 'Block dosn\'t have next version' : null
    };

    var snapshotButton = _react2.default.createElement(
        'div',
        b('snapshot-button'),
        _react2.default.createElement(
            _wButton2.default,
            snapshotButtonProps,
            'Freeze next version'
        )
    );

    return _react2.default.createElement(
        'div',
        b('versions'),
        _react2.default.createElement(
            'label',
            b('label'),
            'Version:'
        ),
        _react2.default.createElement(
            _wSelect2.default,
            { size: 'S', value: props.current, onChange: props.onChange },
            props.versions.map(function (v) {
                return _react2.default.createElement(
                    _wSelect2.default.Item,
                    { value: v, key: v },
                    v
                );
            })
        ),
        context.isLocal && snapshotButton
    );
}

Versions.contextTypes = {
    isLocal: _react2.default.PropTypes.bool
};