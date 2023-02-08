import { useState } from 'react';

const useInput = defaultValue => {
  const [value, setValue] = useState(defaultValue);

  const onInputChange = e => {
    setValue(e.target.value);
  };

  return { value, onInputChange };
};

export default useInput;
