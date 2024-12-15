import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ImCheckmark } from 'react-icons/im';
import { Formik, Form } from 'formik';
import { createClient, createBooking } from '../../api';
import { BOOKING_FORM_VALIDATION } from '../../utils/validationSchema';
import { sendReceipt } from '../../api';
import ValidatedField from '../../components/ValidatedField';
import styles from './Booking.module.sass';

function Booking () {
  const location = useLocation();
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const tour = location.state?.tour;

  if (!tour) {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.noTourSelected}>No tour selected</div>
          <Link className={styles.toursLink} to='/tours'>
            Select tour
          </Link>
        </div>
      </>
    );
  }

  const handleWrapperClick = () => {
    setIsRegistering(true);
  };

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const clientResponse = await createClient({
        CL_FirstName: values.firstName,
        CL_LastName: values.lastName,
        CL_DateOfBirth: values.dateOfBirth,
        CL_Phone: values.phone,
        CL_Email: values.email,
        CL_Address: values.address,
      });

      const client = clientResponse.data.data;

      const bookingData = {
        BK_Date: new Date().toISOString(),
        BK_Status: 'pending',
        BK_TotalAmount: tour.TR_Price,
        BK_CL_ID: client.CL_ID,
        BK_TR_ID: tour.TR_ID,
      };

      await createBooking({
        clientData: {
          CL_FirstName: values.firstName,
          CL_LastName: values.lastName,
          CL_DateOfBirth: values.dateOfBirth,
          CL_Phone: values.phone,
          CL_Email: values.email,
          CL_Address: values.address,
        },
        bookingData: bookingData,
      });

      const receiptData = {
        email: values.email,
        tourName: tour.TR_Name,
        totalAmount: tour.TR_Price,
        bookingDate: bookingData.BK_Date,
      };

      await sendReceipt(receiptData);

      resetForm();
      setShowConfirmation(true);
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while processing your order.');
    } finally {
      setSubmitting(false);
    }
  };

  if (showConfirmation) {
    return (
      <div className={styles.confirmationWrapper}>
        <div className={styles.confirmationIcon}>
          <ImCheckmark />
        </div>
        <p className={styles.motivationPhrase}>
          Life is an adventure. Thank you for starting it with us!
        </p>
        <p className={styles.confirmationMessage}>
          Your order has been processed, expect a call within the day.
        </p>
        <NavLink className={styles.homeLink} to='/'>
          <button className={styles.homeButton}>Home page</button>
        </NavLink>
      </div>
    );
  }

  return (
    <div className={styles.bookingWraper} onClick={handleWrapperClick}>
      <div className={styles.infoWrapper}>
        <h1 className={styles.title}>{tour.TR_Name}</h1>
        <p className={styles.price}>Price: ${tour.TR_Price}</p>
        <p className={styles.date}>
          Dates: {tour.formattedStartDate} - {tour.formattedEndDate}
        </p>
        <p className={styles.totalDays}>Total Days: {tour.totalDays}</p>
      </div>
      {isRegistering && (
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            phone: '',
            email: '',
            address: '',
          }}
          validationSchema={BOOKING_FORM_VALIDATION}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={styles.registrationForm}>
              <h2>Register for {tour.TR_Name}</h2>

              <ValidatedField
                name='firstName'
                type='text'
                placeholder='First Name'
              />

              <ValidatedField
                name='lastName'
                type='text'
                placeholder='Last Name'
              />

              <ValidatedField name='dateOfBirth' type='date' />

              <ValidatedField name='phone' type='tel' placeholder='Phone' />

              <ValidatedField name='email' type='email' placeholder='Email' />

              <ValidatedField
                name='address'
                type='text'
                placeholder='Address'
              />

              <button
                type='submit'
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </Form>
          )}
        </Formik>
      )}

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

export default Booking;
