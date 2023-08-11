import React, { useEffect } from 'react';
import StatsContainer from '../components/StatsContainer';
import { useAppContext } from '../context/AppContext';
import { Loading } from '../components';
import ChartContainer from '../components/ChartContainer';

const Stats = () => {
  const { showStats, isLoading, reversedMonthlyTransactions } = useAppContext();

  useEffect(() => {
    showStats();
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {reversedMonthlyTransactions.length > 0 && <ChartContainer />}
    </>
  );
};

export default Stats;
