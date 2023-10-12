import { formatPrice } from "@/lib/format"

type PriceTagPropsType = {
    price: number
    className?: string
}

const PriceTag = ({price, className}: PriceTagPropsType) => {
    return <span className={`badge ${className}`}>{formatPrice(price)} </span>

}

export default PriceTag