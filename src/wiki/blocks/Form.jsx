import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const s = StyleSheet.create({
    form: {
        marginTop: 30
    },

    flash: {
        padding: 10,
        backgroundColor: 'rgba(255, 100, 100, 0.9)',
        color: '#fff',
        marginBottom: 15
    },

    fields: {
        display: 'table'
    },

    field: {
        display: 'table-row',
        verticalAlign: 'baseline',

        ':not(:first-of-type) > *': {
            paddingTop: 25
        }
    },

    bottom: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 25,
        width: '100%'
    },

    label: {
        display: 'table-cell',
        paddingRight: 20
    },

    input: {
        display: 'table-cell'
    }
});

export default function Form(props) {
    const {flash, alignLabels, children, ...other} = props;
    return <form className={css(s.form)} {...other}>
        {flash && <div {...b('flash') }>{flash}</div>}
        {children}
    </form>;
}

Form.defaultProps = {
    alignLabels: 'left'
};

Form.Fields = function (props) {
    return <div className={css(s.fields)}>
        {props.children}
    </div>;
}

Form.Field = function (props) {
    return <div className={css(s.field)}>
        <div className={css(s.label)}>{props.label}</div>
        <div className={css(s.input)}>
            {props.children}
        </div>
    </div>
}

Form.Bottom = function (props) {
    return <div className={css(s.bottom)}>
        {props.children}
    </div>;
}
