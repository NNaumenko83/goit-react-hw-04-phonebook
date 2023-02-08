import { nanoid } from 'nanoid';
import { Component } from 'react';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import { ContactsTitle, Container } from './App.styled';

const LS_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleInputChange = e => {
    const { name, value } = e.currentTarget;
    console.log(name);
    this.setState({ [name]: value });
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  addContact = ({ name, number }) => {
    if (this.checkContact(name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    const contact = {
      id: nanoid(5),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  checkContact = checkedNameContact => {
    const res = this.state.contacts.find(
      contact => contact.name === checkedNameContact
    );
    return res;
  };

  getVisibleContacts = normalizedFilter => {
    return this.state.contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem(LS_KEY);
    const parsedContacts = JSON.parse(contacts);
    if (!parsedContacts) {
      return;
    }
    this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate() {
    localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
  }

  render() {
    const normalizedFilter = this.state.filter.toLocaleLowerCase();
    const visibleContats = this.getVisibleContacts(normalizedFilter);

    return (
      <Container>
        <h1>Phonebook</h1>

        <ContactForm onSubmit={this.addContact} />

        <ContactsTitle>Contacts</ContactsTitle>

        <Filter value={this.state.filter} onInputChange={this.changeFilter} />

        {this.state.contacts.length > 0 && (
          <ContactList
            contacts={visibleContats}
            onDeleteContact={this.deleteContact}
          />
        )}
      </Container>
    );
  }
}
