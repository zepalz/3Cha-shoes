import curtApi from '../../lib/curtApi'

// Actions
const UPDATE_CART = 'cart/UPDATE_CART'

// Initial State
/**
 * { [_id]: { Product } }
 * [ { product: {}, quantity: 2 } ]
 */
const initialState = {
  cart: [],
}

// Reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_CART:
      return {
        ...state,
        cart: action.payload,
      }
    default:
      return state
  }
}

// Action Creators
export const editCartItem = (productId, quantity) => async dispatch => {
  const cart = await curtApi.cart.editCartItem(productId, quantity)
  dispatch({
    type: UPDATE_CART,
    payload: cart,
  })
}

export const removeCartItem = itemId => async dispatch => {
  const cart = await curtApi.cart.removeCartItem(itemId)
  dispatch({
    type: UPDATE_CART,
    payload: cart,
  })
}

export const fetchCart = () => async dispatch => {
  const cart = await curtApi.cart.fetchCart()
  dispatch({
    type: UPDATE_CART,
    payload: cart,
  })
}