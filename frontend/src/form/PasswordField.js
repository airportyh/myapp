import * as React from 'react';
import * as PropTypes from 'prop-types';

class PasswordField extends React.Component {
  render() {
    let values = this.context.values;
    let propName = this.props.propName;
    let label = this.props.label;
    let firePropChange = this.context.firePropChange;
    let value = values[propName] || '';
    return (
      <input
        type="password"
        value={value}
        onChange={event => firePropChange(propName, event.target.value)}/>
    );
  }
}

PasswordField.contextTypes = {
  values: PropTypes.object,
  firePropChange: PropTypes.func
};

export default PasswordField;
