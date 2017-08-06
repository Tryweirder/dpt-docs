import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const animation = {
    '0%': {
        transform: 'rotate(0deg)'
    },
    
    '100%': {
        transform: 'rotate(360deg)'
    }
};

const s = StyleSheet.create({
    spinner: {
        fontSize: 10,
        textIndent: '-9999em',
        width: '2em',
        height: '2em',
        borderRadius: '50%',
        background: 'linear-gradient(to right, #ccc 10%, rgba(204, 204, 204, 0) 42%)',
        position: 'relative',
        animationName: animation,
        animationDuration: '1.4s',
        animationIterationCount: 'infinite',
        transform: 'translateZ(0)',

        '::before': {
            width: '50%',
            height: '50%',
            background: '#ccc',
            borderRadius: '100% 0 0 0',
            position: 'absolute',
            top: 0,
            left: 0,
            content: '""'
        },

        '::after': {
            background: '#fff',
            width: '75%',
            height: '75%',
            borderRadius: '50%',
            content: '""',
            margin: 'auto',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        }
    }
});

export default function Spinner(props) {
    return <div className={css(s.spinner)}>Loading...</div>;
}
