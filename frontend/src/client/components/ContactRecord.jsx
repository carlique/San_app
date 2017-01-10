import React, { PropTypes } from 'react'
import {Button, ButtonToolbar, Glyphicon} from 'react-bootstrap';
import { Link } from 'react-router';

const ContactListRecord = ({ id, name, phoneNumber, email, street }) => (
  <tr>
    <td><Link to="contacts/{id}">{name}</Link><br /><span>CEO</span></td>
    <td>{phoneNumber}</td>
    <td>{email}</td>
    <td>{street}</td>
    <td>
      <ButtonToolbar>
        <Button bsSize="xsmall"><Glyphicon glyph="edit" /></Button>
        <Button bsSize="xsmall"><Glyphicon glyph="remove" /></Button>
      </ButtonToolbar>
    </td>
  </tr>
)

ContactListRecord.propTypes = {
   id: PropTypes.number.isRequired,
   name: PropTypes.string.isRequired,
   phoneNumber: PropTypes.string,
   email: PropTypes.string,
   street: PropTypes.string
}

export default ContactListRecord
