import { ContItem, Button } from './ContactItem.styled';
import PropTypes from 'prop-types';

const ContactItem = ({ name, number, onDeleteContact, id }) => {
  return (
    <ContItem>
      {name}: {number}
      <Button
        type="button"
        onClick={() => {
          onDeleteContact(id);
        }}
      >
        Delete
      </Button>
    </ContItem>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  onDeleteContact: PropTypes.func,
  id: PropTypes.string,
};

export default ContactItem;
