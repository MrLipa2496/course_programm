import * as yup from 'yup';

export const TOUR_SEARCH_FORM_VALIDATION = yup.object({
  destination: yup
    .string()
    .trim()
    .min(8, 'The destination must contain at least 8 characters.')
    .max(30, 'The destination must contain no more than 30 characters.')
    .matches(/^[A-Z]/, 'Country/city must start with a capital letter')
    .required('Destination is required.'),
  tourType: yup
    .string()
    .oneOf(['leisure', 'excursion', 'business'], 'Invalid tour type')
    .required('Tour type is required.'),
  startDate: yup
    .date()
    .min(new Date(), 'Start date cannot be in the past.')
    .required('Start date is required.'),
  endDate: yup
    .date()
    .min(yup.ref('startDate'), 'End date cannot be before start date.')
    .required('End date is required.'),
  budget: yup
    .number()
    .positive('Budget must be a positive number.')
    .integer('Budget must be an integer.')
    .required('Budget is required.'),
  transport: yup
    .string()
    .oneOf(['plane', 'train', 'bus'], 'Invalid transport type')
    .required('Transport type is required.'),
  hotelClass: yup
    .string()
    .oneOf(['3-star', '4-star', '5-star'], 'Invalid hotel class')
    .required('Hotel class is required.'),
});

const NAME_VALIDATION = yup
  .string()
  .matches(
    /^[A-Z][a-z]*$/,
    'Must start with a capital letter and contain only English letters'
  )
  .required('This field is required');

export const BOOKING_FORM_VALIDATION = yup.object({
  firstName: NAME_VALIDATION,
  lastName: NAME_VALIDATION,
  dateOfBirth: yup
    .date()
    .max(new Date(), 'Date of birth must be in the past')
    .required('Date of birth is required'),
  phone: yup
    .string()
    .matches(/^\+?[0-9]{7,15}$/, 'Phone number is not valid')
    .required('Phone number is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  address: yup
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(100, 'Address must not exceed 100 characters')
    .required('Address is required'),
});
