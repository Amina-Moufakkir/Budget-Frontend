import { FaHome } from 'react-icons/fa';
import { FaRegCreditCard } from 'react-icons/fa';
import { FaMoneyBill } from 'react-icons/fa';
import { GiPayMoney } from 'react-icons/gi';

export const menu = [
  {
    id: 1,
    title: 'Dashboard',
    icon: <FaHome />,
    link: '/dashboard',
  },
  {
    id: 2,
    title: 'Transactions',
    icon: <FaRegCreditCard />,
    link: '/transactions',
  },
  {
    id: 3,
    title: 'Income',
    icon: <FaMoneyBill />,
    link: '/income',
  },
  {
    id: 4,
    title: 'Expenses',
    icon: <GiPayMoney />,
    link: '/expenses',
  },
];
