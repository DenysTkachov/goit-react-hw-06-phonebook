import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { nanoid } from 'nanoid';
import { addContact } from 'components/redux/contactsSlice';


const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
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
    updateLocalStorage([...contacts.contacts, { id: nanoid(), name, number }]);
  };

  const updateLocalStorage = updatedContacts => {
    try {
      const contacts = JSON.stringify(updatedContacts);
      localStorage.setItem('contacts', contacts);
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
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
