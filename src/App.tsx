import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav } from './components/nav/Nav';
import { Home } from './pages/home/Home';
import { Bag } from './pages/bag/Bag';
import { BAG_LOCAL_STORAGE_KEY } from './helpers/const';
import { useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './helpers/db';
import { BagItem, Product, SavedDataItem } from './types';
import { useDispatch } from 'react-redux';
import { setBag } from './features/appSlice';

function App() {
  const dispatch = useDispatch();

  const fetchBag = async (saved: SavedDataItem[]) => {
    const queryVal = query(
      collection(db, 'products'),
      where(
        '__name__',
        'in',
        saved.map(el => el.id),
      ),
    );
    const productsRes = await getDocs(queryVal);
    const products: BagItem[] = productsRes.docs.map(el => {
      const data = { id: el.id, ...el.data() } as Product;
      const qty = saved.find(item => el.id === item.id)?.qty || 1;
      return {
        item: data,
        qty,
      };
    });
    dispatch(setBag(products));
  };

  useEffect(() => {
    const savedDataJson = localStorage.getItem(BAG_LOCAL_STORAGE_KEY) || '';
    const saved: SavedDataItem[] = JSON.parse(savedDataJson) || [];
    if (saved.length) {
      fetchBag(saved);
    }
  }, [fetchBag]);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route index element={<Home />} />
        <Route path="bag" element={<Bag />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
