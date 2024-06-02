import * as Yup from 'yup'

export const LoginValidation = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Email must be a valid email address'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must have a minimum of 6 characters'),
})



export const SignUpValidation = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Email must be a valid email address'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must have a minimum of 6 characters'),
})
