import React, { PropTypes } from 'react';
import {Form, FormGroup, Clearfix, ControlLabel, Col, FormControl, Table, Button, Tabs, Tab, ButtonToolbar, Glyphicon, Pagination} from 'react-bootstrap';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

export default class ContactsPage extends React.Component {
  render() {
    return (
      <div>
        <Form inline>
          <Col sm={5}>
            <FormGroup controlId="formInlineName">
              <ControlLabel>Filtr:</ControlLabel>
              {' '}
              <FormControl type="text" placeholder="Jane Doe" />
            </FormGroup>
          </Col>
          <Col sm={7}>
            <FormGroup controlId="formInlineEmail">
              <ControlLabel>Obor:</ControlLabel>
              <FormControl componentClass="select" placeholder="select">
                <option value="select">select</option>
                <option value="other">...</option>
              </FormControl>
            </FormGroup>
          </Col>
        </Form>
        <Clearfix />
        <Table responsive striped bordered condensed hover>
          <thead>
            <tr>
              <th className="col-xs-2">Název</th>
              <th className="col-xs-1">Telefon</th>
              <th className="col-xs-2">E-mail</th>
              <th className="col-xs-2">WWW</th>
              <th className="col-xs-3">Adresa</th>
              <th className="col-xs-1">Obor</th>
              <th className="col-xs-1" />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Link to="contacts/1">Some Company s.ro.</Link><br /><span>CEO</span></td>
              <td>777 777 777</td>
              <td>m.o@mdo.cz</td>
              <td>www.company.com</td>
              <td>Some street XXX, Some City, 25301 CZ</td>
              <td>test</td>
              <td>
                <ButtonToolbar>
                  <Button bsSize="xsmall"><Glyphicon glyph="edit" /></Button>
                  <Button bsSize="xsmall"><Glyphicon glyph="remove" /></Button>
                </ButtonToolbar>
              </td>
            </tr>
            <tr>
              <td><Link to="contacts/2">Mr. Mark Otto</Link><br /><span>CEO</span></td>
              <td>777 777 777<br />777 888 999</td>
              <td>m.o@mdo.cz</td>
              <td>Some street XXX, Some City, 25301 CZ</td>
              <td>- -</td>
            </tr>
            <tr>
              <td>Mark Otto</td>
              <td>777 777 777</td>
              <td>m.o@mdo.cz</td>
              <td>Some street XXX, Some City, 25301 CZ</td>
              <td>- -</td>
            </tr>
          </tbody>
        </Table>
        <Pagination
          bsSize="small"
          items={10}
          activePage={1}
        />
      </div>
    );
  }
}
