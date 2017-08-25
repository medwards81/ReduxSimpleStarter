import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Register extends Component {

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
        <fieldset className={className}>
          <label>{field.label}</label>
          <input
            type={field.type}
            className="form-control"
            {...field.input}
          />
          <div className="text-help">
              {touched ? error : ''}
          </div>
        </fieldset>
    );
  }

  handleFormSubmit({ email, password }) {
    this.props.registerUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops! {this.props.errorMessage}</strong>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          label="Email:"
          name="email"
          type="input"
          component={this.renderField}
        />
        <Field
          label="Password:"
          name="password"
          type="password"
          component={this.renderField}
        />
        <Field
          label="Confirm password:"
          name="passwordConfirm"
          type="password"
          component={this.renderField}
        />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Register</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  // validate the inputs from 'values' object
  // errors property names mush match field.name
  if (!values.email) {
      errors.email = "Enter an email";
  }

  if (!values.password) {
      errors.password = "Enter a password";
  }

  if (!values.passwordConfirm) {
      errors.passwordConfirm = "Please confirm your password";
  }

  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }

  // an empty errors obj indicates a valid form submission
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error}
}

export default reduxForm({
  form: 'register',
  validate
})(
    connect(mapStateToProps, actions)(Register)
);
