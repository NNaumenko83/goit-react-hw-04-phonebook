import ContactItem from 'components/ContactItem';
import { ContList } from './ContactList.styled';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ContList>
      {contacts.map(({ id, name, number }) => {
        return (
          <ContactItem
            key={id}
            id={id}
            name={name}
            number={number}
            onDeleteContact={onDeleteContact}
          />
        );
      })}
    </ContList>
  );
};

ContactList.propTypes = {
  visibleContats: PropTypes.array,
  onDeleteContact: PropTypes.func,
};

export default ContactList;
