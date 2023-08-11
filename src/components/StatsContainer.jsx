import React from 'react';
import { useAppContext } from '../context/AppContext';
import StatsItem from './StatsItem';

import { FaPiggyBank } from 'react-icons/fa';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import styled from 'styled-components';

const StatsContainer = () => {
  const { stats } = useAppContext();

  const defaultStats = [
    {
      title: 'Income',
      count: stats.income || 0,
      icon: <GiReceiveMoney />,
      color: '#e9b949',
      // background: '#fcefc7',
    },
    {
      title: 'Expenses',
      count: stats.expenses || 0,
      icon: <GiPayMoney />,
      color: '#d66a6a',
      // background: '#ffeeee',
    },
    {
      title: 'Balance',
      count: stats.balance || 0,
      icon: <FaPiggyBank />,
      color: '#647acb',
      // background: '#e0e8f9',
    },
  ];
  return (
    <div>
      <Wrapper>
        {defaultStats.map((item, index) => {
          return <StatsItem key={index} {...item} />;
        })}
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
  }
`;

export default StatsContainer;
