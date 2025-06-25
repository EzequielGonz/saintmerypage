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
  Smartphone,
  Nut,
  Package,
  Sprout,
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
        <section className="relative h-[calc(100vh-4rem)] overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full">
            {/* Video para móviles (vertical) */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover md:hidden"
            >
              <source src="/Banner SM Vertical.mp4" type="video/mp4" />
            </video>
            {/* Video para tablets y desktop (horizontal) */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover hidden md:block"
            >
              <source src="/Banner SM semi cuadrada.mp4" type="video/mp4" />
            </video>
            {/* Overlay oscuro */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          {/* Hero Content */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl text-white space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Descubrí el poder de la Alimentacion Saludable!
                </h1>
                <p className="text-lg md:text-xl text-gray-200">
                  Productos naturales y saludables seleccionados para cuidar tu salud y bienestar.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/shop" className="w-full sm:w-auto">
                    <Button 
                      size="lg" 
                      className="w-full bg-green-600 hover:bg-green-700 text-white text-base font-semibold py-6 px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Ver productos
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20 text-base font-semibold py-6 px-8"
                    onClick={() =>
                      window.open(
                        "https://wa.me/542235256172?text=Hola%2C%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20Saintmery.",
                        "_blank",
                      )
                    }
                  >
                    Contactanos
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ofertas Semanales Section */}
        <section className="py-16 md:py-24 bg-green-50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-green-800">OFERTAS SEMANALES</h2>
              <p className="text-xl text-green-600">
                Aprovechá nuestras ofertas semanales en productos naturales y saludables.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                {
                  title: "Mix de Frutos Secos Premium x 500 gr",
                  description: "OFERTA SEMANAL! - 15% de descuento",
                  price: "$3.990",
                  originalPrice: "$4.690",
                  image: "https://i.ibb.co/qFjnZghx/sm1mockup.jpg",
                },
                {
                  title: "Granola Casera x 300 gr",
                  description: "OFERTA SEMANAL! - 8% de descuento",
                  price: "$2.290",
                  originalPrice: "$2.490",
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
                Ofrecemos una amplia variedad de productos naturales y saludables para satisfacer todas tus necesidades.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Frutos Secos",
                  description: "Almendras, nueces, castañas y más frutos secos de la mejor calidad.",
                  icon: <Nut className="h-8 w-8 text-green-600" />,
                  href: "/shop?categoria=frutos-secos"
                },
                {
                  title: "Mix de frutos secos",
                  description: "Combinaciones perfectas de frutos secos y semillas para cada ocasión.",
                  icon: <Package className="h-8 w-8 text-green-600" />,
                  href: "/shop?categoria=mix"
                },
                {
                  title: "Granola",
                  description: "Granolas artesanales con ingredientes naturales y sin conservantes.",
                  icon: <Wheat className="h-8 w-8 text-green-600" />,
                  href: "/shop?categoria=granola"
                },
                {
                  title: "Semillas",
                  description: "Semillas de chía, lino, sésamo y más para una alimentación saludable.",
                  icon: <Sprout className="h-8 w-8 text-green-600" />,
                  href: "/shop?categoria=semillas"
                },
                {
                  title: "Avena, Harinas y Féculas",
                  description: "Harinas integrales, avena y féculas para tus recetas saludables.",
                  icon: <Wheat className="h-8 w-8 text-green-600" />,
                  href: "/shop?categoria=harinas-y-feculas"
                },
              ].map((category, i) => (
                <Card key={i} className="overflow-hidden transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-green-100 rounded-lg">{category.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-green-800">{category.title}</h3>
                        <p className="text-green-600">{category.description}</p>
                        <Link href={category.href}>
                          <Button variant="link" className="text-green-600">
                            Ver productos <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
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
                      <p className="text-amber-600 font-medium">Para comercios, gastronómicos y emprendedores</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 text-lg">
                    Ideal para comercios, gastronómicos y emprendedores. Productos en grandes cantidades con precios
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

        {/* Contact Section */}
        <section id="contacto" className="py-16 md:py-24 bg-white">
          <div className="container grid md:grid-cols-2 gap-12 items-center">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-green-800 mb-4">Contactanos por WhatsApp</h2>
              <p className="text-lg text-gray-700 mb-6">
                Hacemos entregas a domicilio en Mar del Plata y Balcarce. ¡Consultanos por WhatsApp para hacer tu pedido!
              </p>

              <div className="space-y-6 text-left">
                {/* Modality */}
                <div>
                  <h3 className="text-2xl font-semibold text-green-700 mb-2">Modalidad</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">•</span> Entrega a domicilio en Mar del Plata y Balcarce
                    </li>
                  </ul>
                </div>

                {/* WhatsApp */}
                <div>
                  <h3 className="text-2xl font-semibold text-green-700 mb-2">WhatsApp</h3>
                  <a href="https://wa.me/542235256172" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-600 hover:underline">
                    <Smartphone className="h-5 w-5" />
                    +54 223 525-6172
                  </a>
                </div>


                {/* Horarios */}
                <div>
                  <h3 className="text-2xl font-semibold text-green-700 mb-2">Horarios</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-green-500" />
                      Lunes a Viernes: 9:00 - 19:00
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-green-500" />
                      Sábados: 9:00 - 13:00
                    </li>
                  </ul>
                </div>
              </div>

              {/* Social media icons */}
              <div className="flex space-x-4 mt-8 justify-start">
                  <a
                    href="https://wa.me/542235256172"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-green-600 transition-colors duration-300"
                  >
                    <WhatsApp className="h-8 w-8" />
                  </a>
                  <a
                    href="https://www.instagram.com/saintmerydistribuidora/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-green-600 transition-colors duration-300"
                  >
                    <Instagram className="h-8 w-8" />
                  </a>
                  <a
                    href="https://www.facebook.com/saintmery"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-green-600 transition-colors duration-300"
                  >
                    <Facebook className="h-8 w-8" />
                  </a>
              </div>
            </div>

            {/* Contact Image */}
            <div>
              <Image
                src="/SM banner inferior.jpg"
                alt="Imagen de Contacto"
                width={500}
                height={500}
                className="rounded-lg shadow-lg mx-auto"
              />
            </div>
          </div>
        </section>

        {/* SM Banner Inferior Section */}
        <section className="relative bg-green-800 py-20 text-white flex items-center justify-center min-h-[300px]">
          <div className="container mx-auto px-4 text-center z-10">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-white mb-4">
              TODOS LOS LUNES LANZAMOS NUEVAS PROMOS Y BENEFICIOS
            </h2>
            <p className="text-xl text-green-100 mb-6">
              Prestá atención a nuestras redes donde anunciamos nuestras promos semana a semana!
            </p>
            <div className="flex justify-center items-center space-x-4">
              <a
                href="https://www.instagram.com/saintmerydistribuidora/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-green-200 transition-colors"
              >
                <Instagram className="h-8 w-8" />
              </a>
              <a
                href="https://www.facebook.com/saintmery"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-green-200 transition-colors"
              >
                <Facebook className="h-8 w-8" />
              </a>
              <a
                href="https://wa.me/542235256172"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-green-200 transition-colors"
              >
                <WhatsApp className="h-8 w-8" />
              </a>
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
                  href="https://www.instagram.com/saintmerydistribuidora/"
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
