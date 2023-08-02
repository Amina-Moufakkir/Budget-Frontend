import styled from 'styled-components';
import moment from 'moment';
import { FaComment, FaCalendar, FaTrashAlt, FaPiggyBank } from 'react-icons/fa';
import { RiStockLine, RiEarthFill } from 'react-icons/ri';
import { GiBank } from 'react-icons/gi';
import { TbHomeDollar } from 'react-icons/tb';
import { useAppContext } from '../context/AppContext';

const dateFormat = (date) => moment(date).format('MMM Do, YYYY');

const SingleTransaction = ({
  _id,
  name,
  amount,
  date,
  categoryType,
  transactionType,
  description,
}) => {
  const { setDeleteTransaction } = useAppContext();

  const categoryIcon = () => {
    switch (categoryType.toLowerCase()) {
      case 'salary':
        return <GiBank />;
      case 'freelance':
        return <RiEarthFill />;
      case 'investment':
        return <RiStockLine />;
      case 'food':
        return <TbHomeDollar />;
      case 'other':
        return <FaPiggyBank />;
      default:
        return '';
    }
  };

  return (
    <Wrapper>
      <div className="icon">
        <span>{categoryIcon()}</span>
      </div>
      <div className="content">
        <h5>{name}</h5>
        <div className="inner-content">
          <div className="text">
            <p>${amount}</p>
            <p>
              <FaCalendar />
              {dateFormat(date)}
            </p>
            <p>
              <FaComment />
              {description}
            </p>
          </div>
          <div className="btn-container">
            <button
              className="icon-btn"
              onClick={() => setDeleteTransaction(_id)}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: var(--primary-color-2);
  background: var(--backgroundColor);
  border: 2px solid #fff;
  ${'' /* box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.6); */}
  border-radius: 20px;
  ${'' /* padding: 1rem; */}
  margin-bottom: 1rem;

  .icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #fff;
  }

  .icon span {
    font-size: 2.6rem;
    color: var(--primary-color-5);
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .content h5 {
    font-size: 1.3rem;
    padding-left: 2rem;
    position: relative;
    text-transform: uppercase;
  }

  .content h5::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 0.8rem;
    height: 0.8rem;
    background: var(--color-green);
    border-radius: 50%;
  }

  .inner-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .icon-btn {
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    color: var(--color-red-dark);
    background: inherit;
  }

  .text {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  .text p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--primary-color);
    opacity: 0.8;
  }

  .btn-container {
    display: flex;
    justify-content: space-around;
  }
`;

export default SingleTransaction;
