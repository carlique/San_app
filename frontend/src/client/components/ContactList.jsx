import React, { PropTypes } from 'react'
import {Table} from 'react-bootstrap';
import ContactRecord from './ContactRecord'

const ContactList = ({ contacts }) => (
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
      {contacts.map(contact =>
        <ContactRecord
          key={contact.id}
          {...contact}
        />
      )}
    </tbody>
  </Table>
)

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    street: PropTypes.string,
  }).isRequired).isRequired
}

export default ContactList
