import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { fetchContacts, selectVisibleContacts } from 'redux/contactsSlice';
import ContactForm from './ContactForm/ContactForm ';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList ';


const App = () => {
  const dispatch = useDispatch();
  const visibleContacts = useSelector(selectVisibleContacts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchContacts());
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <h1>Телефонная книга</h1>
      <ContactForm />
      <h2>Контакты</h2>
      <Filter />
      <ContactList contacts={visibleContacts} />
    </div>
  );
};

export default App;
