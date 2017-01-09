import { Link } from 'react-router';
import {Typeahead} from 'react-bootstrap-typeahead';
import React, { PropTypes } from 'react';
import { LoginLink } from 'react-stormpath';
import {Col, Form, FormGroup, FieldGroup, ControlLabel, Checkbox, FormControl, Button } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';


export default class IndexPage extends React.Component {
  render() {
    return (
      <DocumentTitle title={`SAN - Kalkulace č.XXXX`}>

        <div className="container">
          <Form>
            <Col sm={6}>
              <FormGroup controlId="formControlsSurname">
                <ControlLabel>Příjmení</ControlLabel>
                <FormControl type="text" placeholder="Novák" />
              </FormGroup>
            </Col>
            <Col sm={5}>
              <FormGroup controlId="formControlsSurname">
                <ControlLabel>Jméno</ControlLabel>
                <FormControl type="text" placeholder="Jan" />
              </FormGroup>
            </Col>
            <Col sm={1}>
              <FormGroup controlId="formControlsSurname">
                <ControlLabel>Titul</ControlLabel>
                <FormControl type="text" placeholder="Ing." />
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup controlId="formControlsSurname">
                <ControlLabel>Firma:</ControlLabel>
                <Typeahead
                  options={["Test","Test2"]}
                />
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup controlId="formControlsSurname">
                <ControlLabel>Pozice:</ControlLabel>
                <FormControl type="text" placeholder="Pozice" />
              </FormGroup>
            </Col>
            <Col sm={3}>
              <FormGroup controlId="formControlsSurname">
                <ControlLabel>Telefon:</ControlLabel>
                <FormControl type="text" placeholder="Přjmení" />
              </FormGroup>
            </Col>
            <Col sm={3}>
              <FormGroup controlId="formControlsSurname">
                <ControlLabel>Telefon 2:</ControlLabel>
                <FormControl type="text" placeholder="Jméno" />
              </FormGroup>
            </Col>
            <Col sm={3}>
              <FormGroup controlId="formControlsSurname">
                <ControlLabel>E-mail</ControlLabel>
                <FormControl type="email" placeholder="Vložte e-mail" />
              </FormGroup>
            </Col>
            <Col sm={3}>
              <FormGroup controlId="formControlsSurname">
                <ControlLabel>WWW</ControlLabel>
                <FormControl type="text" value="www.seznam.cz" placeholder="Vložte URL" />
              </FormGroup>
            </Col>
            <Col sm={4}>
              <FormGroup controlId="formControlsSurname">
                <ControlLabel>Ulice:</ControlLabel>
                <FormControl type="text" placeholder="Pozice" />
              </FormGroup>
            </Col>
            <Col sm={2}>
              <FormGroup controlId="formControlsSurname">
                <ControlLabel>PSČ:</ControlLabel>
                <FormControl type="text" value="www.seznam.cz" placeholder="Vložte URL" />
              </FormGroup>
            </Col>
            <Col sm={4}>
              <FormGroup controlId="formControlsSurname">
                <ControlLabel>Obec:</ControlLabel>
                <FormControl type="text" value="www.seznam.cz" placeholder="Vložte URL" />
              </FormGroup>
            </Col>
            <Col sm={2}>
              <FormGroup controlId="formControlsSurname">
                <ControlLabel>Stát:</ControlLabel>
                <FormControl type="text" value="www.seznam.cz" placeholder="Vložte URL" />
              </FormGroup>
            </Col>
            <Col sm={12}>
              <FormGroup controlId="formControlsSurname">
                <ControlLabel>Komentář:</ControlLabel>
                <FormControl componentClass="textarea" rows={4} value="www.seznam.cz" placeholder="Vložte URL" />
              </FormGroup>
            </Col>
            <Col sm={2} smOffset={10}>
              <Button bsStyle="primary" type="submit">
                Uložit
              </Button>
              {' '}
              <Button bsStyle="default" type="reset">
                Zrušit
              </Button>
            </Col>
          </Form>
        </div>
      </DocumentTitle>
    );
  }
}
