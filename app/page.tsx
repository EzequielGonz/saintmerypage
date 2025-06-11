"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Apple,
  Leaf,
  Heart,
  ShoppingBag,
  MapPin,
  PhoneIcon as WhatsApp,
  Mail,
  Clock,
  Instagram,
  Facebook,
  ChevronRight,
  Star,
  Wheat,
} from "lucide-react"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Navbar } from "@/components/navbar"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section id="inicio" className="relative min-h-screen flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <iframe
              src="https://player.vimeo.com/video/1088559327?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1&controls=0&background=1"
              className="absolute top-1/2 left-1/2 w-[120%] h-[120%] transform -translate-x-1/2 -translate-y-1/2 object-cover"
              style={{
                border: "none",
                minHeight: "120vh",
                minWidth: "120vw",
              }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Saintmery Video Background"
            />
            {/* Overlay muy sutil sin blur */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          <div className="container relative z-10 py-12 md:py-16 lg:py-20 flex items-center justify-center">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/shop">
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-base shadow-md">
                      Ver productos
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="bg-white/80 backdrop-blur text-green-900 hover:bg-green-100 border-white/40 px-6 py-3 text-base shadow-md"
                    onClick={() =>
                      window.open(
                        "https://wa.me/542235256172?text=Hola%2C%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20Saintmery.",
                        "_blank",
                      )
                    }
                  >
                    Conócenos
                  </Button>
                </div>
                <p className="text-lg md:text-xl text-green-900 max-w-2xl mx-auto font-semibold drop-shadow">
                  Vendemos productos sueltos y saludables con entrega a domicilio en Mar del Plata y Balcarce.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ofertas Semanales Section */}
        <section className="py-16 md:py-24 bg-green-50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-green-800">Ofertas Semanales</h2>
              <p className="text-lg text-green-600">
                Aprovechá nuestras ofertas semanales en productos naturales y saludables.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Nuez Mariposa Extra Light x 250 gr",
                  description: "OFERTA SEMANAL! - 4% de descuento",
                  price: "$4.990",
                  originalPrice: "$5.200",
                  image: "https://i.ibb.co/qFjnZghx/sm1mockup.jpg",
                },
                {
                  title: "Sal del Himalaya Fina x 500 gr",
                  description: "OFERTA SEMANAL! - 27% de descuento",
                  price: "$1.290",
                  originalPrice: "$1.790",
                  image: "https://i.ibb.co/qFjnZghx/sm1mockup.jpg",
                },
                {
                  title: "Almohaditas x 250 gr",
                  description: "OFERTA SEMANAL! - 10% de descuento",
                  price: "$1.790",
                  originalPrice: "$1.990",
                  image: "https://i.ibb.co/qFjnZghx/sm1mockup.jpg",
                },
                {
                  title: "Aceite de Coco Neutro x 360 ml",
                  description: "Entrenuts",
                  price: "$5.500",
                  originalPrice: null,
                  image: "https://i.ibb.co/qFjnZghx/sm1mockup.jpg",
                },
              ].map((offer, i) => (
                <Card key={i} className="transition-all hover:shadow-lg bg-green-100">
                  <CardContent className="p-6 text-center space-y-4">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      width={200}
                      height={200}
                      className="mx-auto rounded-lg"
                    />
                    <h3 className="text-xl font-bold text-green-800">{offer.title}</h3>
                    <p className="text-green-600">{offer.description}</p>
                    <div className="flex justify-center items-center gap-2">
                      <span className="text-lg font-semibold text-green-600">{offer.price}</span>
                      {offer.originalPrice && (
                        <span className="text-sm line-through text-green-400">{offer.originalPrice}</span>
                      )}
                    </div>
                    <Link href="/shop">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Ver en tienda
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="nosotros" className="py-16 md:py-24 bg-green-50">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src="https://i.ibb.co/qFjnZghx/sm1mockup.jpg"
                  alt="Nuestra tienda"
                  width={600}
                  height={600}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-6">
                <div className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                  Desde 2017
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-green-800">Tu aliado en Alimentación saludable</h2>
                <p className="text-lg text-green-600">
                  En Saintmery nos dedicamos a ofrecer los mejores productos naturales y saludables de alta calidad. Atendemos a clientes minoristas y mayoristas, con la dedicación que se merecen
                </p>
                <ul className="space-y-3">
                  {[
                    "Productos 100% naturales y saludables",
                    "Vendemos productos SIN TACC",
                    "Asesoramiento personalizado",
                    "Precios accesibles",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="rounded-full bg-green-200 p-1">
                        <ChevronRight className="h-4 w-4 text-green-800" />
                      </div>
                      <span className="text-green-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="bg-green-600 hover:bg-green-700 mt-4"
                  onClick={() =>
                    window.open(
                      "https://wa.me/542235256172?text=Hola%2C%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20Saintmery.",
                      "_blank",
                    )
                  }
                >
                  Conocer más
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="productos" className="py-16 md:py-24 bg-green-50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-green-800">Nuestras categorías de productos</h2>
              <p className="text-lg text-green-600">
                Ofrecemos una amplia variedad de productos naturales y orgánicos para satisfacer todas tus necesidades.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Frutos Secos",
                  description: "Nuestros frutos secos de categoria premium.",
                  icon: <Apple className="h-10 w-10 text-green-600" />,
                },
                {
                  title: "Mix",
                  description: "Disfrutá de una combinación irresistible de frutos secos y frutas deshidratadas",
                  icon: <Leaf className="h-10 w-10 text-green-600" />,
                },
                {
                  title: "Granola",
                  description: "Estan hechas con una mezcla equilibrada de avena, frutos secos, semillas y un toque de miel natural. ",
                  icon: <Heart className="h-10 w-10 text-green-600" />,
                },
                {
                  title: "Semillas",
                  description: "Incorporá lo mejor de la naturaleza a tu dieta con nuestra selección de semillas: chía, lino, girasol, calabaza y más. ",
                  icon: <ShoppingBag className="h-10 w-10 text-green-600" />,
                },
                {
                  title: "AvenaHarinayFeculas",
                  description: "Encontrá todo lo que necesitás para cocinar rico y natural: avena tradicional, harinas integrales, premezclas sin TACC, fécula de maíz y mucho más.",
                  icon: <Wheat className="h-10 w-10 text-green-600" />,
                },
              ].map((category, i) => (
                <Card key={i} className="transition-all hover:shadow-lg bg-green-100">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="mx-auto w-fit p-3 rounded-full bg-green-200">{category.icon}</div>
                    <h3 className="text-xl font-bold text-green-800">{category.title}</h3>
                    <p className="text-green-600">{category.description}</p>
                    <Link href="/shop">
                      <Button variant="link" className="text-green-600">
                        Ver productos <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Venta Minorista y Mayorista - Versión Innovadora */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-green-50 via-green-100 to-green-200 relative overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-green-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-green-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-200 rounded-full blur-2xl animate-pulse delay-500"></div>
          </div>

          <div className="container relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-green-800">Venta Minorista y Mayorista</h2>
              <p className="text-lg text-green-600">
                Ofrecemos productos de alta calidad para clientes minoristas y mayoristas.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Venta Minorista */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-green-200 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <ShoppingBag className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                        <Heart className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-green-700">Venta Minorista</h3>
                      <p className="text-green-600 font-medium">Para tu hogar y familia</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 text-lg">
                    Perfecta para consumo personal y familiar. Productos frescos, porciones ideales y la misma calidad
                    premium.
                  </p>

                  <div className="space-y-4 mb-8">
                    {[
                      { icon: "🏠", title: "Pedidos Personalizados", desc: "Adaptamos las cantidades a tu consumo" },
                      { icon: "🚚", title: "Entrega a Domicilio", desc: "Llevamos frescura hasta tu puerta" },
                      { icon: "💚", title: "Asesoramiento Nutricional", desc: "Te ayudamos a elegir lo mejor" },
                      { icon: "⚡", title: "Respuesta Rápida", desc: "Atención inmediata por WhatsApp" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors duration-300"
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <h4 className="font-semibold text-green-800">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link href="/shop">
                    <Button
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      Comprar para mi hogar
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Venta Mayorista */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-amber-200 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <ShoppingBag className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                        <Heart className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-amber-700">Venta Mayorista</h3>
                      <p className="text-amber-600 font-medium">Para negocios y emprendimientos</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 text-lg">
                    Ideal para negocios, restaurantes y emprendedores. Productos en grandes cantidades con precios
                    especiales.
                  </p>

                  <div className="space-y-4 mb-8">
                    {[
                      { icon: "🏢", title: "Precios Mayoristas", desc: "Descuentos especiales por volumen" },
                      { icon: "📦", title: "Envíos a Todo el País", desc: "Logística confiable y segura" },
                      { icon: "🤝", title: "Atención Personalizada", desc: "Asesoramiento para tu negocio" },
                      { icon: "💼", title: "Condiciones Flexibles", desc: "Adaptadas a tus necesidades" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-amber-50 transition-colors duration-300"
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <h4 className="font-semibold text-amber-800">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    onClick={() =>
                      window.open(
                        "https://wa.me/542235256172?text=Hola%2C%20me%20interesa%20la%20venta%20mayorista.%20¿Podr%C3%ADan%20contarme%20m%C3%A1s%20sobre%20sus%20condiciones%20para%20negocios?",
                        "_blank",
                      )
                    }
                  >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Consultar por mayorista
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Saintmery</h3>
              <p className="text-gray-600">
                Tu aliado en alimentación saludable desde 2017.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-green-600">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="text-gray-600 hover:text-green-600">
                    Tienda
                  </Link>
                </li>
                <li>
                  <Link href="/#nosotros" className="text-gray-600 hover:text-green-600">
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/#contacto" className="text-gray-600 hover:text-green-600">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2">
                <li className="text-gray-600">
                  <a
                    href="https://wa.me/542235256172"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-600"
                  >
                    WhatsApp: +54 223 525-6172
                  </a>
                </li>
                <li className="text-gray-600">
                  <a href="mailto:info@saintmery.com" className="hover:text-green-600">
                    info@saintmery.com
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/saintmery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-600"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/saintmery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-600"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} Saintmery. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  )
}
