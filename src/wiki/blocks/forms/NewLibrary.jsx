import React from 'react';
import reqwest from 'reqwest';

import Form from '../WForm/WForm';
import Input from '../WInput/WInput';
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
        let libraries = await reqwest({
            url: '/api/wiki/libs'
        });

        this.setState({
            loaded: true,
            libraries
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        let form = {};
        ['libname', 'libtitle'].forEach(ref => form[ref] = this.refs[ref].value());
        let response = await reqwest({
            url: '/api/wiki/libs/',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(form)
        });

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
                <h2>Creating library</h2>
                <Form flash={this.state.flash} onSubmit={this.handleSubmit.bind(this)} style={{marginTop: 20}}>
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
