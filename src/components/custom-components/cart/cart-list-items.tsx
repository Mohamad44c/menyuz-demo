import { useCartStore } from '@/store/cartStore'
import CartItem from './cart-item'

export default function CartListItems() {
  const { cart } = useCartStore()
  return (
    <div className="flex flex-col gap-4 divide-y divide-border">
      {cart.length > 0 ? (
        cart.map((item) => <CartItem key={item.id} cartItem={item} />)
      ) : (
        <p className="py-4 text-muted-foreground">Start ordering</p>
      )}
    </div>
  )
}
