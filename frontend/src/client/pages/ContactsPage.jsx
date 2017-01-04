import React, { PropTypes } from 'react';
import {Form, FormGroup, ControlLabel, FormControl, Table, Button, ButtonToolbar, Glyphicon, Pagination} from 'react-bootstrap';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

export default class ContactsPage extends React.Component {
  render() {
    return (
      <DocumentTitle title={`SAN - Kontakty`}>
        <div className="container">
          <Form inline>
            <FormGroup controlId="formInlineName">
              <ControlLabel>Name</ControlLabel>
              {' '}
              <FormControl type="text" placeholder="Jane Doe" />
            </FormGroup>
            {' '}
            <FormGroup controlId="formInlineEmail">
              <ControlLabel>Email</ControlLabel>
              {' '}
              <FormControl type="email" placeholder="jane.doe@example.com" />
            </FormGroup>
            {' '}
            <Button type="submit">
              Send invitation
            </Button>
          </Form>
          <Table responsive striped bordered condensed hover>
            <thead>
              <tr>
                <th className="col-xs-1">#</th>
                <th className="col-xs-5">Jméno</th>
                <th className="col-xs-2">Telefon</th>
                <th className="col-xs-3">E-mail</th>
                <th className="col-xs-1" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark Otto</td>
                <td>777 777 777</td>
                <td>m.o@mdo.cz</td>
                <td>
                  <ButtonToolbar>
                    <Button bsSize="xsmall"><Glyphicon glyph="edit" /></Button>
                    <Button bsSize="xsmall"><Glyphicon glyph="remove" /></Button>
                  </ButtonToolbar>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Mark Otto</td>
                <td>777 777 777</td>
                <td>m.o@mdo.cz</td>
                <td>- -</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Mark Otto</td>
                <td>777 777 777</td>
                <td>m.o@mdo.cz</td>
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
      </DocumentTitle>
    );
  }
}
