import React, { useState } from 'react';
import moment from 'moment';
import {
  FaDollarSign,
  FaComment,
  FaCalendar,
  FaTrashAlt,
  FaPiggyBank,
  FaEdit,
} from 'react-icons/fa';
import { RiStockLine, RiEarthFill } from 'react-icons/ri';
import { GiBank } from 'react-icons/gi';
import { TbHomeDollar } from 'react-icons/tb';

import './SingleIncome.css';

const dateFormat = (date) => moment(date).format('DD/MM/YYYY');

const SingleIncome = ({ income, deleteIncome, updateIncome }) => {
  const categoryIcon = () => {
    switch (income.category.toLowerCase()) {
      case 'salary':
        return <GiBank />;
      case 'freelance':
        return <RiEarthFill />;
      case 'investment':
        return <RiStockLine />;
      case 'rental':
        return <TbHomeDollar />;
      case 'other':
        return <FaPiggyBank />;
      default:
        return '';
    }
  };

  return (
    <div className="single-income">
      <div className="icon">
        <span>{categoryIcon()}</span>
      </div>
      <div className="content">
        <h5>{income.title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>
              <FaDollarSign />
              {income.amount}
            </p>
            <p>
              <FaCalendar />
              {dateFormat(income.date)}
            </p>
            <p>
              <FaComment />
              {income.description}
            </p>
          </div>
          <div className="btn-container">
            <button
              className="icon-btn"
              onClick={() => deleteIncome(income._id)}
            >
              <FaTrashAlt />
            </button>
            <button
              className="icon-btn"
              style={{ color: '#3e8e41', marginLeft: '5px' }}
            >
              <FaEdit />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleIncome;
