import React, { PropTypes } from 'react';
import {Table} from 'react-bootstrap';
import DocumentTitle from 'react-document-title';

export default class CalculationsPage extends React.Component {
  render() {
    return (
      <DocumentTitle title={`SAN - Kalkulace`}>
        <div className="container">
          <Table responsive striped bordered condensed hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </DocumentTitle>
    );
  }
}
