export const SETSELF = "SETSELF"
export const setSelf = (self:any) => {
    return {
        type : SETSELF,
        payload: self
    }
}