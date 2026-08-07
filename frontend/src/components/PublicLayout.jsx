import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

/**
 * Chrome for the public site. The admin routes deliberately sit outside this
 * so they don't inherit the church NavBar and Footer.
 */
const PublicLayout = () => (
  <div className="App">
    <NavBar />
    <main className="main-content">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default PublicLayout;
