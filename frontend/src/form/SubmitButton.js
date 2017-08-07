import * as React from 'react';

export default props => (
  <button
    type="submit"
    className={props.className}>
      {props.children}
    </button>
);
