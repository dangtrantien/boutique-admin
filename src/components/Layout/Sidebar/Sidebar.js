import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';

import useHttp from '../../../hooks/use-http';
import { userActions } from '../../../store/user/user-slice';

import styles from './Sidebar.module.css';
import { RiDashboardFill } from 'react-icons/ri';
import { BsHeadset } from 'react-icons/bs';
import { FaRegUser, FaHotel } from 'react-icons/fa';
import { TfiCreditCard } from 'react-icons/tfi';
import { BiLogIn } from 'react-icons/bi';

// ==================================================

const Sidebar = () => {
  const dispatch = useDispatch();
  const sendRequest = useHttp();
  const navigate = useNavigate();

  const role = useSelector((state) => state.user.role);

  const logoutHandler = () => {
    sendRequest({
      url: 'http://192.168.1.107:5000/logout',
      method: 'POST',
    })
      .then(() => {
        dispatch(userActions.logout());

        Cookies.remove('token');

        return navigate('/', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <section id='sidebar' className={styles['sidebar-container']}>
      {role === 'counselor' && (
        <div className={styles['list-container']}>
          <p>Main</p>

          <NavLink
            to='/chat'
            className={({ isActive }) => (isActive ? styles.active : null)}
          >
            <BsHeadset className={styles.icon} />
            Chat
          </NavLink>
        </div>
      )}

      {role !== 'counselor' && (
        <>
          <div className={styles['list-container']}>
            <p>Main</p>

            <ul>
              <NavLink
                to='/dashboard'
                className={({ isActive }) => (isActive ? styles.active : null)}
              >
                <RiDashboardFill className={styles.icon} />
                Dashboard
              </NavLink>

              <NavLink
                to='/chat'
                className={({ isActive }) => (isActive ? styles.active : null)}
              >
                <BsHeadset className={styles.icon} />
                Chat
              </NavLink>
            </ul>
          </div>

          <div className={styles['list-container']}>
            <p>Lists</p>

            <ul>
              <li>
                <NavLink
                  to='/users'
                  className={({ isActive }) =>
                    isActive ? styles.active : null
                  }
                >
                  <FaRegUser className={styles.icon} />
                  Users
                </NavLink>
              </li>

              <li>
                <NavLink
                  to='/products'
                  className={({ isActive }) =>
                    isActive ? styles.active : null
                  }
                >
                  <FaHotel className={styles.icon} />
                  Products
                </NavLink>
              </li>
            </ul>
          </div>

          <div className={styles['list-container']}>
            <p>New</p>

            <NavLink
              to='/new-product'
              className={({ isActive }) => (isActive ? styles.active : null)}
            >
              <TfiCreditCard className={styles.icon} />
              New Product
            </NavLink>
          </div>
        </>
      )}

      <div className={styles['list-container']}>
        <p>User</p>

        <button onClick={logoutHandler}>
          <BiLogIn className={styles.icon} />
          Logout
        </button>
      </div>
    </section>
  );
};

export default Sidebar;