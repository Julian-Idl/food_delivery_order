import { getOrderId, normalizeStatus } from '../utils/orderUtils'

export const ACTIONS = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  MARK_DELIVERED: 'MARK_DELIVERED',
}

export const initialState = {
  orders: [],
  loading: false,
  error: '',
}

export const AppReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_START:
      return {
        ...state,
        loading: true,
        error: '',
      }

    case ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        orders: Array.isArray(action.payload) ? action.payload : [],
      }

    case ACTIONS.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload || 'Failed to load orders.',
      }

    case ACTIONS.MARK_DELIVERED: {
      const targetId = String(action.payload)
      let changed = false

      const nextOrders = state.orders.map((order) => {
        if (String(getOrderId(order)) !== targetId) {
          return order
        }

        if (normalizeStatus(order?.status) === 'delivered') {
          return order
        }

        changed = true
        return {
          ...order,
          status: 'Delivered',
        }
      })

      if (!changed) {
        return state
      }

      return {
        ...state,
        orders: nextOrders,
      }
    }

    default:
      return state
  }
}
