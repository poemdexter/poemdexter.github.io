import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.min.css';

class LifeCheck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundRLU: '',
            standardRLU: '',
            sample: '',
            volume: '',
            picograms: 0,
            microCount: 0,
            microLog: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        const bgRLU = this.state.backgroundRLU;
        const sampleRLU = this.state.sample;
        const stdRLU = this.state.standardRLU;
        const volume = this.state.volume;

        let x = (sampleRLU - bgRLU) / (stdRLU - bgRLU) * 10000 / volume;
        let y = Math.round((x + Number.EPSILON) * 100) / 100;
        this.setState({
            picograms: y,
            microCount: Math.round(x * 1000),
            microLog: Math.trunc(Math.log10(x * 1000))
        });
        event.preventDefault();
    }

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Background bRLU:</Form.Label>
                        <Form.Control
                            name="backgroundRLU"
                            type="number"
                            pattern="\d*"
                            value={this.state.backgroundRLU}
                            onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Standard sRLU:</Form.Label>
                        <Form.Control
                            name="standardRLU"
                            type="number"
                            pattern="\d*"
                            value={this.state.standardRLU}
                            onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Sample RLU:</Form.Label>
                        <Form.Control
                            name="sample"
                            type="number"
                            pattern="\d*"
                            value={this.state.sample}
                            onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Volume mL:</Form.Label>
                        <Form.Control
                            name="volume"
                            type="number"
                            pattern="\d*"
                            value={this.state.volume}
                            onChange={this.handleChange} />
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>
                <hr />
                <Row>
                    <Col xs={9}>Picograms (pg) of ATP/mL:</Col>
                    <Col>{this.state.picograms}</Col>
                </Row>
                <Row>
                    <Col xs={9}>Estimated Microbial Count / mL:</Col>
                    <Col>{this.state.microCount}</Col>
                </Row>
                <Row>
                    <Col xs={9}>Estimated log # of microbes per mL:</Col>
                    <Col>{this.state.microLog}</Col>
                </Row>
            </Container>
        );
    }
}

ReactDOM.render(
    <LifeCheck />,
    document.getElementById('root')
);