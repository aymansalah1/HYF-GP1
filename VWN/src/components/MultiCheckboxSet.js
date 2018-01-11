import React from 'react';
import { withFormsy } from 'formsy-react';
import Observable from '../JS/Observable.js';
import Checkbox from 'material-ui/Checkbox';
const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

function contains(container, item, cmp) {
  for (const it of container) {
    if (cmp(it, item)) {
      return true;
    }
  }
  return false;
}

class MyRadioGroup extends React.Component {
  state = { value: [], cmp: (a, b) => a === b };

  componentDidMount() {
    const value = this.props.value || [];
    this.props.setValue(value);
    this.setState({ value: value, cmp: this.props.cmp || this.state.cmp });
    Observable.subscribe(this.clearNewOrgTags)
  }

  clearNewOrgTags = (action) => {
    if ('clearNewOrgTags') {
      // console.log("checkrerender","clearNewOrgTags")
      // this.setState({
      //   value: []
      // })
    }
  }
  changeValue = (event, value) => {
    const checked = value.currentTarget.checked;

    let newValue = [];
    if (checked) {
      newValue = this.state.value.concat(event);
    } else {
      newValue = this.state.value.filter(it => !this.state.cmp(it, event));
    }

    this.props.setValue(newValue);
    this.setState({ value: newValue });
  }

  render() {
    const className = 'form-group' + (this.props.className || ' ') +
      (this.props.showRequired() ? 'required' : this.props.showError() ? 'error' : '');
    const errorMessage = this.props.getErrorMessage();

    const { name, title, items } = this.props;
console.log("checkrerender")
    return (
      <div className={className}>
        <label htmlFor={name}>{title}</label>
        <div className={this.props.className}>
          {Object.keys(items).map((item, i) => (
            <div key={i} name={name} className="addOrgTagsItem">
              <Checkbox
                label={items[item]}
                checked={contains(this.state.value, item, this.state.cmp)}
                onCheck={this.changeValue.bind(this, item)}
                style={styles.checkbox}
                onChange={this.changeValue.bind(this, item)}
                value={this.props.getValue()}
                name={name}
              />
            </div>
          ))
          }
        </div>
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }

}

export default withFormsy(MyRadioGroup);
