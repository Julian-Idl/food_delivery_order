/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useReducer, useRef } from 'react'
import { fetchOrdersDataset } from '../services/api'
import { ACTIONS, AppReducer, initialState } from '../reducer/AppReducer'
import { isValidOrder } from '../utils/orderUtils'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)
  const hasFetchedRef = useRef(false)

  useEffect(() => {
    if (hasFetchedRef.current) {
      return
    }

    hasFetchedRef.current = true

    const loadOrders = async () => {
      dispatch({ type: ACTIONS.FETCH_START })

      try {
        const dataset = await fetchOrdersDataset()
        dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: dataset })
      } catch (error) {
        dispatch({
          type: ACTIONS.FETCH_ERROR,
          payload: error?.message || 'Unable to load order dataset.',
        })
      }
    }

    loadOrders()
  }, [])

  const validOrders = useMemo(() => {
    return state.orders.filter((order) => isValidOrder(order))
  }, [state.orders])

  const markOrderAsDelivered = (orderId) => {
    dispatch({
      type: ACTIONS.MARK_DELIVERED,
      payload: orderId,
    })
  }

  const value = {
    ...state,
    validOrders,
    markOrderAsDelivered,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAppContext must be used within AppProvider.')
  }

  return context
}
