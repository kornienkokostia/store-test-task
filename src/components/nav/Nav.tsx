import React, { useEffect, useState } from 'react';
import './nav.scss';
import { Link } from 'react-router-dom';
import { CurrencySelect } from '../currency-select/CurrencySelect';
import BagIcon from '../icons/BagIcon';
import { BagItem, Currency } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getCurrencySign } from '../../helpers/main';

export const Nav = () => {
  const [total, setTotal] = useState<number>(0);

  const currency: Currency = useSelector(
    (state: RootState) => state.appState.currency,
  );
  const bag: BagItem[] = useSelector((state: RootState) => state.appState.bag);

  useEffect(() => {
    setTotal(
      +bag
        .reduce((prev, curr) => prev + curr.qty * curr.item.price[currency], 0)
        .toFixed(2),
    );
  }, [bag]);

  return (
    <div className="nav">
      <CurrencySelect />

      <div className="nav-bag-wrapper">
        {total !== 0 && (
          <span>
            {getCurrencySign(currency)}
            {total.toLocaleString()}
          </span>
        )}

        <Link to={'bag'} className="nav-bag">
          <BagIcon />
        </Link>
      </div>
    </div>
  );
};
