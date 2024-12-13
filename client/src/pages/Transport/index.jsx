import React, { useEffect, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import * as API from '../../api';
import styles from './Transport.module.sass';
import defImg from './../../../img/in-process-img.png';

function Transport () {
  const [transportData, setTransportData] = useState([]);
  const [displayTransport, setDisplayTransport] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchTransportData = async page => {
    try {
      setIsFetching(true);
      setIsLoading(true);
      const response = await API.getTransportations(page, 10);
      const newData = response.data.data;
      setTransportData(prevData => [...prevData, ...newData]);
      setTotal(response.data.total);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchTransportData(page);
  }, [page]);

  useEffect(() => {
    setDisplayTransport(transportData.slice(0, page * 10));
  }, [transportData, page]);

  const handleShowMore = () => {
    if (displayTransport.length < total) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <>
      <div className={styles.transportWrapper}>
        <h2 className={styles.transportTitle}>
          Available Transportation Options
        </h2>
      </div>
      {isLoading && <BeatLoader loading={isLoading} />}
      {error && <div>{error.message || 'Error loading transport data'}</div>}
      {!isLoading && displayTransport.length === 0 && (
        <p>No transport options available.</p>
      )}
      <div className={styles.transportCards}>
        {displayTransport.map(transport => (
          <div key={transport.TRP_ID} className={styles.cardWrapper}>
            <img
              className={styles.transportImg}
              src={
                transport.TRP_Img && transport.TRP_Img !== 'null'
                  ? `http://localhost:5001/api/images/${transport.TRP_Img}`
                  : defImg
              }
              alt={transport.TRP_Type}
            />
            <div className={styles.infoWrapper}>
              <h3 className={styles.carrier}>{transport.TRP_CarrierName}</h3>
              <p className={styles.type}>{transport.TRP_Type}</p>
              <p className={styles.cost}>{`Cost: $${transport.TRP_Cost}`}</p>
              <p
                className={styles.contact}
              >{`Phone: ${transport.TRP_Phone}`}</p>
              <p className={styles.email}>{`Email: ${transport.TRP_Email}`}</p>
              <button className={styles.detailsBtn}>View Details</button>
            </div>
          </div>
        ))}
      </div>

      {displayTransport.length < total && !isFetching && (
        <div className={styles.moreBtnContainer}>
          <button onClick={handleShowMore} className={styles.showMoreBtn}>
            Show more
          </button>
        </div>
      )}

      {displayTransport.length >= total && (
        <p className={styles.noMoreTransports}>
          No more transport options to load.
        </p>
      )}
    </>
  );
}

export default Transport;
