import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '6rem 1rem' }}>
    <h1>Page not found</h1>
    <p style={{ margin: '1rem 0 2rem' }}>
      Sorry, we couldn&apos;t find the page you were looking for.
    </p>
    <Link to="/">Return to the home page</Link>
  </div>
);

export default NotFound;
