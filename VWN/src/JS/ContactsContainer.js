import React, { Component } from 'react';
import ContactDetails from './ContactDetails.js'
import '../CSS/OrgContainer.css';


import Observable from './Observable';

export default class ContactsContainer extends Component {


    render = () => {
        const contacts = this.props.contacts;
        const svg = this.props.svg;
        return <div className="contactsContainer">
            {contacts.map((contact, index) =>
                <ContactDetails
                    key={index}
                    contact={contact}
                    svg={svg}
                    isRemovable={this.props.isRemovable}
                    onRemove={Observable.deleteContacts.bind(this, contact.id)}
                />
            )}

        </div>
    }
}
