import React from 'react';
import styles from './Contacts.module.sass';
import directorPhoto from './../../../img/director-photo.jpg'; // Додайте фото директора до папки зображень

function Contacts () {
  return (
    <div className={styles.contactsContainer}>
      <div className={styles.directorSection}>
        <div className={styles.directorPhotoWrapper}>
          <img
            src={directorPhoto}
            alt='Director'
            className={styles.directorPhoto}
          />
        </div>
        <div className={styles.directorInfo}>
          <h2 className={styles.directorName}>Oleksandr Lipchanskyi</h2>
          <p className={styles.directorTitle}>CEO & Founder</p>
          <div className={styles.directorDescription}>
            <ul className={styles.directorDetails}>
              <li className={styles.li}>
                Education: Graduated with honors from the University of
                Cambridge.
              </li>
              <li className={styles.li}>
                Experience: Over 20 years in the travel industry, including
                leadership roles in multiple international companies.
              </li>
              <li className={styles.li}>
                Achievements: Successfully launched over 50 tailor-made travel
                packages for high-profile clients.
              </li>
              <li className={styles.li}>
                Awards: Awarded "Best Travel CEO" by Global Travel Leaders in
                2019.
              </li>
              <li className={styles.li}>
                Publications: Author of several articles on sustainable travel
                practices in renowned journals.
              </li>
              <li className={styles.li}>
                Languages: Fluent in English, Ukrainian, and Russian.
              </li>
              <li className={styles.li}>
                Vision: Dedicated to making travel accessible, unforgettable,
                and enriching for every individual.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className={styles.companyInfo}>
        <h3 className={styles.sectionTitle}>Company Information</h3>
        <p className={styles.companyDescription}>
          Our travel agency has been providing unforgettable travel experiences
          since 2005. We specialize in custom-made tours, unique destinations,
          and personalized travel experiences. Our mission is to make travel
          accessible and enjoyable for everyone, no matter their background or
          budget. We believe that travel is one of the best ways to broaden
          one's horizons and create lifelong memories. Our goal is to connect
          people with the world's most inspiring destinations, offering
          everything from adventurous expeditions to relaxing beach vacations.
        </p>

        <h3 className={styles.sectionTitle}>Our Mission</h3>
        <p className={styles.companyDescription}>
          Our mission is to offer exceptional travel experiences that meet and
          exceed the expectations of our clients. Whether you're looking for an
          adventurous trek through the mountains or a relaxing beach holiday, we
          work tirelessly to create the perfect itinerary tailored to your needs
          and preferences.
        </p>

        <h3 className={styles.sectionTitle}>Our Services</h3>
        <ul className={styles.companyDescription}>
          <li className={styles.serviceItem}>
            <h4 className={styles.serviceTitle}>Custom-Made Tours</h4>
            <p className={styles.serviceDescription}>
              We offer personalized travel itineraries based on your interests,
              needs, and budget.
            </p>
          </li>
          <li className={styles.serviceItem}>
            <h4 className={styles.serviceTitle}>Unique Destinations</h4>
            <p className={styles.serviceDescription}>
              We specialize in discovering hidden gems around the world,
              offering off-the-beaten-path locations for unforgettable
              experiences.
            </p>
          </li>

          <li className={styles.serviceItem}>
            <h4 className={styles.serviceTitle}>Luxury Travel</h4>
            <p className={styles.serviceDescription}>
              For those seeking luxury, we offer 5-star accommodations, private
              guides, and exclusive access to some of the world’s most
              prestigious locations.
            </p>
          </li>

          <li className={styles.serviceItem}>
            <h4 className={styles.serviceTitle}>
              Cultural and Educational Trips
            </h4>
            <p className={styles.serviceDescription}>
              We provide enriching cultural exchanges and educational
              experiences that allow travelers to immerse themselves in new
              cultures and histories.
            </p>
          </li>

          <li className={styles.serviceItem}>
            <h4 className={styles.serviceTitle}>Group Travel</h4>
            <p className={styles.serviceDescription}>
              We organize group tours for families, friends, and colleagues,
              ensuring that everyone enjoys the experience together.
            </p>
          </li>
        </ul>

        <h3 className={styles.sectionTitle}>Why Choose Us?</h3>
        <ul className={styles.companyDescription}>
          <li className={styles.whyChooseUsItem}>
            Over 20 years of expertise in the travel industry.
          </li>
          <li className={styles.whyChooseUsItem}>
            Personalized attention to each client, ensuring every trip is
            one-of-a-kind.
          </li>
          <li className={styles.whyChooseUsItem}>
            A vast network of partners and local guides around the world, giving
            you insider access to unique experiences.
          </li>
          <li className={styles.whyChooseUsItem}>
            Commitment to sustainable travel practices and supporting local
            communities.
          </li>
        </ul>

        <div className={styles.contactDetails}>
          <h4 className={styles.contactTitle}>Contact Details</h4>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <span>Address:</span> 123 Adventure Street, New York, NY, 10001,
              USA
            </li>
            <li className={styles.contactItem}>
              <span>Phone:</span> +1 800-123-4567
            </li>
            <li className={styles.contactItem}>
              <span>Email:</span> contact@travelagency.com
            </li>
            <li className={styles.contactItem}>
              <span>Website:</span>{' '}
              <a
                href='https://www.travelagency.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                www.travelagency.com
              </a>
            </li>
            <li className={styles.contactItem}>
              <span>Social Media:</span>
              <ul className={styles.socialLinks}>
                <li className={styles}>
                  <a
                    href='https://facebook.com/travelagency'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href='https://twitter.com/travelagency'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href='https://instagram.com/travelagency'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
