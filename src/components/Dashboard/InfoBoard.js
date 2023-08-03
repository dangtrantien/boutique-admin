import InfoBoardItem from './InfoBoardItem';

import styles from './InfoBoard.module.css';
import { FiUserPlus, FiDollarSign } from 'react-icons/fi';
import { AiOutlineFileAdd } from 'react-icons/ai';

// ==================================================

const infoList = [
  {
    id: 'i1',
    url: 'http://192.168.1.107:5000/admin/users',
    title: 'Clients',
    icon: <FiUserPlus className={styles.icon} />,
    isMoney: false,
  },

  {
    id: 'i2',
    url: 'http://192.168.1.107:5000/admin/earnings',
    title: 'Earnings of Month',
    icon: <FiDollarSign className={styles.icon} />,
    isMoney: true,
  },
  {
    id: 'i3',
    url: 'http://192.168.1.107:5000/admin/balance',
    title: 'Balance',
    icon: <FiDollarSign className={styles.icon} />,
    isMoney: true,
  },
  {
    id: 'i4',
    url: 'http://192.168.1.107:5000/admin/orders',
    title: 'New Order',
    icon: <AiOutlineFileAdd className={styles.icon} />,
    isMoney: false,
  },
];

const InfoBoard = () => {
  return (
    <>
      <p>Dashboard</p>

      <div className={styles.info}>
        {infoList.map((info) => (
          <InfoBoardItem
            key={info.id}
            url={info.url}
            title={info.title}
            icon={info.icon}
            isMoney={info.isMoney}
          />
        ))}
      </div>
    </>
  );
};

export default InfoBoard;
