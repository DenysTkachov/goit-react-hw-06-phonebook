import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";


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
      const { id } = action.payload;
      state.list = state.list.filter(contact => contact.id !== id);
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

export const selectVisibleContacts = createSelector(
  state => state.contacts.list,
  state => state.contacts.filter,
  (contacts, filter) => {
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

export const { addContact, deleteContact, setFilter } = contactsSlice.actions;

export default contactsSlice.reducer;
