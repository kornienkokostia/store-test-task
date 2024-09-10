import { useEffect, useState } from 'react';
import './bag.scss';
import { BagItem, Currency } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getCurrencySign } from '../../helpers/main';
import { Link } from 'react-router-dom';
import { BagItemComp } from './BagItem';
import { Input } from '../../components/input/Input';
import { db } from '../../helpers/db';
import { addDoc, collection } from 'firebase/firestore';
import { clearBag } from '../../features/appSlice';

export const Bag = () => {
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
  }, [bag, currency]);
  const dispatch = useDispatch();

  const [name, setName] = useState<string>('');
  const [nameIsFocused, setNameIsFocused] = useState<boolean>(false);
  const [surname, setSurname] = useState<string>('');
  const [surnameIsFocused, setSurnameIsFocused] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [addressIsFocused, setAddressIsFocused] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>('');
  const [phoneIsFocused, setPhoneIsFocused] = useState<boolean>(false);

  const onPlaceOrderClick = async () => {
    await addDoc(collection(db, 'orders'), {
      personal_info: {
        name,
        surname,
        address,
        phone,
      },
      items: bag,
    });

    dispatch(clearBag());

    setName('');
    setNameIsFocused(false);
    setSurname('');
    setSurnameIsFocused(false);
    setAddress('');
    setAddressIsFocused(false);
    setPhone('');
    setPhoneIsFocused(false);
  };

  return (
    <div className="bag-wrapper">
      <div className="bag">
        <h1 className="bag-title">
          Your bag total is {getCurrencySign(currency)}
          {total.toLocaleString()}
        </h1>
        <p className="bag-subtitle">Free delivery and free returns.</p>
        <Link to={'/'} className="bag-btn">
          Continue Shopping
        </Link>
        <div className="bag-items">
          {bag.map(el => (
            <BagItemComp key={el.item.id} product={el} currency={currency} />
          ))}
          {bag.length !== 0 && (
            <div className="bag-footer-wrapper">
              <div className="bag-footer">
                <span>Total</span>
                <p className="bag-footer-total">
                  {getCurrencySign(currency)}
                  {total.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
        <h2 className="bag-form-title">Personal information</h2>
        <div className="bag-form">
          <Input
            fieldTitle="Name"
            isFocused={nameIsFocused}
            setIsFocused={setNameIsFocused}
            value={name}
            onChange={val => setName(val)}
          />
          <Input
            fieldTitle="Surname"
            isFocused={surnameIsFocused}
            setIsFocused={setSurnameIsFocused}
            value={surname}
            onChange={val => setSurname(val)}
          />
          <Input
            fieldTitle="Address"
            isFocused={addressIsFocused}
            setIsFocused={setAddressIsFocused}
            value={address}
            onChange={val => setAddress(val)}
          />
          <Input
            fieldTitle="Phone"
            isFocused={phoneIsFocused}
            setIsFocused={setPhoneIsFocused}
            value={phone}
            type="number"
            onChange={val => setPhone(val)}
          />
          <button
            className="bag-form-btn bag-btn"
            disabled={!name || !surname || !address || !phone}
            onClick={onPlaceOrderClick}>
            Place Your Order
          </button>
        </div>
      </div>
    </div>
  );
};
