import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TOUR_SEARCH_FORM_VALIDATION } from '../../../utils/validationSchema';
import ValidatedField from '../../../components/ValidatedField';
import styles from './TourSearch.module.sass';

const TourSearch = () => {
  const initialValues = {
    destination: '',
    tourType: '',
    startDate: '',
    endDate: '',
    budget: '',
    transport: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    resetForm();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.tourFilterTitle}>Tour Search</h2>
      <div className={styles.formWrapper}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={TOUR_SEARCH_FORM_VALIDATION}
        >
          <Form className={styles.form}>
            <label className={styles.tourFilterLabel}>
              <span className={styles.tourFilterSpan}>Destination</span>
              <ValidatedField
                name='destination'
                type='text'
                placeholder='Enter country or city'
              />
            </label>

            <label className={styles.tourFilterLabel}>
              <span className={styles.tourFilterSpan}>Tour Type</span>
              <ValidatedField name='tourType' as='select'>
                <option value=''>Select a tour type</option>
                <option value='leisure'>Leisure</option>
                <option value='excursion'>Excursion</option>
                <option value='adventure'>Adventure trip</option>
                <option value='business'>Business trip</option>
              </ValidatedField>
            </label>

            <label className={styles.tourFilterLabel}>
              <span className={styles.tourFilterSpan}>Start Date</span>
              <ValidatedField
                name='startDate'
                type='date'
                className={styles.tourFilterInput}
              />
            </label>

            <label className={styles.tourFilterLabel}>
              <span className={styles.tourFilterSpan}>End Date</span>
              <ValidatedField
                name='endDate'
                type='date'
                className={styles.tourFilterInput}
              />
            </label>

            <label className={styles.tourFilterLabel}>
              <span className={styles.tourFilterSpan}>Budget</span>
              <ValidatedField
                name='budget'
                type='text'
                placeholder='Enter budget'
                className={styles.tourFilterInput}
              />
            </label>

            <button className={styles.tourFilterButton} type='submit'>
              Find Tours
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default TourSearch;
