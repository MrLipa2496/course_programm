import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';
import styles from './PopularDestinations.module.sass';
import defImg from '../../../../img/in-process-img.png';
import { getPopularToursThunk } from '../../../store/slices/toursSlice';

function PopularDestinations ({ tours, isFetching, error, getPopularTours }) {
  const navigate = useNavigate();

  useEffect(() => {
    getPopularTours();
  }, [getPopularTours]);

  return (
    <div className={styles.popDesWrapper}>
      <h2 className={styles.popDesTitle}>Popular Destinations</h2>
      <BeatLoader loading={isFetching} />
      {error && <div>{error.message || '!!!ERROR!!!'}</div>}
      {tours.length === 0 && !isFetching && <p>No popular tours available.</p>}
      <div className={styles.popDesCards}>
        {tours.map(tour => (
          <div key={tour.TR_ID} className={styles.cardWrapper}>
            <img
              className={styles.tourImg}
              src={
                tour.TR_Img
                  ? `http://localhost:5001/images/${tour.TR_Img}`
                  : defImg
              }
              alt={tour.TR_Name}
            />
            <div className={styles.infoWrapper}>
              <h3 className={styles.destination}>{tour.TR_Name}</h3>
              <p className={styles.destinDescription}>{tour.TR_Description}</p>
              <p className={styles.price}>{`from $${tour.TR_Price}`}</p>
              <button
                className={styles.detailsBtn}
                onClick={() => navigate(`/tours/${tour.TR_ID}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = ({ toursData }) => ({
  isFetching: toursData.isFetching,
  error: toursData.error,
  tours: toursData.tours,
});

const mapDispatchToProps = dispatch => ({
  getPopularTours: () => dispatch(getPopularToursThunk()), // Підключення до thunk
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopularDestinations);
