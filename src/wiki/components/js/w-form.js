import React from 'react';
import block from 'propmods';

import '../css/w-form.less';

let b = block('w-form');

export default function Form(props) {
    return <form {...b(props)} {...props}>
        {props.flash && <div {...b('flash')}>{props.flash}</div>}
        {props.children}
    </form>;
}

Form.defaultProps = {
    alignLabels: 'left'
};

Form.Fields = function(props) {
    return <div {...b('fields')}>
        {props.children}
    </div>;
}

Form.Field = function(props) {
    return <div {...b('field')}>
        <div {...b('label')}>{props.label}</div>
        <div {...b('input')}>
            {props.children}
        </div>
    </div>
}

Form.Bottom = function(props) {
    return <div {...b('bottom')}>
        {props.children}
    </div>;
}
