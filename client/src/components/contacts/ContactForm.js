import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import PhoneFormat from "../../utils/PhoneFormat";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, updateContact, current, clearCurrent } = contactContext;

  const initialState = { name: "", email: "", phone: "", type: "personal" };

  const [contact, setContact] = useState(initialState);
  const [flag, setFlag] = useState(0);

  const getPhoneNumber = value => {
    return setContact({ ...contact, phone: value });
  };

  useEffect(() => {
    if (current) {
      setContact(current);
    } else {
      setContact(initialState);
    }
    // eslint-disable-next-line
  }, [current, contactContext]);

  const onChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    setFlag(1);
    setTimeout(() => {
      setFlag(0);
    }, 1000);
    if (current) {
      updateContact(contact);
    } else {
      addContact(contact);
    }
    setContact(initialState);
    clearCurrent();
  };

  const clearAll = () => {
    clearCurrent();
  };

  const { name, email, type } = contact;
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? "Update Contact" : "Add Contact"}</h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
        required
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <PhoneFormat phoneNumber={getPhoneNumber} clearInput={flag} />

      <h5>Contact Type</h5>
      <label htmlFor="personal">
        <input
          type="radio"
          name="type"
          value="personal"
          checked={type === "personal"}
          onChange={onChange}
        />
        Personal
      </label>
      <label htmlFor="professional">
        <input
          type="radio"
          name="type"
          value="professional"
          checked={type === "professional"}
          onChange={onChange}
        />{" "}
        Professional
      </label>
      <div>
        <input
          type="submit"
          value={current ? "Update Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button type="button" className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
