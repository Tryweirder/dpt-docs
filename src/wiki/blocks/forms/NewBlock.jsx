import React from 'react';
import {cookie} from 'cookie_js';

import * as API from '../../lib/api-client';

import Form from '../Form';
import Input from '../Input';
import Select from '../Select';
import Button from '../WButton/WButton';

export default class NewBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    async componentDidMount() {
        const libraries = await API.libraries.list();

        this.setState({
            loaded: true,
            libraries
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        let form = {};
        ['block', 'title', 'lib', 'owner'].forEach(ref => form[ref] = this.refs[ref].value());
        cookie.set('username', form.owner, {path: '/', expires: 99999});

        const response = await API.blocks.create(form);

        this.setState({ flash: response.error && response.error.message });

        if (response.error === void 0 && this.props.onSuccess) {
            this.props.onSuccess(response);
        }
    }

    render() {
        if (this.state.loaded) {
            let libraries = this.state.libraries.map(l =>
                <Select.Item value={l.name} key={l.name} />
            );

            return <div>
                <h2>Creating block</h2>
                <Form flash={this.state.flash} onSubmit={this.handleSubmit} style={{marginTop: 20}}>
                    <Form.Fields>
                        <Form.Field label="Block's name">
                            <Input required ref="block" />
                        </Form.Field>
                        <Form.Field label="Description">
                            <Input required ref="title" />
                        </Form.Field>
                        <Form.Field label="Library">
                            <Select defaultValue={this.props.currentLibrary} ref="lib">
                                {libraries}
                            </Select>
                        </Form.Field>
                        <Form.Field label="Maintainer">
                            <Input defaultValue={cookie.get('username')} ref="owner" />
                        </Form.Field>
                    </Form.Fields>
                    <Form.Bottom>
                        <Button kind="action" type="submit">Create</Button>
                    </Form.Bottom>
                </Form>
            </div>;
        } else {
            return <div></div>;
        }
    }
}
