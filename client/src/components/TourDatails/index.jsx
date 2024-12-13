import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { getTourDetails } from '../../api';
import defImg from './../../../img/in-process-img.png';
import styles from './TourDetails.module.sass';

function TourDetails () {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const response = await getTourDetails(tourId);
        const tourData = response.data.data;

        if (tourData.TR_Tags && typeof tourData.TR_Tags === 'string') {
          try {
            tourData.TR_Tags = JSON.parse(tourData.TR_Tags.replace(/'/g, '"'));
          } catch (e) {
            console.error('Failed to parse TR_Tags:', e);
            tourData.TR_Tags = [];
          }
        } else if (!Array.isArray(tourData.TR_Tags)) {
          tourData.TR_Tags = [];
        }

        const formatDate = dateString => {
          const date = new Date(dateString);
          const options = { day: '2-digit', month: 'long', year: 'numeric' };
          return date.toLocaleDateString('en-US', options);
        };

        const startDate = new Date(tourData.TR_StartDate);
        const endDate = new Date(tourData.TR_EndDate);
        const totalDays =
          Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

        tourData.formattedStartDate = formatDate(tourData.TR_StartDate);
        tourData.formattedEndDate = formatDate(tourData.TR_EndDate);
        tourData.totalDays = totalDays;

        setTour(tourData);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch tour details');
        setLoading(false);
      }
    };

    fetchTourDetails();
  }, [tourId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleBookingClick = () => {
    navigate('/booking', { state: { tour } });
  };

  const handleImageClick = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.tourDetails}>
      <h2 className={styles.name}>{tour.TR_Name}</h2>
      <div className={styles.mainInfoContainer}>
        <div className={styles.imageContainer}>
          <img
            src={
              tour.TR_Img
                ? `http://localhost:5001/images/${tour.TR_Img}`
                : defImg
            }
            alt={tour.TR_Name}
            className={styles.image}
            onClick={handleImageClick}
          />
        </div>
        <div className={styles.info}>
          <p className={styles.tourType}>{tour.TR_TourType}</p>
          <p className={styles.price}>Price: ${tour.TR_Price}</p>
          <p className={styles.startDate}>
            Start Date: {tour.formattedStartDate}
          </p>
          <p className={styles.endDate}>End Date: {tour.formattedEndDate}</p>
          <p className={styles.days}>Total Days: {tour.totalDays}</p>

          <button className={styles.bookButton} onClick={handleBookingClick}>
            Booking
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modal} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={e => e.stopPropagation()}
          >
            <img
              src={
                tour.TR_Img
                  ? `http://localhost:5001/images/${tour.TR_Img}`
                  : defImg
              }
              alt={tour.TR_Name}
              className={styles.modalImage}
            />
            <button className={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      <div className={styles.tags}>
        {Array.isArray(tour.TR_Tags) && tour.TR_Tags.length > 0 ? (
          tour.TR_Tags.map((tag, index) => (
            <p key={index} className={styles.tag}>
              {tag}
            </p>
          ))
        ) : (
          <p>No tags available</p>
        )}
      </div>
      <div className={styles.fullInfo}>
        <h3 className={styles.fullInfoTitle}>Information about tour:</h3>
        <p className={styles.fullInfoContent}>{tour.TR_FullInfo}</p>
      </div>
      <NavLink to='/tours'>
        <button className={styles.findAnotherTour}>Find another tour</button>
      </NavLink>
    </div>
  );
}

export default TourDetails;
