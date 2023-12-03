import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    try {
      const savedContacts = localStorage.getItem('contacts');
      if (savedContacts) {
        return JSON.parse(savedContacts);
      }
      return [];
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    filter: '',
  },
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
    });
  },
});

export const { addContact, deleteContact, setFilter } = contactsSlice.actions;

export const selectFilteredContacts = createSelector(
  state => state.contacts && state.contacts.filter,
  state => state.contacts && state.contacts.contacts,
  (filter, contacts) => {
    return contacts
      ? contacts.filter(
          contact =>
            contact.name &&
            typeof contact.name === 'string' &&
            contact.name.toLowerCase().includes(filter && filter.toLowerCase())
        )
      : [];
  }
);

export default contactsSlice.reducer;

