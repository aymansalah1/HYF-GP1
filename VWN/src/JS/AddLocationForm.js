import Formsy, { withFormsy } from 'formsy-react';
import React, { Component } from 'react';
import InputComponent from './InputComponent.js'
import Observable from './Observable.js';
import Map from './Map.js';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';

class AddLocationForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      loading: false,
      finished: false,
      stepIndex: 0,
      ContactDetails: {}
    };
    Observable.subscribe(this.validateForm)
  }
  dummyAsync = (cb) => {
    this.setState({ loading: true }, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      }));
    }
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  };

  getStepContent = (stepIndex) => {
    const contentStyle = { margin: '0 16px', overflow: 'hidden' };
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <Map name="svgmap" value={null} svgPs={this.props.svgPs} isClickable={true} inAddMode={true} />
            <div style={{ marginTop: 24, marginBottom: 12 }}>
              <RaisedButton
                label={'Next'}
                primary={true}
                disabled={!this.state.selectedregion}
                onClick={this.handleNext}
              />
            </div>
          </div>

        );
      case 1:
        return (
          <div>
            <InputComponent
              name="phone"
              value=''
              title="phone number"
              type="text"
              placeholder="Enter your Company Phone Number"
              validations={{
                maxLength: 10
              }}
              validationErrors={{
                maxLength: 'Enter Valid Phone Number max 10 dg'
              }}
              required />
            <InputComponent
              name="email"
              value=''
              title="Email"
              type="text"
              placeholder="Tell about your Company."
              validations={{
                isEmail: true
              }}
              validationErrors={{
                isEmail: 'Enter a valid email'
              }}
              required />
            <InputComponent
              name="web"
              value=''
              title="Company Website Url"
              type="text"
              placeholder="Put your company website url '.png or .jpg'."
              validationErrors={{
                isUrl: 'Enter valid url',
              }}
              validations={{
                isUrl: true,
              }}
              required />
            <InputComponent
              name="post_code"
              value=''
              title="Post Code"
              type="text"
              placeholder="Put your company address post code."
              validationErrors={{
                matchRegexp: 'Enter valid post code',
              }}
              validations={{
                matchRegexp: /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/,
              }}
              required />
            <InputComponent
              name="city"
              value=''
              title="City"
              type="text"
              placeholder="City"
              validationErrors={{
                isWords: 'Enter Valid city name',
              }}
              validations={{
                isWords: true,
              }}
              required />
            <InputComponent
              name="house_number"
              value=''
              title="house number"
              type="text"
              placeholder="house number"
              validationErrors={{
                matchRegexp: 'Enter Valid house Number',
              }}
              validations={{
                matchRegexp: /^[1-9]\d*$/,
              }}
              required />
            <div style={{ marginTop: 24, marginBottom: 12 }}>
              <FlatButton
                label="Back"
                disabled={stepIndex === 0}
                onClick={this.handlePrev}
                style={{ marginRight: 12 }}
              />
              <RaisedButton
                label={'Add Location'}
                primary={true}
                disabled={!this.state.isValidForm}
                onClick={() => {
                  let id = Date.now()
                  let model = this.refs.form.getModel()
                  model.id = id
                  this.addConact(model)
                  this.handleNext()
                  Observable.setContactRegion(null)
                  Observable.addContacts(model)
                }}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div style={contentStyle}>
            <RaisedButton
              label={'Add More Contacts'}
              primary={true}
              disabled={!this.state.isValidForm}
              onClick={(event) => {
                event.preventDefault();
                this.setState({ stepIndex: 0, finished: false });
              }}
            />
          </div>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  renderContent() {
    const { stepIndex } = this.state;
    const contentStyle = { margin: '0 16px', overflow: 'hidden' };
    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
      </div>
    );
  }

  validateForm = (action, model) => {
    if (model) {
      let currentModel = this.refs.form.getModel();
      this.setState({ isValidForm: (currentModel.city !== "" && currentModel.email !== "" && currentModel.house_number !== "" && currentModel.phone !== "" && currentModel.post_code !== "" && currentModel.web !== "") })
    }

  }
  componentDidMount() {
    const value = this.props.value || {};
    this.props.setValue(value);
    this.setState({
      value: value, cmp: this.props.cmp || this.state.cmp,
      selectedregion: this.selectedRegionhandeller()
    });
    Observable.subscribe(this.reflectSelectedRegion)
  }
  componentWillUnmount() {
    Observable.unsubscribe(this.reflectSelectedRegion);
  }
  reflectSelectedRegion = (action) => {
    if (action === 'reflectSelectedRegion') {
      this.setState({
        selectedregion: this.selectedRegionhandeller(),
      });
    }
  }
  selectedRegionhandeller = () => {
    return Observable.getContactRegion();
  }
  resetForm = () => {
    this.refs.form.reset();
  }
  addConact = (model) => {
    let selectedregion = Observable.getContactRegion()
    let id = Date.now()
    var modelWithRegion = Object.assign(model, { Region: selectedregion ? selectedregion : null })
    let x = {}
    x[id] = modelWithRegion
    let oldvalue = this.props.getValue()
    console.log(Object.assign({}, x, oldvalue))
    this.props.setValue(Object.assign({}, x, oldvalue))
    alert(Object.assign({}, x, oldvalue))
  }
  enableButton = () => {
    this.setState({ canSubmit: true });
  }
  disableButton = () => {
    this.setState({ canSubmit: false });
  }
  render() {
    const { loading, stepIndex } = this.state;

    return (
      <Formsy ref="form" onChange={this.validateForm.bind(this, 'contactRegion')}  onValid={this.enableButton} onInvalid={this.disableButton} className="addNewOrg">
        <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Select Company Region</StepLabel>
            </Step>
            <Step>
              <StepLabel>Add Company Contact Info</StepLabel>
            </Step>
            <Step>
              <StepLabel>More Contact Info!!</StepLabel>
            </Step>
          </Stepper>
          <ExpandTransition loading={loading} open={true}>
            {this.renderContent()}
          </ExpandTransition>
        </div>
      </Formsy>
    );
  }
}

export default withFormsy(AddLocationForm) 