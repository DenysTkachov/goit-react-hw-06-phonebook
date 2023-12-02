import { changeFilter } from 'components/redux/filterSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter.filter);

  const handleFilterChange = e => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <input
      type="text"
      name="filter"
      value={filter}
      onChange={handleFilterChange}
      placeholder="Search contacts..."
    />
  );
};

export default Filter;