import { useState, useEffect } from 'react';

import useHttp from '../../hooks/use-http';
import Card from '../UI/Card';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// ==================================================

const UserList = () => {
  const sendRequest = useHttp();

  const [users, setUsers] = useState({});
  const [currentUsers, setCurrentUsers] = useState([]);
  const [page, setPage] = useState(1);

  const pageChangeHandler = (direction) => {
    if (direction === 'next') {
      setPage((prev) => (prev === users.result?.length ? 1 : prev + 1));
    } else {
      setPage((prev) => (prev === 1 ? users.result?.length : prev - 1));
    }
  };

  useEffect(() => {
    sendRequest({ url: 'http://192.168.1.107:5000/admin/users' })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        setUsers(result);
      })
      .catch((err) => console.log(err));
  }, [sendRequest]);

  // Render value theo page
  useEffect(() => {
    if (users.result) {
      setCurrentUsers(users.result[page - 1].results);
    }
  }, [users, page]);

  return (
    <Card>
      <h3>Users</h3>

      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>ID User</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
              </tr>
            ))}

            <tr>
              <td colSpan={5} />
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} />
              <td>
                <div className='pagination'>
                  <p>
                    1{currentUsers.length > 1 ? `-${currentUsers.length}` : ''}{' '}
                    of {users.total}
                  </p>

                  <button
                    type='button'
                    onClick={pageChangeHandler.bind(null, 'prev')}
                  >
                    <FaAngleLeft />
                  </button>

                  <button
                    type='button'
                    onClick={pageChangeHandler.bind(null, 'next')}
                  >
                    <FaAngleRight />
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  );
};

export default UserList;
