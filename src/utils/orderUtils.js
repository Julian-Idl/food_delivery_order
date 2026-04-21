export const toNumber = (value) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : Number.NaN
}

export const getOrderId = (order) => {
  if (order?.orderId !== undefined && order?.orderId !== null) {
    return order.orderId
  }

  if (order?.id !== undefined && order?.id !== null) {
    return order.id
  }

  return null
}

export const getCustomerName = (order) => {
  const rawName = order?.customerName ?? order?.CustomerName

  if (typeof rawName !== 'string') {
    return 'Unknown'
  }

  const trimmedName = rawName.trim()
  return trimmedName.length > 0 ? trimmedName : 'Unknown'
}

export const getRestaurantName = (order) => {
  const restaurant = order?.restaurant

  if (typeof restaurant !== 'string') {
    return 'Unknown Restaurant'
  }

  const trimmedName = restaurant.trim()
  return trimmedName.length > 0 ? trimmedName : 'Unknown Restaurant'
}

export const getItems = (order) => {
  return Array.isArray(order?.items) ? order.items : []
}

export const isValidTotalAmount = (order) => {
  const totalAmount = toNumber(order?.totalAmount)
  return Number.isFinite(totalAmount) && totalAmount > 0
}

export const hasValidItems = (order) => {
  const items = getItems(order)

  if (items.length === 0) {
    return false
  }

  return items.every((item) => toNumber(item?.quantity) > 0)
}

export const isValidOrder = (order) => {
  if (!order || typeof order !== 'object') {
    return false
  }

  if (getOrderId(order) === null) {
    return false
  }

  if (!hasValidItems(order)) {
    return false
  }

  return isValidTotalAmount(order)
}

export const normalizeStatus = (status) => {
  if (typeof status !== 'string') {
    return ''
  }

  return status.trim().toLowerCase()
}

export const calculateItemSubtotal = (item) => {
  const price = toNumber(item?.price)
  const quantity = toNumber(item?.quantity)

  if (!Number.isFinite(price) || !Number.isFinite(quantity) || quantity <= 0) {
    return 0
  }

  return price * quantity
}

export const getRating = (order) => {
  if (order?.rating === undefined || order?.rating === null || order?.rating === '') {
    return null
  }

  const rating = toNumber(order.rating)
  return Number.isFinite(rating) ? rating : null
}
