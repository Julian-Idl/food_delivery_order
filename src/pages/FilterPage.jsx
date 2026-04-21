import { useState } from 'react'
import OrderCard from '../components/OrderCard'
import { useAppContext } from '../context/AppContext'
import { getOrderId, getRestaurantName } from '../utils/orderUtils'

const FilterPage = () => {
  const { loading, error: loadError, validOrders } = useAppContext()
  const [inputValue, setInputValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [filteredOrders, setFilteredOrders] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault()
    const query = inputValue.trim()

    if (query.length === 0) {
      setErrorMessage('Restaurant name is required.')
      setHasSearched(false)
      setFilteredOrders([])
      return
    }

    setErrorMessage('')
    const results = validOrders.filter((order) => getRestaurantName(order) === query)
    setFilteredOrders(results)
    setHasSearched(true)
  }

  return (
    <section>
      <h1>Filter Orders</h1>

      <form onSubmit={handleSubmit} className="filter-form">
        <label htmlFor="restaurant-filter">Restaurant Name</label>
        <input
          id="restaurant-filter"
          data-testid="filter-input"
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Enter exact restaurant name"
        />
        <button type="submit">Apply Filter</button>
      </form>

      {errorMessage ? <p className="error-text">{errorMessage}</p> : null}
      {loadError ? <p className="error-text">{loadError}</p> : null}
      {loading ? <p>Loading orders...</p> : null}

      {!loading && hasSearched && filteredOrders.length === 0 ? <p>No results found</p> : null}

      {!loading && filteredOrders.length > 0 ? (
        <div className="grid">
          {filteredOrders.map((order, index) => (
            <OrderCard key={`${String(getOrderId(order))}-${index}`} order={order} />
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default FilterPage
