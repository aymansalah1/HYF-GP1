import Formsy, { validationRules } from 'formsy-react';
import React, { Component } from 'react';
import InputComponent from './InputComponent.js'
import MyMultiCheckboxSet from '../components/MultiCheckboxSet';
import Observable from './Observable.js';
import AddLocationForm from './AddLocationForm.js'
import ContactsContainer from './ContactsContainer.js'


export default class AddForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false, newOrgContacts: [],newOrgTags:[],
        CompanyName: "",
        CompanyDescription: "",
        CompanyLogo: ""
    };
  }
  resetForm = () => {
    this.refs.form.reset();
    Observable.notify('clearNewOrgTags')
  }
  componentDidMount() {
    this.setState({
      selectedregion: this.addedContactshandeller()
    });
    Observable.subscribe(this.reflectAddedContacts)
  }
  componentWillUnmount() {
    Observable.unsubscribe(this.reflectAddedContacts);
  }
  reflectAddedContacts = (action) => {
    if (action === 'reflectAddedContacts') {
      
      this.setState({
        newOrgContacts: this.addedContactshandeller(),
      },()=>this.enableButton());
    }
  }
  addedContactshandeller = () => {
    
    return Observable.getContacts();
  }
  submit = (data) => {
    const showMessage = (message, color) => {
      this.setState(Object.assign({}, this.state, {
        message: message,
        messageColor: color ? color : 'color_red'
      }));
      this.canSubmit = true;
    };
    delete data['ContactForm']
    data.Contacts = Observable.getContacts();

    const xhr = new XMLHttpRequest();
    xhr.open('Post', `${this.props.serverLink}add`, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          showMessage('The new organization has been successfully added!', 'color_green');
        }
        else if (xhr.status === 500) {
          showMessage(
            `The server encountered an internal error or misconfiguration
                    and was unable to complete your request!`
          );
        }
      }
    };
    xhr.send(JSON.stringify(data));
  }
  enableButton = () => {
    this.setState({ canSubmit: this.refs.form.state.isValid&& this.state.newOrgContacts.length>0});
  }
  disableButton = () => {
    this.setState({ canSubmit: false });
  }
  
  onFieldChange=(fieldName,value)=>{
    let CurrentState=this.state;
    CurrentState[fieldName]=value
    this.setState({CurrentState});
  }
  render() {
    return (
      <Formsy ref="form" onSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="addNewOrg" >
        <InputComponent
          name="CompanyName"
          title="Company Name"
          type="text"
          placeholder="Enter your Company Name"
          value={this.state.CompanyName}
          onChange={this.onFieldChange}
          validations={{
            maxLength: 50
          }}
          validationErrors={{
            maxLength: 'You can not type in more than 50 characters'
          }}
          required />
        <InputComponent
          name="CompanyDescription"
          value={this.state.CompanyDescription}
          title="Company Description"
          type="textarea"
          placeholder="Tell about your Company."
          onChange={this.onFieldChange}
          validations={{
            maxLength: 500
          }}
          validationErrors={{
            maxLength: 'You can not type in more than 500 characters'
          }}
          required />
        <InputComponent
          name="CompanyLogo"
          value={this.state.CompanyLogo}
          title="Company Logo"
          type="text"
          placeholder="Put your Logo URL '.png or .jpg'."
          validationErrors={{
            matchRegexp: 'Enter Valid image Extension ex:gif|jpg|jpeg|png',
          }}
          onChange={this.onFieldChange}
          validations={{
            matchRegexp: /\.(gif|jpg|jpeg|png)$/,
          }}
          required />
        <MyMultiCheckboxSet
          name="Tags"
          title="Tags"
          value={this.state.newOrgTags}
          className='addOrgTags'
          cmp={(a, b) => JSON.stringify(a) === JSON.stringify(b)}
          items={
            {
              "1": "Computer",
              "2": "Education",
              "3": "Music",
              "4": "Social support",
              "5": "Language",
              "6": "Work",
              "7": "News",
              "8": "Municipalities",
              "9": "Legal assistance",
              "10": "Helth",
              "11": "Food",
              "12": "Culture"
            }
          }
          validations={{
            myCustomIsnotEmptyValidation:  (values, value)=> {

              this.setState({newOrgTags:value})
              return value.length ? true : false; // You can return an error
            },
          }}
        />
        <AddLocationForm name="ContactForm" svgPs={this.props.svgPs} extended />
        <ContactsContainer contacts={this.state.newOrgContacts} isRemovable={true} />
        <div className="buttons">
          <button type="reset" onClick={this.resetForm}>Reset</button>
          <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
        </div>

      </Formsy>
    );
  }
}
