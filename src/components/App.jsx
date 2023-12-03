import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList ';
import { fetchContacts, selectFilteredContacts } from './redux/contactsSlice';
import ContactForm from './ContactForm/ContactForm ';



const App = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);


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

  console.log('filteredContacts in App:', filteredContacts);

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



