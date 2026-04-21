import OrderCard from '../components/OrderCard'
import { useAppContext } from '../context/AppContext'
import { getOrderId, normalizeStatus } from '../utils/orderUtils'

const OrdersPage = () => {
  const { loading, error, validOrders, markOrderAsDelivered } = useAppContext()

  if (loading) {
    return <p>Loading orders...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  const pendingOrders = validOrders.filter((order) => {
    const status = normalizeStatus(order?.status)
    return status !== 'delivered' && status !== 'cancelled'
  })

  const completedOrCancelledOrders = validOrders.filter((order) => {
    const status = normalizeStatus(order?.status)
    return status === 'delivered' || status === 'cancelled'
  })

  return (
    <section>
      <h1>Orders</h1>

      {validOrders.length === 0 ? (
        <p>No valid orders available.</p>
      ) : (
        <>
          <h2>Pending Orders</h2>
          {pendingOrders.length === 0 ? (
            <p>No pending orders.</p>
          ) : (
            <div className="grid">
              {pendingOrders.map((order, index) => (
                <OrderCard
                  key={`${String(getOrderId(order))}-${index}`}
                  order={order}
                  onMarkDelivered={markOrderAsDelivered}
                />
              ))}
            </div>
          )}

          <h2>Delivered / Cancelled</h2>
          {completedOrCancelledOrders.length === 0 ? (
            <p>No delivered or cancelled orders.</p>
          ) : (
            <div className="grid">
              {completedOrCancelledOrders.map((order, index) => (
                <OrderCard key={`${String(getOrderId(order))}-${index}`} order={order} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default OrdersPage
