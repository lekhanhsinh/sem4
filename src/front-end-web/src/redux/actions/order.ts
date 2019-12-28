export const SETORDERS = "SETORDERS"
export const setOrders = (orders:any) => {
    return {
        type : SETORDERS,
        payload: orders
    }
}