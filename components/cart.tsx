import { ShoppingBag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"

export function Cart() {
  const { cart, removeFromCart, getTotalItems, getTotalPrice } = useCart()

  const handleWhatsAppCheckout = () => {
    const message = cart
      .map(item => `${item.name} x${item.quantity} - ${item.price}`)
      .join('\n')
    const total = getTotalPrice()
    const whatsappMessage = `Hola, me gustaría realizar el siguiente pedido:\n\n${message}\n\nTotal: ${total}`
    window.open(`https://wa.me/542235256172?text=${encodeURIComponent(whatsappMessage)}`, '_blank')
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <ShoppingBag className="h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-500">Tu carrito está vacío</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 pb-4 border-b">
            <Image
              src={item.image}
              alt={item.name}
              width={64}
              height={64}
              className="rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">{item.name}</h3>
              <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
              <p className="text-sm font-medium">{item.price}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFromCart(item.id, item.selectedSize)}
              className="flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="sticky bottom-0 bg-white p-4 border-t shadow-lg">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Total de items:</span>
          <span className="font-medium">{getTotalItems()}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Total:</span>
          <span className="font-bold text-lg text-green-600">{getTotalPrice()}</span>
        </div>
        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3"
          onClick={handleWhatsAppCheckout}
        >
          Completar pedido por WhatsApp
        </Button>
      </div>
    </div>
  )
} 