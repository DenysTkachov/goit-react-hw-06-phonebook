import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ContactForm from './ContactForm/ContactForm ';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList ';
import { fetchContacts } from '../redux/contactsSlice';



export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1>Телефонная книга</h1>
      <ContactForm />
      <h2>Контакты</h2>
      <Filter />
      <ContactList />
    </div>
  );
};

export default App;

