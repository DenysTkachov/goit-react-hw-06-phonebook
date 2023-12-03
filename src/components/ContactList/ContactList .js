import { deleteContact } from 'components/redux/contactsSlice';
import React from 'react';
import { useDispatch } from 'react-redux';


const ContactList = ({ contacts }) => {
  console.log('contacts in ContactList:', contacts);
  const dispatch = useDispatch();

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul>
      {contacts.map(contact => (
        <li key={contact.id}>
          {contact.name}: {contact.number}
          <button onClick={() => handleDeleteContact(contact.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;

