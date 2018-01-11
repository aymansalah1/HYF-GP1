import Formsy from 'formsy-react';
import React, { Component } from 'react';
import InputComponent from './InputComponent.js'
import MyMultiCheckboxSet from '../components/MultiCheckboxSet';
import Observable from './Observable.js';
import AddLocationForm from './AddLocationForm.js'
import '../CSS/Add.css';
import ContactsContainer from './ContactsContainer.js'
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { darkBlack } from 'material-ui/styles/colors';

const getStyles = () => {
  return {
    root: {
      width: '100%',
      maxWidth: 700,
      margin: 'auto',
    },
    content: {
      margin: '0 16px',
    },
    actions: {
      
    },
    backButton: {
      marginRight: 12,
    },
  };
};

export default class AddForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false, newOrgContacts: [], newOrgTags: [],
      CompanyName: "",
      CompanyDescription: "",
      CompanyLogo: "",
      stepIndex: 0,
      visited: [],
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
  componentDidUnmount() {
    Observable.unsubscribe(this.reflectAddedContacts);
  }
  reflectAddedContacts = (action) => {
    if (action === 'reflectAddedContacts') {

      this.setState({
        newOrgContacts: this.addedContactshandeller(),
      }, () => this.enableButton());
    }
  }
  addedContactshandeller = () => {

    return Observable.getContacts();
  }
  requestAdd = (data) => {
    if(this.state.canSubmit){
      console.log("a7aa")
    let newOrgObj={ CompanyName:this.state.CompanyName,
    CompanyDescription: this.state.CompanyDescription,
    CompanyLogo:this.state.CompanyLogo,
    Tags:this.state.newOrgTags,
    Contacts:this.state.newOrgContacts }
  

    const showMessage = (message, color) => {
      this.setState(Object.assign({}, this.state, {
        message: message,
        messageColor: color ? color : 'color_red'
      }));
      this.canSubmit = true;
    };
    const xhr = new XMLHttpRequest();
    xhr.open('Post', `${this.props.serverLink}add`, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.setState
        }
        else if (xhr.status === 500) {
          showMessage(
            `The server encountered an internal error or misconfiguration
                      and was unable to complete your request!`
          );
        }
      }
    };
    xhr.send(JSON.stringify(newOrgObj));
    }
  }

  enableButton = () => {

    const isValid=this.state.newOrgContacts.length > 0&&
    this.state.newOrgTags.length>0&&this.state.CompanyName!==''&&this.state.CompanyDescription!==''
    &&this.state.CompanyLogo!=''
    this.setState({ canSubmit:isValid });
  }
  disableButton = () => {
    this.setState({ canSubmit: false });
  }

  onFieldChange = (fieldName, value) => {
    let CurrentState = this.state;
    CurrentState[fieldName] = value
    this.setState({ CurrentState });
  }
  handleNext = () => {
    const { stepIndex } = this.state;
    if (stepIndex < 2) {
      this.setState({ stepIndex: stepIndex + 1 });
    }
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  getStepContent(stepIndex) {
    const styles = getStyles();
    switch (stepIndex) {
      case 0:
        return (
          <div>
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
          </div>);
      case 1:
        return (<div>
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
              myCustomIsnotEmptyValidation: (values, value) => {

                this.setState({ newOrgTags: value }, () => { console.log(this.state) })
                return value.length ? true : false; // You can return an error
              },
            }}
          />
        </div>);
      case 2:
        return (<div>
          <AddLocationForm name="ContactForm" svgPs={this.props.svgPs} extended />
          <ContactsContainer contacts={this.state.newOrgContacts} isRemovable={true} />
          <div style={{marginTop: 12,
      display:this.state.canSubmit?'block':'none'}}>
                <RaisedButton
                  label="Submit Your Organization"
                  primary={true}
                  onClick={()=>{console.log('a7teen');this.requestAdd()}}
                  style={{ display: this.state.canSubmit ? 'block' : 'none' }}
                />
              </div>
        </div>);
      default:
        return 'Click a step to get started.';
    }
  }
  render = () => {
    const { stepIndex, visited } = this.state;
    const styles = getStyles();
    return (
      <div className="aDDFORM">

        <Formsy ref="form"  onValid={this.enableButton} onInvalid={this.disableButton} className="addNewOrg" >
          <Stepper linear={false}>
            <Step completed={visited.indexOf(0) !== -1} active={stepIndex === 0}>
              <StepButton onClick={() => this.setState({ stepIndex: 0 })}>
                Add Organization
            </StepButton>
            </Step>
            <Step completed={visited.indexOf(1) !== -1} active={stepIndex === 1}>
              <StepButton onClick={() => this.setState({ stepIndex: 1 })}>
                Select Organization Category
            </StepButton>
            </Step>
            <Step completed={visited.indexOf(2) !== -1} active={stepIndex === 2}>
              <StepButton onClick={() => this.setState({ stepIndex: 2 })}>
                Add Organization Contact Details
            </StepButton>
            </Step>
          </Stepper>
          <div style={styles.content}>
            {this.getStepContent(stepIndex)}
            
          </div>
        </Formsy>
      </div >
    );
  }
}
