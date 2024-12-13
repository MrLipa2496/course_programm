import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import { connect } from 'react-redux';
import { getToursThunk } from './../../store/slices/toursSlice';
import styles from './Tours.module.sass';
import defImg from './../../../img/in-process-img.png';

function Tours ({ tours, totalTours, isFetching, error, getTours }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [filters, setFilters] = useState(location.state?.filters || {});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTours, setFilteredTours] = useState([]);
  const [displayTours, setDisplayTours] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    getTours({ page, limit });
  }, [getTours, page, limit]);

  useEffect(() => {
    setFilteredTours(
      tours.filter(tour => {
        return (
          (filters.destination
            ? tour.TR_Destination.toLowerCase().includes(
                filters.destination.toLowerCase()
              )
            : true) &&
          (filters.tourType ? tour.TR_TourType === filters.tourType : true) &&
          (filters.startDate
            ? new Date(tour.TR_StartDate) >= new Date(filters.startDate)
            : true) &&
          (filters.endDate
            ? new Date(tour.TR_EndDate) <= new Date(filters.endDate)
            : true) &&
          (filters.budget ? tour.TR_Price <= filters.budget : true)
        );
      })
    );
  }, [filters, tours]);

  useEffect(() => {
    setDisplayTours(prevDisplayTours => {
      const uniqueTours = filteredTours.filter(
        tour =>
          !prevDisplayTours.some(dispTour => dispTour.TR_ID === tour.TR_ID)
      );
      return [...prevDisplayTours, ...uniqueTours];
    });
  }, [filteredTours]);

  const handleShowMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleRemoveFilter = filterKey => {
    const newFilters = { ...filters };
    delete newFilters[filterKey];
    setFilters(newFilters);
  };

  return (
    <>
      <div className={styles.headerWrapper}>
        <h2 className={styles.toursTitle}>
          Inspiring Tours: Create Your Memories!
        </h2>
        <p className={styles.toursSubTitle}>
          Your next adventure is already waiting for you!
        </p>
      </div>

      <div className={styles.searchInputWrapper}>
        <input
          type='text'
          placeholder='Search tours...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.filtersWrapper}>
          {Object.keys(filters).map(
            key =>
              filters[key] &&
              key !== 'searchTerm' && (
                <div key={key} className={styles.filterTag}>
                  <span className={styles.filterLabel}>
                    {key}: {filters[key]}
                  </span>
                  <button
                    className={styles.removeFilterBtn}
                    onClick={() => handleRemoveFilter(key)}
                  >
                    X
                  </button>
                </div>
              )
          )}
        </div>
      </div>

      <div className={styles.toursWrapper}>
        {isFetching && <BeatLoader loading={isFetching} />}
        {error && <div>{error.message || '!!!ERROR!!!'}</div>}
        {displayTours.length === 0 && !isFetching && <p>No tours available.</p>}
        <div className={styles.tourCards}>
          {displayTours.map(tour => (
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
                <p className={styles.destinDescription}>
                  {tour.TR_Description}
                </p>
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

      {displayTours.length < filteredTours.length &&
        displayTours.length < totalTours && (
          <div className={styles.moreBtnContainer}>
            <button onClick={handleShowMore} className={styles.showMoreBtn}>
              Show more
            </button>
          </div>
        )}

      {displayTours.length >= totalTours && (
        <p className={styles.noMoreTours}>No more tours to load.</p>
      )}
    </>
  );
}

const mapStateToProps = ({ toursData }) => ({
  isFetching: toursData.isFetching,
  error: toursData.error,
  tours: toursData.tours,
  totalTours: toursData.totalTours,
});

const mapDispatchToProps = dispatch => ({
  getTours: params => dispatch(getToursThunk(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tours);
