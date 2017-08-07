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
        return get('/api/wiki/libs')
    },

    create(form) {
        return post('/api/wiki/libs', form);
    },
};

export const blocks = {
    list() {
        return get(`/api/wiki/blocks`)
    },

    byLibrary(library) {
        return get(`/api/wiki/libs/${library}`)
    },

    get(library, block) {
        return get(`/api/wiki/libs/${library}/${block}`);
    },

    create(form) {
        return post('/api/wiki/blocks', form);
    },

    snapshot(library, block) {
        return post(`/api/wiki/libs/${library}/${block}/snapshot`, {
            library, block
        });
    }
}

export const depotConfig = {
    get() {
        return get('/api/wiki/config');
    }
}
