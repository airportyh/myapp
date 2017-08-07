import * as React from 'react';
import * as PropTypes from 'prop-types';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props.values};
  }

  getChildContext() {
    let onChange = null;
    if (this.props.onChange) {
      onChange = () => this.props.onChange(this.state);
    }
    return {
      values: this.state,
      firePropChange: (propName, value) => {
        this.setState({
          [propName]: value
        }, onChange);
      }
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.values !== newProps.values) {
      this.setState(newProps.values);
    }
  }

  submit(evt) {
    evt.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <form
        className={this.props.className}
        onSubmit={event => this.submit(event)}>
        {this.props.children}
      </form>
    )
  }
}

Form.childContextTypes = {
  values: PropTypes.object,
  firePropChange: PropTypes.func
};

export default Form;
