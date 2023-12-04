import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { addContact } from '../../redux/contactsSlice';

const ContactForm = () => {
  const dispatch = useDispatch();
  const [contact, setContact] = useState({ name: '', number: '' });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setContact(prevContact => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleAddContact = () => {
    const { name, number } = contact;

    if (name.trim() === '' || number.trim() === '') {
      return;
    }

    dispatch(addContact({ id: nanoid(), name, number }));
    setContact({ name: '', number: '' });
  };

  return (
    <div>
      <h2>Name</h2>
      <input
        type="text"
        name="name"
        value={contact.name}
        onChange={handleInputChange}
        required
      />
      <h2>Number</h2>
      <input
        type="tel"
        name="number"
        value={contact.number}
        onChange={handleInputChange}
        required
      />
      <button onClick={handleAddContact}>Add Contact</button>
    </div>
  );
};

export default ContactForm;
