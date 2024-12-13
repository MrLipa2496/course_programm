import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './NotFoundPage.module.sass';

function NotFoundPage () {
  const navigate = useNavigate();

  useEffect(() => {
    const id = setTimeout(() => navigate('/'), 10000);
    return () => clearTimeout(id);
  }, [navigate]);

  return (
    <div className={styles.errFoundWrapper}>
      <div className={styles.numOfErr}>404</div>
      <div className={styles.textOfErr}>This page does not exist yet</div>
      <div>
        <Link className={styles.linkToHome} to='/'>
          Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
