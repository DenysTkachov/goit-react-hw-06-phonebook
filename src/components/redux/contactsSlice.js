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
    list: [],
    filter: '',
  },
  reducers: {
    addContact: (state, action) => {
      state.list.push(action.payload);
    },
    deleteContact: (state, action) => {
      const { id, storageKey } = action.payload;
      state.list = state.list.filter(contact => contact.id !== id);
      updateLocalStorage(state.list, storageKey);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(fetchContacts.rejected, (state, action) => {
      console.error('Error fetching contacts:', action.error);
    });
  },
});

const updateLocalStorage = (contacts, storageKey) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(contacts));
  } catch (error) {
    console.error('Error updating localStorage:', error);
  }
};

export const { addContact, deleteContact, setFilter } = contactsSlice.actions;

export const selectFilteredContacts = createSelector(
  state => state.filter.filter,
  state => state.contacts.list,
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

