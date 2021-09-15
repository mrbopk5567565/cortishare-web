import React, { useState } from 'react';
import { TextField, FormControl, InputAdornment, IconButton } from '@material-ui/core';
import useStyles from './styles';
import { Text } from 'components'
import clsx from 'clsx';
import { Visibility } from '@material-ui/icons/';
import Images from 'config/images'

const Inputs = (props) => {
  const classes = useStyles();
  const [toggleEyes, setToggleEyes] = useState(false);
  const {
    title,
    type,
    placeholder,
    name,
    register,
    errors,
    required,
    password,
    maximum,
    minximum,
    rows,
    multiline,
    value,
    defaultValue,
    showEyes,
    placeholderDark,
    isValidatePassword,
    isValidateUserName,
    fontBig,
    handleSetError
  } = props;

  const handleClick = () => {
    setToggleEyes(!toggleEyes);
  }
  const onChange = (e) => {
    let validate = validateError(e.target.value);
    if (handleSetError && validate != true) {
      handleSetError({ name: e.target.name, error: validate })
    }
    if (handleSetError && validate == true) {
      handleSetError({ name: e.target.name, error: '' })
    }
  }

  const validateError = (value) => {
    if (name === "username" && isValidateUserName) {
      let checkEmail = /^[a-zA-Z0-9]+$/;
      if (!checkEmail.test(value)) return `Your ${name} should not contain special characters`;
    }
    if (isValidatePassword) {
      if (name === "password") {
        let regexContianerLeter = /[a-z]/i;
        let regexUpperText = /[A-Z]/;
        let regexNumber = /[0-9]/;

        if (!regexContianerLeter.test(value)) return 'Your password must contain at least one letter';
        if (!regexUpperText.test(value)) return 'Your password must contain at least one letter uppercase';
        if (!regexNumber.test(value)) return 'Your password must contain at least one digit';
      }
    }
    if (maximum && value.length > maximum) {
      return `Your ${name == 'title'? 'Board title' : name } field is more than ${maximum} characters long`
    }
    if (minximum && value.length < minximum) {
      return `Your ${name} field is less than ${minximum} characters long`
    }


    if (name === "confirmPassword") {
      return value === password.current || "The passwords do not match";
    }

    return true;
  }

  const checkLastCharacter = (text) => {
    if (text.slice(-1) === '*') {
      return text.slice(0, -1)
    }
    return text
  }

  return (
    <FormControl fullWidth classes={{ root: clsx(classes.rootFormControl, classes.container) }}>
      <Text classes={{ root: classes.label }} size="medium">{title}</Text>
      <TextField
        type={toggleEyes ? 'text' : type}
        placeholder={placeholder}
        name={name}
        value={value}
        fullWidth
        variant="filled"
        onChange={onChange}
        defaultValue={defaultValue}
        classes={{ root: clsx(classes.rootTextField) }}
        InputProps={{
          disableUnderline: true,
          classes: {
            input: clsx(classes.inputTextfield, placeholderDark && classes.inputTextfieldPlaceholderDark, fontBig && classes.fontBig),
            multiline: classes.multiline,
          },
          endAdornment: (
            showEyes && <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClick}
              >
                {!toggleEyes ? <Visibility /> : <img src={Images.icEyeClose} alt="eye-close" />}
              </IconButton>
            </InputAdornment>
          )
        }}
        rows={rows && rows}
        multiline={multiline && multiline}
        inputRef={register({
          required: required && `${checkLastCharacter(title)} field cannot be empty`,
          pattern: name === "email" &&
          {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address"
          },
          validate: value =>
            validateError(value)
        })}
      />
      { errors[`${name}`] && <Text classes={{ root: classes.textError }}>{errors[`${name}`].message}</Text>}
    </FormControl>
  );
};
export default Inputs;



