import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



import ContactForm from './ContactForm/ContactForm ';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList ';
import { fetchContacts, selectFilteredContacts } from './redux/contactsSlice';



const App = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1>Телефонная книга</h1>
      <ContactForm />
      <h2>Контакты</h2>
      <Filter />
      <ContactList contacts={filteredContacts} />
    </div>
  );
};

export default App;