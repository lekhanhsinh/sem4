import { SETSELF } from "../actions/self"
import { SETCART } from "../actions/cart"
import { SETORDERS } from "../actions/order"

const initialState = {
    self : null,
    cart: {items:[] as any[], totalPrice:0},
    orders: []
  }
 const selfReducer =(state=initialState, action:any) => {
    switch (action.type) {
        case SETSELF:
          return {
              ...state,
              self : action.payload
          }
          case SETCART:
          return {
              ...state,
              cart : action.payload
          }
          case SETORDERS:
          return {
              ...state,
              orders : action.payload
          }
        default:
          return state
      }
}
export default selfReducer