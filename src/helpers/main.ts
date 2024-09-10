import { BagItem, Currency } from "../types";
import { BAG_LOCAL_STORAGE_KEY } from "./const";

export const getCurrencySign = (cur: Currency) => {
  switch (cur) {
    case 'usd':
      return '$'
    case 'euro':
      return '€'
    case 'hryvnia':
      return '₴'
  }
}

export const saveBagToLocalStorage = (bag: BagItem[]) => {
  const data = bag.map(el => {
    return {
      id: el.item.id,
      qty: el.qty
    }
  })
  localStorage.setItem(BAG_LOCAL_STORAGE_KEY, JSON.stringify(data))
}