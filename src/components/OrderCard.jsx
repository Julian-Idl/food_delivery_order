import { Link } from 'react-router-dom'
import {
  getCustomerName,
  getOrderId,
  getRating,
  getRestaurantName,
  normalizeStatus,
} from '../utils/orderUtils'

const OrderCard = ({ order, onMarkDelivered }) => {
  const orderId = getOrderId(order)
  const rating = getRating(order)
  const status = normalizeStatus(order?.status)
  const isDelivered = status === 'delivered'

  return (
    <article className="order-card" data-testid="order-item">
      <div>
        <h3>Order #{orderId ?? 'N/A'}</h3>
        <p>Customer: {getCustomerName(order)}</p>
        <p>Restaurant: {getRestaurantName(order)}</p>
        <p>Status: {order?.status || 'Unknown'}</p>
        {rating !== null ? <p>Rating: {rating}</p> : null}
      </div>

      <div className="order-card__actions">
        <Link to={`/orders/${orderId}`} className="button-link">
          View Details
        </Link>

        {typeof onMarkDelivered === 'function' ? (
          <button
            type="button"
            onClick={() => onMarkDelivered(orderId)}
            disabled={isDelivered}
          >
            {isDelivered ? 'Delivered' : 'Mark Delivered'}
          </button>
        ) : null}
      </div>
    </article>
  )
}

export default OrderCard
