import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

const links = [
  { id: 1, text: 'stats', path: '/dashboard', icon: <IoBarChartSharp /> },
  {
    id: 2,
    text: 'transactions',
    path: 'all-transactions',
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: 'Add',
    path: 'add-transactions',
    icon: <FaWpforms />,
  },
  { id: 4, text: 'profile', path: 'profile', icon: <ImProfile /> },
];

export default links;
