import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
} from 'firebase/firestore';
import { db } from '../../helpers/db';
import { useEffect, useState } from 'react';
import { Product } from '../../types';
import './home.scss';
import { ProductItem } from '../../components/product-item/ProductItem';
import { Loader } from '../../components/loader/Loader';

export const Home = () => {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const queryVal = query(collection(db, 'products'), limit(15));
    setIsLoading(true);
    const productsRes = await getDocs(queryVal);
    setIsLoading(false);
    const products = productsRes.docs.map(el => {
      return { id: el.id, ...el.data() };
    });
    setData(products as Product[]);
  };

  return (
    <div className="products-wrapper">
      <div className="products">
        {isLoading ? (
          <div className="products-loader">
            <Loader />
          </div>
        ) : (
          data.map(el => <ProductItem key={el.id} product={el} />)
        )}
      </div>
    </div>
  );
};
