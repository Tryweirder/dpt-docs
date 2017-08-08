function get(url, opts = {}) {
    return fetch(url, {
        credentials: 'include',
        ...opts
    }).then(r => r.json());
}

function post(url, data, opts = {}) {
    return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        ...opts
    }).then(r => r.json());
}

export const libraries = {
    list() {
        return get('/api/docs/libs')
    },

    create(form) {
        return post('/api/docs/libs', form);
    },
};

export const blocks = {
    list() {
        return get(`/api/docs/blocks`)
    },

    byLibrary(library) {
        return get(`/api/docs/libs/${library}`)
    },

    get(library, block) {
        return get(`/api/docs/libs/${library}/${block}`);
    },

    create(form) {
        return post('/api/docs/blocks', form);
    },

    snapshot(library, block) {
        return post(`/api/docs/libs/${library}/${block}/snapshot`, {
            library, block
        });
    }
}

export const depotConfig = {
    get() {
        return get('/api/docs/config');
    }
}
