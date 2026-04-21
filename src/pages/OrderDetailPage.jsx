import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import {
  calculateItemSubtotal,
  getCustomerName,
  getItems,
  getOrderId,
  getRestaurantName,
  toNumber,
} from '../utils/orderUtils'

const OrderDetailPage = () => {
  const { id } = useParams()
  const { loading, error, validOrders } = useAppContext()

  if (loading) {
    return <p>Loading order details...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (!id || id.trim().length === 0) {
    return <p>Order not found</p>
  }

  const selectedOrder = validOrders.find((order) => String(getOrderId(order)) === String(id))

  if (!selectedOrder) {
    return <p>Order not found</p>
  }

  const items = getItems(selectedOrder)
  const resolvedTotalAmount = toNumber(selectedOrder.totalAmount)

  return (
    <section>
      <h1>Order Detail</h1>
      <p>Order ID: {getOrderId(selectedOrder)}</p>
      <p>Customer: {getCustomerName(selectedOrder)}</p>
      <p>Restaurant: {getRestaurantName(selectedOrder)}</p>
      <p>Status: {selectedOrder.status || 'Unknown'}</p>
      <p>Delivery Time: {selectedOrder.deliveryTime || 'N/A'}</p>
      {selectedOrder.rating !== undefined && selectedOrder.rating !== null && selectedOrder.rating !== '' ? (
        <p>Rating: {selectedOrder.rating}</p>
      ) : null}

      <h2>Items</h2>
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <div className="detail-items">
          {items.map((item, index) => {
            const subtotal = calculateItemSubtotal(item)

            return (
              <div key={`${item?.name ?? 'item'}-${index}`} className="detail-item-row">
                <span>{item?.name || 'Unknown Item'}</span>
                <span>
                  Qty: {item?.quantity ?? 0} | Price: {item?.price ?? 0} | Subtotal: {subtotal}
                </span>
              </div>
            )
          })}
        </div>
      )}

      <p>Total Amount: {Number.isFinite(resolvedTotalAmount) ? resolvedTotalAmount : 0}</p>
    </section>
  )
}

export default OrderDetailPage
