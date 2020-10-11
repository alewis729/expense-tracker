import * as yup from 'yup';

export const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email.')
    .required('This field is required.'),
  password: yup.string().trim().required('This field is required.'),
});

export const fields = [
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
];
