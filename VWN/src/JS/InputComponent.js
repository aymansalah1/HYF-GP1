import { withFormsy } from 'formsy-react';
import React from 'react';
import TextField from 'material-ui/TextField';
import { orange500, blue500 } from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import PasswordField from 'material-ui-password-field'

const styles = {
  password:{fontSize: '16px',
   lineHeight: '24px', width: '256px', height: '72px', display: 'inline-block', position: 'relative', backgroundColor: 'transparent',
    fontFamily: 'Roboto, sans-serif', transition: 'height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', cursor: 'auto'},
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
    textAllign: 'left'
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};

class InputComponent extends React.Component {
  changeValue = (event) => {
    if (this.props.onChange) this.props.onChange(this.props.name, event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value'])
    this.props.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
    event.preventDefault();
  }


  render = () => {
    const className = 'form-group' + (this.props.className || ' ') +
      (this.props.isRequired() ? 'required' : this.isError() ? 'error' : '');
    const errorMessage = this.props.getErrorMessage();

    let input;
    switch (this.props.type) {
      case 'textarea':
        input = <TextField style={{ textAlign: 'left' }}
          floatingLabelText={this.props.title}
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          multiLine={true}
          rows={4}
          onChange={this.changeValue}
          value={this.props.getValue()}
          name={this.props.name}
          hintText={this.props.placeholder}          
          
        />
        break;
      case 'checkbox':
        input = <Checkbox
          label={this.props.title} {...this.props.isRequired() ? '*' : null}
          checked={this.props.getValue()}
          onCheck={this.changeValue}
          style={styles.checkbox}
          onChange={this.changeValue}
          value={this.props.getValue()}
          name={this.props.name}
        />
        break;
      case 'password':
        input = <PasswordField
        style={styles.password}
          floatingLabelText={this.props.title}
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          onChange={this.changeValue}
          value={this.props.getValue()}
          name={this.props.name}
          hintText={this.props.placeholder}
          />
        break;
      default:
        input = <TextField
          floatingLabelText={this.props.title} {...this.props.isRequired() ? '*' : null}
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          onChange={this.changeValue}
          value={this.props.getValue()}
          name={this.props.name}
          hintText={this.props.placeholder}          
        />
        break;
    }
    // const Input1 = this.props.type === 'textarea' ?
    //   <textarea
    //     name={this.props.name}
    //     multiline={"true"}
    //     numberoflines={10}
    //     style={{ height: 200 }}
    //     onChange={this.changeValue}
    //     value={this.props.getValue()}
    //     placeholder={this.props.placeholder}
    //   />
    //   : <input
    //     type={this.props.type || 'text'}
    //     name={this.props.name}
    //     onChange={this.changeValue}
    //     value={this.props.getValue()}
    //     placeholder={this.props.type === 'checkbox' ? '' : this.props.placeholder}
    //     checked={this.props.type === 'checkbox' && this.props.getValue() ? 'checked' : null}
    //   />
    const show = input
    return (
      <div className={className} >
        {show}
        <span className='validation-error'>{errorMessage}</span>

      </div>
    );
  }
}
export default withFormsy(InputComponent);