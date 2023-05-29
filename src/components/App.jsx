import React, { Component } from "react";
import { nanoid } from "nanoid";
import Form from "./Form/Form";
import Contacts from "./Contacts/Contacts";
import Filter from "./Filter/Filter";

export class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };
  componentDidMount() {
    const contactsFromLocalStorage = JSON.parse(
      localStorage.getItem("contacts")
    );
    console.log(contactsFromLocalStorage);
    if (contactsFromLocalStorage) {
      this.setState({ contacts: contactsFromLocalStorage });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (
      contacts.length !== 0 &&
      contacts.length !== prevState.contacts.length
    ) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }
  onSubmiHandler = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(({ contacts }) => {
      const includeName = contacts.find(
        (user) => user.name.toLowerCase() === contact.name.toLowerCase()
      );
      if (includeName) {
        alert(`${contact.name} is already in contacs`);
      } else {
        return { contacts: [contact, ...contacts] };
      }
    });
  };

  handelChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleDelete = (id) => {
    this.setState((prevState) => {
      const newContactList = prevState.contacts.filter(
        (contact) => contact.id !== id
      );
      console.log(newContactList);

      return { contacts: newContactList };
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const filterContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <>
        <h1>Phonebook</h1>
        <Form onSubmit={this.onSubmiHandler} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handelChange} />
        <Contacts contacts={filterContacts} onDelete={this.handleDelete} />
      </>
    );
  }
}
