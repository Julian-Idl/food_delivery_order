import axios from 'axios'

const BASE_URL = 'https://t4e-testserver.onrender.com/api'

const API_CREDENTIALS = {
  studentId: import.meta.env.VITE_STUDENT_ID ?? 'E0123017',
  set: import.meta.env.VITE_DATASET_SET ?? 'setA',
  password: import.meta.env.VITE_STUDENT_PASSWORD ?? '221607',
}

const extractOrders = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.orders)) {
      return payload.orders
    }

    if (payload.data && typeof payload.data === 'object' && Array.isArray(payload.data.orders)) {
      return payload.data.orders
    }

    const nestedArray = Object.values(payload).find((value) => Array.isArray(value))
    if (nestedArray) {
      return nestedArray
    }
  }

  return []
}

export const fetchOrdersDataset = async () => {
  const tokenResponse = await axios.post(`${BASE_URL}/public/token`, API_CREDENTIALS)

  const token = tokenResponse?.data?.token
  const dataUrl = tokenResponse?.data?.dataUrl

  if (!token || !dataUrl) {
    throw new Error('Token response is missing required fields.')
  }

  const datasetEndpoint = dataUrl.startsWith('http') ? dataUrl : `${BASE_URL}${dataUrl}`

  const datasetResponse = await axios.get(datasetEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return extractOrders(datasetResponse.data)
}
