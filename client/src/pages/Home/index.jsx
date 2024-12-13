import React from 'react';
import { NavLink } from 'react-router-dom';
import homeBg from '../../../img/home-bg.jpg';
import styles from './Home.module.sass';
import TourSearch from './TourSearch';
import PopularDestinations from './PopularDestinations';

function Home () {
  return (
    <>
      <div className={styles.container}>
        <img className={styles.homeBg} src={homeBg} alt={homeBg} />

        <div className={styles.titleWrapper}>
          <h1 className={styles.homeTitle}>Explore Your Dream Destinations</h1>
          <p className={styles.subTitle}>
            Discover breathtaking landscapes and cultural treasures with our
            curated travel experiences.
          </p>
          <p className={styles.bookingLink}>
            Start your journey today!
            <NavLink className={styles.link} to='/tours'>
              Search
            </NavLink>
          </p>
        </div>
      </div>

      <div>
        <TourSearch />
      </div>

      <div>
        <PopularDestinations />
      </div>
    </>
  );
}

export default Home;
