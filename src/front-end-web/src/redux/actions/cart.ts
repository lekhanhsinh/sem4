export const SETCART = "SETCART"
export const setCart = (cart:any) => {
    return {
        type : SETCART,
        payload: cart
    }
}