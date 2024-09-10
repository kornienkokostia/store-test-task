import {
  decreaseBagQty,
  increaseBagQty,
  removeFromBag,
} from '../../features/appSlice';
import { DecreaseQtyIcon } from '../../components/icons/DecreaseQtyIcon';
import { IncreaseQtyIcon } from '../../components/icons/IncreaseQtyIcon';
import { BagItem, Currency } from '../../types';
import { useDispatch } from 'react-redux';
import { getCurrencySign } from '../../helpers/main';

interface Props {
  product: BagItem;
  currency: Currency;
}

export const BagItemComp = (props: Props) => {
  const dispatch = useDispatch();
  return (
    <div className="bag-item">
      <img
        src={props.product.item.images[0]}
        alt="bag item"
        className="bag-item-img"
      />
      <p className="bag-item-title">{props.product.item.title}</p>
      <div className="bag-item-qty-contorls">
        <button
          onClick={() => dispatch(decreaseBagQty(props.product.item))}
          className="bag-item-qty-btn">
          <DecreaseQtyIcon />
        </button>
        <span className="bag-item-qty-val">{props.product.qty}</span>
        <button
          onClick={() => dispatch(increaseBagQty(props.product.item))}
          className="bag-item-qty-btn">
          <IncreaseQtyIcon />
        </button>
      </div>
      <div className="bag-item-last">
        <p className="bag-item-price">
          {getCurrencySign(props.currency)}
          {props.product.item.price[props.currency].toLocaleString()}
        </p>
        <button
          className="bag-item-btn-remove"
          onClick={() => dispatch(removeFromBag(props.product.item.id))}>
          Remove
        </button>
      </div>
    </div>
  );
};
