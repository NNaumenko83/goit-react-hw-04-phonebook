import { FilterLabel, FilterInput } from './Filter.styled';
import PropTypes from 'prop-types';

const Filter = ({ value, onInputChange }) => {
  return (
    <FilterLabel>
      Find contacts by name
      <FilterInput
        type="text"
        name="filter"
        onChange={onInputChange}
        value={value}
      />
    </FilterLabel>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onInputChange: PropTypes.func,
};

export default Filter;
