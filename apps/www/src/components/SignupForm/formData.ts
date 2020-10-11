import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().trim().required('This field is required.'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email.')
    .required('This field is required.'),
  password: yup.string().trim().required('This field is required.'),
  confirmPassword: yup
    .string()
    .trim()
    .required('This field is required.')
    .oneOf([yup.ref('password'), null], 'Passwords need to match.')
});

export const fields = [
  {
    type: 'text',
    name: 'name',
    label: 'Name',
    placeholder: 'Your name',
    autocomplete: 'name'
  },
  {
    type: 'email',
    name: 'email',
    label: 'Email',
    placeholder: 'Your email',
    autocomplete: 'email'
  },
  {
    type: 'password',
    name: 'password',
    label: 'Password',
    placeholder: 'Your password',
    autocomplete: 'off'
  },
  {
    type: 'password',
    name: 'confirmPassword',
    label: 'Confirm password',
    placeholder: 'Confirm password',
    autocomplete: 'off'
  }
];
