import React from 'react';

import * as API from '../../lib/api-client';

import Form from '../Form';
import Input from '../Input';
import Select from '../Select';
import Button from '../WButton/WButton';

export default class NewBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: true
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        let form = {};
        ['libname', 'libtitle'].forEach(ref => form[ref] = this.refs[ref].value());
        
        const response = await API.libraries.create(form);

        // this.setState({ flash: response.error && response.error.message });

        // if (response.error === void 0 && this.props.onSuccess) {
        //     this.props.onSuccess(response);
        // }
    }

    render() {
        if (this.state.loaded) {
            return <div>
                <h2>Creating library</h2>
                <Form flash={this.state.flash} onSubmit={this.handleSubmit} style={{marginTop: 20}}>
                    <Form.Fields>
                        <Form.Field label="Lib name">
                            <Input required ref="libname" />
                        </Form.Field>
                        <Form.Field label="Description">
                            <Input required ref="libtitle" />
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
