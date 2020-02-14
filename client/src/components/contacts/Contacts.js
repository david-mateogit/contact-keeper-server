import React, { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";
import Spinner from "../layout/Spinner";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { getContacts, contacts, filtered, loading } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts?.length === 0 && !loading) {
    return <h4>Please add a contact.</h4>;
  }

  return (
    <>
      {" "}
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {!filtered
            ? contacts?.map(contact => {
                return (
                  <CSSTransition key={contact._id} timeout={500} classNames="item">
                    <ContactItem contact={contact} />
                  </CSSTransition>
                );
              })
            : filtered.map(contact => {
                return (
                  <CSSTransition key={contact._id} timeout={500} classNames="item">
                    <ContactItem contact={contact} />
                  </CSSTransition>
                );
              })}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Contacts;
