import React, { useEffect, useState } from 'react';
import { BagItem, Currency, Product } from '../../types';
import './product-item.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getCurrencySign } from '../../helpers/main';
import { increaseBagQty } from '../../features/appSlice';
import { InBagIcon } from '../icons/InBagIcon';

interface Props {
  product: Product;
}

export const ProductItem = (props: Props) => {
  const [isInBag, setIsInBag] = useState<boolean>(false);

  const currency: Currency = useSelector(
    (state: RootState) => state.appState.currency,
  );
  const dispatch = useDispatch();
  const bag: BagItem[] = useSelector((state: RootState) => state.appState.bag);

  useEffect(() => {
    const found = bag.find(el => el.item.id === props.product.id);
    setIsInBag(Boolean(!found));
  }, [bag, props.product.id]);

  return (
    <div className="product">
      <img
        src={props.product.images[0]}
        alt="product"
        className="product-image"
      />
      <h4 className="product-title">{props.product.title}</h4>

      <p className="product-description">{props.product.description}</p>

      <div className="product-footer">
        <p className="product-price">
          {getCurrencySign(currency)}
          {props.product.price[currency].toLocaleString()}
        </p>
        {isInBag ? (
          <button
            className="product-btn"
            onClick={() => {
              dispatch(increaseBagQty(props.product));
            }}>
            Buy
          </button>
        ) : (
          <button className="product-btn product-btn-in-bag">
            <InBagIcon />
          </button>
        )}
      </div>
    </div>
  );
};
