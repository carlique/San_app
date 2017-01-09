import React, { PropTypes } from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import Contacts from "../components/Contacts";
import Companies from "../components/Companies";

export default class ContactsPage extends React.Component {
  render() {
    return (
      <DocumentTitle title={`SAN - Kontakty`}>
        <div className="container">
          <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Firmy"><Companies /></Tab>
            <Tab eventKey={2} title="Kontakty"><Contacts /></Tab>
          </Tabs>
        </div>
      </DocumentTitle>
    );
  }
}
