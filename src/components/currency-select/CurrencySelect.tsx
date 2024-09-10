import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrency } from '../../features/appSlice';
import { Currency } from '../../types';
import './currency-select.scss';
import { SelectArrowIcon } from '../icons/SelectArrowIcon';

export const CurrencySelect = () => {
  const dispatch = useDispatch();

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCurrency(e.target.value as Currency));
  };

  return (
    <div className="currency-select-wrapper">
      <select className="currency-select" onChange={onChange}>
        <option value="usd">Usd</option>
        <option value="euro">Euro</option>
        <option value="hryvnia">Hryvnia</option>
      </select>
      <div className="currency-select-arrow">
        <SelectArrowIcon />
      </div>
    </div>
  );
};
