import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const s = StyleSheet.create({
    page: {
        position: 'relative',
        height: '100%',
        fontFamily: '"Helvetica Neue", Arial, sans-serif',
        fontSize: 13
    }
});

export default function Page(props) {
    return <div className={css(s.page)} {...props} />
}
