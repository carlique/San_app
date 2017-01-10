import React, { PropTypes } from 'react';
import {Form, Button, FormGroup, ControlLabel, FormControl, Pagination} from 'react-bootstrap';
import VisibleContactList from '../containers/VisibleContactList';
import FilterButton from '../containers/FilterButton';

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
          <FilterButton filter="SHOW_ALL">
            Vše
          </FilterButton>
          {", "}
          <FilterButton filter="SHOW_CUSTOMERS">
            Zákkazníci
          </FilterButton>
          {", "}
          <FilterButton filter="SHOW_PROVIDERS">
            Dodavatelé
          </FilterButton>
        </Form>
        <VisibleContactList />
        <Pagination
          bsSize="small"
          items={10}
          activePage={1}
        />
      </div>
    );
  }
}
