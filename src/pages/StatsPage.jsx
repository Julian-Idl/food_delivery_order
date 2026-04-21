import { useEffect, useMemo } from 'react'
import { useAppContext } from '../context/AppContext'
import { normalizeStatus } from '../utils/orderUtils'

const StatsPage = () => {
  const { loading, error, validOrders } = useAppContext()

  const stats = useMemo(() => {
    return validOrders.reduce(
      (acc, order) => {
        const status = normalizeStatus(order?.status)

        if (!status) {
          return acc
        }

        acc.totalOrders += 1

        if (status === 'delivered') {
          acc.deliveredOrders += 1
        }

        if (status === 'cancelled') {
          acc.cancelledOrders += 1
        }

        return acc
      },
      {
        totalOrders: 0,
        deliveredOrders: 0,
        cancelledOrders: 0,
      },
    )
  }, [validOrders])

  useEffect(() => {
    window.appState = {
      totalOrders: stats.totalOrders,
      deliveredOrders: stats.deliveredOrders,
      cancelledOrders: stats.cancelledOrders,
    }
  }, [stats.cancelledOrders, stats.deliveredOrders, stats.totalOrders])

  if (loading) {
    return <p>Loading stats...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <section>
      <h1>Order Analytics</h1>
      <div className="stats-grid">
        <div className="stats-card">
          <h2>Total Valid Orders</h2>
          <div data-testid="total-orders">{stats.totalOrders}</div>
        </div>

        <div className="stats-card">
          <h2>Delivered Orders</h2>
          <div data-testid="delivered-orders">{stats.deliveredOrders}</div>
        </div>

        <div className="stats-card">
          <h2>Cancelled Orders</h2>
          <div data-testid="cancelled-orders">{stats.cancelledOrders}</div>
        </div>
      </div>
    </section>
  )
}

export default StatsPage
