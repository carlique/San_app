import React, { PropTypes } from 'react';
import {Table, ButtonToolbar, Button, Glyphicon} from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';

{/*
number:
name:
street: DataTypes.STRING,
city: DataTypes.STRING,
post: DataTypes.STRING,
country: DataTypes.STRING,
phoneNumber: DataTypes.STRING,
phoneNumber2: DataTypes.STRING,
dateFrom: DataTypes.DATE,
dateTo: DataTypes.DATE,
discount: DataTypes.DECIMAL(10,2),
booking: DataTypes.BOOLEAN,
order: DataTypes.STRING,
dateOrder: DataTypes.DATE,
assembleDate:  DataTypes.DATE,
disassembleDate:  DataTypes.DATE,
assemblePhone:  DataTypes.DATE,
assembleContact: DataTypes.STRING,
executionContact: DataTypes.STRING,
greetings: DataTypes.STRING,
technician: DataTypes.STRING,
desc: DataTypes.TEXT
*/}

export default class CalculationsPage extends React.Component {
  render() {
    return (
      <DocumentTitle title={`SAN - Kalkulace`}>
        <div className="container">
          <Table responsive striped bordered condensed hover>
            <thead>
              <tr>
                <th className="col-xs-1">Číslo</th>
                <th className="col-xs-2">Název</th>
                <th className="col-xs-3">Firma</th>
                <th className="col-xs-3">Adresa</th>
                <th className="col-xs-1">Od</th>
                <th className="col-xs-1">Do</th>
                <th className="col-xs-1" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2016/1</td>
                <td>Test</td>
                <td>Alza s.r.o.</td>
                <td>Za mlýnem 1720, 253 01 Hostivice</td>
                <td>29.9.1975</td>
                <td>30.9.1975</td>
                <td>
                  <ButtonToolbar>
                    <Button bsSize="xsmall"><Glyphicon glyph="edit" /></Button>
                    <Button bsSize="xsmall"><Glyphicon glyph="remove" /></Button>
                  </ButtonToolbar>
                </td>
              </tr>
              <tr>
                <td>2016/1</td>
                <td><Link to="calculation/1">Test</Link></td>
                <td><Link to="contacts/1">Alza s.r.o.</Link></td>
                <td>Za mlýnem 1720, 253 01 Hostivice</td>
                <td>29.9.1975</td>
                <td>30.9.1975</td>
                <td>
                  <ButtonToolbar>
                    <Button bsSize="xsmall"><Glyphicon glyph="edit" /></Button>
                    <Button bsSize="xsmall"><Glyphicon glyph="remove" /></Button>
                  </ButtonToolbar>
                </td>
              </tr>
              <tr>
                <td>2016/1</td>
                <td>Test</td>
                <td>Alza s.r.o.</td>
                <td>Za mlýnem 1720, 253 01 Hostivice</td>
                <td>29.9.1975</td>
                <td>30.9.1975</td>
                <td>
                  <ButtonToolbar>
                    <Button bsSize="xsmall"><Glyphicon glyph="edit" /></Button>
                    <Button bsSize="xsmall"><Glyphicon glyph="remove" /></Button>
                  </ButtonToolbar>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </DocumentTitle>
    );
  }
}
