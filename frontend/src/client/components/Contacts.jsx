import React, { PropTypes } from 'react';
import {Form, FormGroup, ControlLabel, FormControl, Table, Button, Tabs, Tab, ButtonToolbar, Glyphicon, Pagination} from 'react-bootstrap';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

export default class ContactsPage extends React.Component {
  render() {
    return (
      <div>
        <Form inline>
          <FormGroup controlId="formInlineName">
            <ControlLabel>Filtr:</ControlLabel>
            {' '}
            <FormControl type="text" placeholder="Jane Doe" />
          </FormGroup>
          {' '}
          <Button type="submit">
            Filtruj
          </Button>
        </Form>
        <Table responsive striped bordered condensed hover>
          <thead>
            <tr>
              <th className="col-xs-3">Jméno</th>
              <th className="col-xs-2">Telefon</th>
              <th className="col-xs-2">E-mail</th>
              <th className="col-xs-4">Adresa</th>
              <th className="col-xs-1" />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Link to="contacts/1">Mr. Mark Otto</Link><br /><span>CEO</span></td>
              <td>777 777 777</td>
              <td>m.o@mdo.cz</td>
              <td>Some street XXX, Some City, 25301 CZ</td>
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
