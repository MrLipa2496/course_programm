import React, { useEffect, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { connect } from 'react-redux';
import { getHotelsThunk } from './../../store/slices/hotelsSlice';
import styles from './Hotels.module.sass';
import defImg from './../../../img/in-process-img.png';

function Hotels ({ hotels, totalHotels, isFetching, error, getHotels }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [displayHotels, setDisplayHotels] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    getHotels({ page, limit });
  }, [getHotels, page, limit]);

  useEffect(() => {
    const newFilteredHotels = hotels.filter(hotel =>
      hotel.HT_Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHotels(newFilteredHotels);
  }, [searchTerm, hotels]);

  useEffect(() => {
    setDisplayHotels(prevDisplayHotels => {
      const uniqueHotels = filteredHotels.filter(
        hotel =>
          !prevDisplayHotels.some(dispHotel => dispHotel.HT_ID === hotel.HT_ID)
      );
      return [...prevDisplayHotels, ...uniqueHotels];
    });
  }, [filteredHotels]);

  const handleShowMore = () => {
    if (displayHotels.length < totalHotels) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <>
      <div className={styles.headerWrapper}>
        <h2 className={styles.hotelsTitle}>Explore Top Hotels</h2>
        <p className={styles.hotelsSubTitle}>
          Find the perfect place for your stay
        </p>
      </div>
      <div className={styles.hotelsWrapper}>
        {isFetching && <BeatLoader loading={isFetching} />}
        {error && <div>{error.message || '!!!ERROR!!!'}</div>}
        {displayHotels.length === 0 && !isFetching && (
          <p>No hotels available.</p>
        )}
        <div className={styles.hotelCards}>
          {displayHotels.map(hotel => (
            <div key={hotel.HT_ID} className={styles.cardWrapper}>
              <img
                className={styles.hotelImg}
                src={
                  hotel.HT_Img
                    ? `http://localhost:5001/images/${hotel.HT_Img}`
                    : defImg
                }
                alt={hotel.HT_Name}
              />
              <div className={styles.infoWrapper}>
                <h3 className={styles.hotelName}>{hotel.HT_Name}</h3>
                <p className={styles.hotelAddress}>{hotel.HT_Address}</p>
                <p className={styles.hotelAddress}>{hotel.HT_Email}</p>
                <p className={styles.hotelAddress}>{hotel.HT_Phone}</p>
                <p className={styles.hotelCategory}>{hotel.HT_Category}</p>
                <p className={styles.hotelStars}>
                  {`Stars: ${hotel.HT_Stars}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {displayHotels.length < totalHotels && (
        <div className={styles.moreBtnContainer}>
          <button onClick={handleShowMore} className={styles.showMoreBtn}>
            Show more
          </button>
        </div>
      )}

      {displayHotels.length >= totalHotels && (
        <p className={styles.noMoreHotels}>No more hotels to load.</p>
      )}
    </>
  );
}

const mapStateToProps = ({ hotelsData }) => ({
  isFetching: hotelsData.isFetching,
  error: hotelsData.error,
  hotels: hotelsData.hotels,
  totalHotels: hotelsData.totalHotels,
});

const mapDispatchToProps = dispatch => ({
  getHotels: params => dispatch(getHotelsThunk(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Hotels);
