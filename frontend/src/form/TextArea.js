import * as React from 'react';
import * as PropTypes from 'prop-types';

class TextArea extends React.Component {
  render() {
    let values = this.context.values;
    let propName = this.props.propName;
    let label = this.props.label;
    let firePropChange = this.context.firePropChange;
    return (
      <textarea
        value={values[propName]}
        onChange={event => firePropChange(propName, event.target.value)}/>
    );
  }
}

TextArea.contextTypes = {
  values: PropTypes.object,
  firePropChange: PropTypes.func
};

export default TextArea;
