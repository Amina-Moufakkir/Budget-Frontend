import React, { useState } from 'react';
import AreaChartContainer from './AreaChartContainer';
import BarChartContainer from './BarChartContainer';
import { useAppContext } from '../context/AppContext';

import styled from 'styled-components';

const ChartContainer = () => {
  const [barChart, setBarChart] = useState(true);

  const { monthlyTransactions: data } = useAppContext();

  return (
    <Wrapper>
      <h4>Monthly Transactions</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? (
        <BarChartContainer data={data} />
      ) : (
        <AreaChartContainer data={data} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;
  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }
`;

export default ChartContainer;
