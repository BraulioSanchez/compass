'use strict';

const React = require('react');

/**
 * Component for the edit document button.
 */
class EditDocumentButton extends React.Component {

  /**
   * The component constructor.
   *
   * @param {Object} props - The properties.
   */
  constructor(props) {
    super(props);
  }

  /**
   * Render the button.
   *
   * @returns {Component} The button component.
   */
  render() {
    return (
      <button type='button' className="btn btn-default btn-xs" onClick={this.props.handler} title='Edit Document'>
        <i className="fa fa-pencil" aria-hidden="true"></i>
      </button>
    );
  }

  /**
   * Never needs to re-render.
   */
  shouldComponentUpdate() {
    return false;
  }
}

EditDocumentButton.displayName = 'EditDocumentButton';

module.exports = EditDocumentButton;
