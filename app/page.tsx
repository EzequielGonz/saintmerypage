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
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-base shadow-md">
                      Agregar al carrito
                    </Button>
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
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        window.open(
                          `https://wa.me/542235256172?text=Hola%2C%20me%20interesan%20los%20productos%20de%20la%20categor%C3%ADa%20${encodeURIComponent(category.title)}.`,
                          "_blank",
                        )
                      }}
                    >
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

                  <Button
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    onClick={() =>
                      window.open(
                        "https://wa.me/542235256172?text=Hola%2C%20me%20interesa%20la%20venta%20minorista.%20¿Podr%C3%ADan%20contarme%20m%C3%A1s%20sobre%20sus%20productos%20para%20el%20hogar?",
                        "_blank",
                      )
                    }
                  >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Comprar para mi hogar
                  </Button>
                </div>
              </div>

              {/* Venta Mayorista */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-amber-200 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <div className="grid grid-cols-2 gap-1">
                          <div className="w-3 h-3 bg-white rounded-sm"></div>
                          <div className="w-3 h-3 bg-white rounded-sm"></div>
                          <div className="w-3 h-3 bg-white rounded-sm"></div>
                          <div className="w-3 h-3 bg-white rounded-sm"></div>
                        </div>
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">%</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-amber-700">Venta Mayorista</h3>
                      <p className="text-amber-600 font-medium">Para tu negocio</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 text-lg">
                    Ideal para revendedores, restaurantes y comercios. Precios especiales y servicio profesional.
                  </p>

                  <div className="space-y-4 mb-8">
                    {[
                      { icon: "💰", title: "Precios Preferenciales", desc: "Descuentos por volumen de compra" },
                      { icon: "📦", title: "Envíos Programados", desc: "Entregas regulares según tu cronograma" },
                      { icon: "📊", title: "Gestión de Stock", desc: "Te ayudamos a planificar tu inventario" },
                      { icon: "🤝", title: "Soporte Comercial", desc: "Asesoramiento para hacer crecer tu negocio" },
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
                        "https://wa.me/542235256172?text=Hola%2C%20me%20interesa%20la%20venta%20mayorista.%20Tengo%20un%20negocio%20y%20me%20gustar%C3%ADa%20conocer%20sus%20precios%20y%20condiciones.",
                        "_blank",
                      )
                    }
                  >
                    <div className="grid grid-cols-2 gap-1 mr-2">
                      <div className="w-2 h-2 bg-white rounded-sm"></div>
                      <div className="w-2 h-2 bg-white rounded-sm"></div>
                      <div className="w-2 h-2 bg-white rounded-sm"></div>
                      <div className="w-2 h-2 bg-white rounded-sm"></div>
                    </div>
                    Consultar precios mayoristas
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Products Section */}
        <section id="nuestros-productos" className="py-16 md:py-24 bg-gray-50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Nuestros Productos</h2>
              <p className="text-lg text-muted-foreground">
                Descubrí nuestra selección de productos destacados, elegidos por su calidad y beneficios para la salud.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Almendras Nonparei",
                  price: "$6.050",
                  category: "Frutos Secos",
                  description:
                    "Las almendras Nonpareil son una variedad premium reconocida por su forma alargada, piel delgada y color claro. Estas características las hacen ideales para consumir como snack o utilizar en repostería y cocina saludable.",
                  image:
                    "https://acdn-us.mitiendanube.com/stores/001/267/442/products/almendras11-d63816cb35fd27062a16894259546606-640-0.jpeg",
                },
                {
                  name: "Semillas Amapola",
                  price: "$8.450",
                  category: "Semillas",
                  description:
                    "Las semillas de amapola son pequeñas semillas oleaginosas de color azul oscuro o negro, con un sabor suave y ligeramente a nuez.",
                  image: "https://www.oestepizzaparty.com.ar/wp-content/uploads/2024/10/AMAPOLA.webp",
                },
                {
                  name: "Granola Clasica",
                  price: "$2.100",
                  category: "Granolas",
                  description: "Contiene: mani,pasas,avena,copos naturales y hebras.",
                  image: "https://ibdsoluciones.com/wp-content/uploads/2022/11/2PTCG053.png",
                },
                {
                  name: "Mix Frutas Secas Clasico",
                  price: "$4.350",
                  category: "Mix",
                  description: "Contiene: mani,pasas,nueces y almendras.",
                  image:
                    "https://acdn-us.mitiendanube.com/stores/002/625/145/products/mix-premium-ml-21-be9b3ccc7dd2923c5f16802566568890-1024-1024.jpg",
                },
                {
                  name: "Soja Texturizado",
                  price: "$1.020",
                  category: "Harinas",
                  description:
                    "La soja texturizada (también conocida como proteína de soja texturizada o carne de soja) es un alimento vegetal rico en proteínas que se obtiene de la harina de soja desgrasada y deshidratada.",
                  image:
                    "https://www.eco-basics.com/wp-content/uploads/2019/07/soja-texturizada-ecobasics_525886576.jpg",
                },
              ].map((product, i) => (
                <Card key={i} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="aspect-square relative">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <span className="text-xs font-medium text-green-600">{product.category}</span>
                    </div>
                    <h3 className="font-bold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1 mb-2">{product.description}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="font-bold text-lg">{product.price}</span>
                      <Button
                        size="sm"
                        className="bg-amber-700 hover:bg-amber-800"
                        onClick={() =>
                          window.open(
                            `https://wa.me/542235256172?text=Hola%2C%20me%20interesa%20el%20producto:%20${encodeURIComponent(product.name)}.%20¿Podr%C3%ADan%20darme%20m%C3%A1s%20informaci%C3%B3n?`,
                            "_blank",
                          )
                        }
                      >
                        <ShoppingBag className="h-4 w-4 mr-1" /> Comprar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/shop">
                <Button className="bg-green-600 hover:bg-green-700">
                  Ver todos los productos <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ¿Por qué elegirnos? Section */}
        <section className="py-16 md:py-24 bg-green-50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-green-800">¿Por qué elegirnos?</h2>
              <p className="text-lg text-green-600">
                Descubrí las razones por las que somos tu mejor opción en productos naturales y saludables.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Calidad Premium",
                  description: "Ofrecemos productos de la más alta calidad, seleccionados cuidadosamente para ti.",
                  icon: <Star className="h-10 w-10 text-green-600" />,
                },
                {
                  title: "Atención Personalizada",
                  description: "Te brindamos un servicio personalizado, adaptado a tus necesidades.",
                  icon: <Heart className="h-10 w-10 text-green-600" />,
                },
                {
                  title: "Entrega Rápida",
                  description: "Entregamos tus productos a tiempo, donde y cuando los necesites.",
                  icon: <Clock className="h-10 w-10 text-green-600" />,
                },
                {
                  title: "Precios Accesibles",
                  description: "Encontrá productos de calidad a precios que se ajustan a tu bolsillo.",
                  icon: <ShoppingBag className="h-10 w-10 text-green-600" />,
                },
              ].map((reason, i) => (
                <Card key={i} className="transition-all hover:shadow-lg bg-green-100">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="mx-auto w-fit p-3 rounded-full bg-green-200">{reason.icon}</div>
                    <h3 className="text-xl font-bold text-green-800">{reason.title}</h3>
                    <p className="text-green-600">{reason.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonios" className="py-16 md:py-24 bg-gray-50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Lo que dicen nuestros clientes</h2>
              <p className="text-lg text-muted-foreground">
                Estas son algunas experiencias de quienes confían en nosotros.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Laura Martínez",
                  text: "Desde que descubrí Saintmery, mi alimentación cambió por completo. Sus productos son de excelente calidad y el asesoramiento es inmejorable.",
                },
                {
                  name: "Carlos Rodríguez",
                  text: "Como celíaco, encontrar una dietética con tanta variedad de productos sin TACC y a buenos precios es un alivio. ¡Totalmente recomendable!",
                },
                {
                  name: "María González",
                  text: "El servicio es excelente y los productos son frescos y de calidad. Además, siempre tienen novedades y están al día con las últimas tendencias en alimentación saludable.",
                },
              ].map((testimonial, i) => (
                <Card key={i} className="border-none shadow-lg">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <p className="italic">"{testimonial.text}"</p>
                    <div className="font-medium">{testimonial.name}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="py-16 md:py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Contactanos por WhatsApp</h2>
                <p className="text-lg text-muted-foreground">
                  Hacemos entregas a domicilio en Mar del Plata y Balcarce. ¡Consultanos por WhatsApp para hacer tu
                  pedido!
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Modalidad</h3>
                      <p className="text-muted-foreground">Atención a puertas cerradas en Mar del Plata</p>
                      <p className="text-muted-foreground">Entrega a domicilio en Mar del Plata y Balcarce</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <WhatsApp className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-medium">WhatsApp</h3>
                      <p className="text-muted-foreground">+54 223 525-6172</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">carla-santamaria@hotmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Horarios</h3>
                      <p className="text-muted-foreground">Lunes a Viernes: 9:00 - 19:00</p>
                      <p className="text-muted-foreground">Sábados: 9:00 - 13:00</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Link
                    href="https://instagram.com"
                    className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                  <Link
                    href="https://facebook.com"
                    className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </Link>
                </div>
              </div>

              <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://i.ibb.co/HLQkPJQR/productosfrescos.png"
                  alt="Mapa de ubicación"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ¿Listo para mejorar tu alimentación? Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-green-50 via-green-100 to-green-200 relative overflow-hidden">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-green-800">¿Listo para mejorar tu alimentación?</h2>
              <p className="text-lg text-green-600">
                Comenzá hoy mismo a cuidar tu salud con nuestros productos naturales y saludables.
              </p>
            </div>
            <div className="flex justify-center">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-base shadow-md"
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
        </section>

        {/* Footer */}
        <footer className="border-t py-12 bg-gray-50">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="col-span-2 md:col-span-1">
                {/* Footer Logo */}
                <div className="mb-4">
                  <Image
                    src="https://i.ibb.co/jvz0rVS0/hojitaverde.png"
                    alt="Saintmery Logo"
                    width={150}
                    height={50}
                    className="h-12 w-auto"
                  />
                </div>
                <p className="text-muted-foreground">
                  Tu dietética de confianza. Productos naturales y saludables con entrega a domicilio en Mar del Plata y
                  Balcarce.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-4">Enlaces</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#inicio" className="text-muted-foreground hover:text-green-600">
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link href="#nosotros" className="text-muted-foreground hover:text-green-600">
                      Nosotros
                    </Link>
                  </li>
                  <li>
                    <Link href="#productos" className="text-muted-foreground hover:text-green-600">
                      Productos
                    </Link>
                  </li>
                  <li>
                    <Link href="#nuestros-productos" className="text-muted-foreground hover:text-green-600">
                      Nuestros Productos
                    </Link>
                  </li>
                  <li>
                    <Link href="#testimonios" className="text-muted-foreground hover:text-green-600">
                      Testimonios
                    </Link>
                  </li>
                  <li>
                    <Link href="#contacto" className="text-muted-foreground hover:text-green-600">
                      Contacto
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop" className="text-muted-foreground hover:text-green-600">
                      Shop
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-4">Productos</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/shop?categoria=alimentos-organicos"
                      className="text-muted-foreground hover:text-green-600"
                    >
                      Alimentos Orgánicos
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop?categoria=productos-sin-tacc"
                      className="text-muted-foreground hover:text-green-600"
                    >
                      Productos Sin TACC
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop?categoria=suplementos-naturales"
                      className="text-muted-foreground hover:text-green-600"
                    >
                      Suplementos Naturales
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop?categoria=cosmetica-natural"
                      className="text-muted-foreground hover:text-green-600"
                    >
                      Cosmética Natural
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-4">Contacto</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-amber-700" />
                    <span className="text-muted-foreground">Mar del Plata, Buenos Aires</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <WhatsApp className="h-4 w-4 text-amber-700" />
                    <span className="text-muted-foreground">+54 223 525-6172</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-amber-700" />
                    <span className="text-muted-foreground">info@saintmery.com.ar</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Saintmery. Todos los derechos reservados.
              </p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <Link href="#" className="text-sm text-muted-foreground hover:text-green-600">
                  Política de Privacidad
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-green-600">
                  Términos y Condiciones
                </Link>
              </div>
            </div>
          </div>
        </footer>

        {/* WhatsApp Button */}
        <WhatsAppButton />
      </main>
    </div>
  )
}
