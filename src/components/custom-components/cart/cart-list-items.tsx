import { useCartStore } from '@/store/cartStore'
import CartItem from './cart-item'

export default function CartListItems() {
  const { cart } = useCartStore()
  return (
    <div className="flex flex-col gap-4 divide-gray-400 divide-y">
      {cart.length > 0 ? (
        cart.map((item) => <CartItem key={item.id} cartItem={item} />)
      ) : (
        <p>Start ordering</p>
      )}
    </div>
  )
}
