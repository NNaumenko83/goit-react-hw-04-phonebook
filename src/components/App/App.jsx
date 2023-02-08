import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import { ContactsTitle, Container } from './App.styled';
import useLocalStorage from '../Hooks/useLocalStorage';
import useInput from '../Hooks/useInput';

const LS_KEY = 'contacts';

const App = () => {
  const [contacts, setContacts] = useLocalStorage(LS_KEY, []);
  const input = useInput('');

  const addContact = ({ name, number }) => {
    if (checkContact(name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    const contact = {
      id: nanoid(5),
      name,
      number,
    };

    setContacts(prevState => [contact, ...prevState]);
  };

  const checkContact = checkedNameContact => {
    const res = contacts.find(contact => contact.name === checkedNameContact);
    return res;
  };

  const getVisibleContacts = normalizedFilter => {
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const normalizedFilter = input.value.toLocaleLowerCase();
  const visibleContats = getVisibleContacts(normalizedFilter);

  return (
    <Container>
      <h1>Phonebook</h1>

      <ContactForm onSubmit={addContact} />

      <ContactsTitle>Contacts</ContactsTitle>

      <Filter {...input} />

      {contacts.length > 0 && (
        <ContactList
          contacts={visibleContats}
          onDeleteContact={deleteContact}
        />
      )}
    </Container>
  );
};

export default App;
