import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { BagItem, Currency, Product } from '../types'
import { saveBagToLocalStorage } from '../helpers/main'

export interface CounterState {
  currency: Currency,
  bag: BagItem[]
}

const initialState: CounterState = {
  currency: 'usd',
  bag: []
}

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<Currency>) => {
      state.currency = action.payload
    },
    setBag: (state, action: PayloadAction<BagItem[]>) => {
      state.bag = action.payload
    },
    increaseBagQty: (state, action: PayloadAction<Product>) => {
      const found = state.bag.find(el => el.item.id === action.payload.id)
      if (found) {
        found.qty += 1
      } else {
        state.bag.push({
          item: action.payload,
          qty: 1
        })
      }
      saveBagToLocalStorage(state.bag)
    },
    decreaseBagQty: (state, action: PayloadAction<Product>) => {
      const found = state.bag.find(el => el.item.id === action.payload.id)
      if (found) {
        if (found.qty === 1) {
          state.bag = state.bag.filter(el => el.item.id !== action.payload.id)
        } else {
          found.qty -= 1
        }
      }
      saveBagToLocalStorage(state.bag)
    },
    removeFromBag: (state, action: PayloadAction<string>) => {
      state.bag = state.bag.filter(el => el.item.id !== action.payload)
      saveBagToLocalStorage(state.bag)
    },
    clearBag: (state) => {
      state.bag = []
      saveBagToLocalStorage(state.bag)
    }
  },
})

export const { setCurrency, increaseBagQty, decreaseBagQty, removeFromBag, setBag, clearBag } = appStateSlice.actions

export default appStateSlice.reducer