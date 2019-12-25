import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from "antd";

const SETPRICE = gql`
    mutation SetPrice(
        $price:Float!,
        $method:METHODS!,
    ){
        setPrice(
            price:$price,
            method:$method,
        )
        }
`
const setPrice = (price: string, method: "PERCM" | "PERPIC") => {
    console.log(price);

    return client.mutate({
        mutation: SETPRICE,
        variables: {
            price: parseFloat(price),
            method,
        }
    }).then(res => {
        return console.log(res.data.setPrice);

    })
}
export default setPrice