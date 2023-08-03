import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

import { userActions } from '../../store/user/user-slice';
import useHttp from '../../hooks/use-http';
import NavBar from '../../components/Layout/Navbar/Navbar';
import Sidebar from '../../components/Layout/Sidebar/Sidebar';

// ==================================================

const MainLayout = () => {
  const token = Cookies.get('token');
  const dispatch = useDispatch();
  const sendRequest = useHttp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate('/signin', { replace: true });
    } else {
      sendRequest({ url: 'http://192.168.1.107:5000/user' })
        .then((result) => {
          if (result.error) {
            return;
          }

          if (result.role === 'client') {
            Cookies.remove('token');

            return navigate('/signin', { replace: true });
          }

          Object.keys(result).map((key) =>
            dispatch(
              userActions.replaceUserState({ name: key, value: result[key] })
            )
          );

          if (result.role === 'counselor') {
            return navigate('/chat', { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  }, [token, navigate, sendRequest, dispatch]);

  return (
    <div className='layout-container'>
      <NavBar />

      <Sidebar />

      <main>
        <div className='container-lg'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
