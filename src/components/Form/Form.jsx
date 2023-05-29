import React, { Component } from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import ss from './Form.module.css'

class Form extends Component {
  state = {
    name: "",
    number: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
    this.props.onSubmit(name, number);
    this.reset();
  };

  reset = () => {
    this.setState({ name: "", number: "" });
  };

  render() {
    const inputNameId = nanoid();
    const inputTelId = nanoid();
    const { name, number } = this.state;
    return (
        <form className={ss.form } onSubmit={this.handleSubmit}>
        <label htmlFor={inputNameId}>
          
                <input
                    className={ss.input }
                    id={inputNameId}
                    placeholder="Name"
            onChange={this.handleChange}
            value={name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label htmlFor={inputTelId}>
          
                <input
                    className={ss.input }
            id={inputTelId}
            onChange={this.handleChange}
            value={number}
            type="tel"
                    name="number"
                    placeholder="Number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={ss.button_add }type="submit">Add contact</button>
      </form>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;