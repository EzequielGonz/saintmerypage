"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag, ShoppingCart, Search, Filter, ChevronDown, Heart, ArrowLeft, Menu, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useSearchParams } from "next/navigation"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Actualizar la lista de categorías disponibles
const categorias = ["Todas", "Frutos Secos", "Mix", "Granola", "Semillas", "AvenaHarinasyFeculas"]

// Actualizar las categorías de los productos de ejemplo con 3 precios diferentes
const productos = [
  {
    id: 1,
    name: "Almendras Nonparei",
    prices: {
      X250G: "$6.050",
      "500G": "$10.959",
      Kilo: "$19.900",
    },
    category: "Frutos Secos",
    description:
      "Las almendras Nonpareil son una variedad premium, reconocida por su forma alargada, piel clara y delgada, y textura suave.",
    image:
      "https://cdn.newgarden.com.ar/media/catalog/product/cache/dda7253a1a2f6711745de410175d10f8/a/l/almendras-nonpareil-400grs-sin-gluten.jpg",
  },
  {
    id: 2,
    name: "Almendras Guara",
    prices: {
      X250G: "$5.650",
      "500G": "$10.200",
      Kilo: "$18,500",
    },
    category: "Frutos Secos",
    description:
      "Las almendras Guara son una variedad de origen español, conocida por su forma redondeada, piel fina y sabor dulce.",
    image:
      "https://acdn-us.mitiendanube.com/stores/002/324/020/products/almendra-nom-pareil-1-02b3fccc3a761fb77d169823898843901-eaaf49f56a15855caa16982389967663-640-0.png",
  },
  {
    id: 3,
    name: "Arandanos Deshidratados",
    prices: {
      X250G: "$4.350",
      "500G": "$7.850",
      Kilo: "$13.850",
    },
    category: "Frutos Secos",
    description:
      "Los arándanos deshidratados son una excelente opción para incorporar antioxidantes y fibra a tu dieta.",
    image:
      "https://d22fxaf9t8d39k.cloudfront.net/908c48c76928c7de46997b87771f355174e1d75daa4b63aaaa7797e11cce48c5136777.jpeg",
  },
  {
    id: 4,
    name: "Avellanas Peladas",
    prices: {
      X250G: "$7.990",
      "500G": "$14.500",
      Kilo: "$26.350",
    },
    category: "Frutos Secos",
    description:
      "Las avellanas peladas son una excelente fuente de grasas saludables, proteínas y minerales, ideales para consumir solas o incorporar en recetas dulces y saladas.",
    image: "https://tienda.elnuevoemporio.com.ar/digistore/pictures/Articulo/791-229010.jpg",
  },
  {
    id: 5,
    name: "Bananas en chip",
    prices: {
      X250G: "$2.900",
      "500G": "$5.200",
      Kilo: "$9.450",
    },
    category: "Frutos Secos",
    description:
      "Las chips de banana son un snack delicioso y nutritivo, ideal para consumir solo, mezclar con frutos secos o agregar a granolas y postres.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1PX350ETcVs6sc9GKWqACeLUJ1FLh2bZuoA&s",
  },
  {
    id: 6,
    name: "Ciruela sin carozo",
    prices: {
      X250G: "$-",
      "500G": "$4.560",
      Kilo: "$8.290",
    },
    category: "Frutos Secos",
    description:
      "Las ciruelas sin carozo son una excelente fuente de fibra, potasio y antioxidantes, ideales para consumir como snack o incorporar en diversas recetas.",
    image:
      "https://acdn-us.mitiendanube.com/stores/001/157/846/products/ciruela-deshidratada-sin-carozo1-e7a18cdc87f96a451616153978184611-1024-1024.jpg",
  },
  {
    id: 7,
    name: "Castañas de caju",
    prices: {
      X250G: "$4.950",
      "500G": "$8.850",
      Kilo: "$15.980",
    },
    category: "Frutos Secos",
    description:
      "Las castañas de cajú son un snack saludable y versátil, rico en grasas saludables, proteínas y minerales.",
    image:
      "https://acdn-us.mitiendanube.com/stores/001/245/894/products/cast-caju1-1d7bd0f65ee44acc7b15941799039887-640-0.png",
  },
  {
    id: 8,
    name: "Coco en escamas",
    prices: {
      X250G: "$5.100",
      "500G": "$9.250",
      Kilo: "$16.750",
    },
    category: "Frutos Secos",
    description:
      "El coco en escamas es un ingrediente versátil y nutritivo, ideal para repostería, granolas, smoothies y snacks saludables.",
    image:
      "https://acdn-us.mitiendanube.com/stores/001/177/099/products/coco-en-escamas1-74a02d37bfdf74ad5816113241322435-640-0.jpg",
  },
  {
    id: 9,
    name: "Datiles",
    prices: {
      X250G: "$-",
      "500G": "$5.035",
      Kilo: "$9.150",
    },
    category: "Frutos Secos",
    description:
      "Los dátiles son una fruta deshidratada rica en fibra, potasio y antioxidantes, ideales para consumir como snack o incorporar en diversas recetas.",
    image:
      "https://www.fao.org/images/newsroomlibraries/stories-images/b539a86a4cbd3b38c3b94d37e15be76e.jpg?sfvrsn=f3043153_10",
  },
  {
    id: 10,
    name: "Mani con cascara grande",
    prices: {
      X250G: "$1.220",
      "500G": "$2.200",
      Kilo: "$3.980",
    },
    category: "Frutos Secos",
    description:
      "El maní con cáscara grande es simplemente el fruto del maní tal como se cosecha, sin pelar, pero de un tamaño más grande que el habitual.",
    image: "https://el-sembrador.com.ar/wp-content/uploads/2024/12/MANI-CON-CASCARA-GRANDE-2.png.webp",
  },
  {
    id: 11,
    name: "Mani Repelado Salado",
    prices: {
      X250G: "$1.030",
      "500G": "$1.860",
      Kilo: "$3.380",
    },
    category: "Frutos Secos",
    description:
      "El maní repelado salado es un snack clásico en Argentina, ideal para picadas, colaciones o acompañar bebidas.",
    image:
      "https://cdn.newgarden.com.ar/media/catalog/product/cache/dda7253a1a2f6711745de410175d10f8/m/a/mani-salado-y-tostado-400grs.jpg",
  },
  {
    id: 12,
    name: "Mani Repelado sin Sal",
    prices: {
      X250G: "$1,030",
      "500G": "$1.860",
      Kilo: "$3.380",
    },
    category: "Frutos Secos",
    description:
      "El maní repelado sin sal es un snack clásico en Argentina, ideal para picadas, colaciones o acompañar bebidas.",
    image:
      "https://acdn-us.mitiendanube.com/stores/001/003/711/products/mani-sin-piel-sin-sal1-6a21b240f481c40ab315673970335332-1024-1024.jpg",
  },
  {
    id: 13,
    name: "Nuez con Cascara",
    prices: {
      X250G: "$2.500",
      "500G": "$4.500",
      Kilo: "$8.150",
    },
    category: "Frutos Secos",
    description:
      "La nuez con cáscara es el fruto seco en su estado natural, protegido por una cáscara dura que ayuda a conservar su frescura y propiedades nutricionales.",
    image:
      "https://cdn.newgarden.com.ar/media/catalog/product/cache/dda7253a1a2f6711745de410175d10f8/1/0/105105-nuez-con-cascara-.jpg",
  },
  {
    id: 14,
    name: "Nuez Mariposa",
    prices: {
      X250G: "$6.700",
      "500G": "$12.200",
      Kilo: "$22.150",
    },
    category: "Frutos Secos",
    description:
      "La nuez mariposa es una variedad de nuez de nogal (Juglans regia) reconocida por su forma distintiva que recuerda a las alas de una mariposa.",
    image:
      "https://hiperlibertad.vtexassets.com/arquivos/ids/224550/NUEZ-MARIPOSA-X-100-GRS-ECOM-1-47081.jpg?v=638508981775730000",
  },
  {
    id: 15,
    name: "Nuez Pecan Mariposa",
    prices: {
      X250G: "$-",
      "500G": "$14.500",
      Kilo: "$25.650",
    },
    category: "Frutos Secos",
    description:
      "La nuez pecan mariposa es una variedad premium de nuez pecan, reconocida por su forma alargada y simétrica que recuerda a las alas de una mariposa.",
    image:
      "https://acdn-us.mitiendanube.com/stores/001/918/710/products/14-nuez-pecan-mariposa1-ba5ed34fdfae67681916354584269195-1024-1024.png",
  },
  {
    id: 16,
    name: "Pasas de uva jumbo",
    prices: {
      X250G: "$2.060",
      "500G": "$3.750",
      Kilo: "$6.750",
    },
    category: "Frutos Secos",
    description:
      "Las pasas de uva jumbo son una variedad de uvas secas de mayor tamaño, jugosas y sin semillas, ideales para consumir como snack, en repostería o mezcladas con otros frutos secos",
    image:
      "https://cdn.newgarden.com.ar/media/catalog/product/cache/dda7253a1a2f6711745de410175d10f8/3/3/334334-pasa-de-uva-negra-gigante-_jumbo_.jpg",
  },
  {
    id: 17,
    name: "Pasas de uva sultanina",
    prices: {
      X250G: "$1.750",
      "500G": "$3.150",
      Kilo: "$5.690",
    },
    category: "Frutos Secos",
    description:
      "Las pasas de uva sultanina son una variedad de uva sin semillas, conocidas por su tamaño mediano, sabor dulce y textura jugosa.",
    image: "https://tiendaquality.com.ar/wp-content/uploads/2022/11/COD75.png",
  },
  {
    id: 18,
    name: "Pasas de uva rubia",
    prices: {
      X250G: "$2.860",
      "500G": "$5.200",
      Kilo: "$9.450",
    },
    category: "Frutos Secos",
    description:
      "Las pasas de uva rubia son una variedad de uvas secas, deshidratadas y sin semillas, conocidas por su sabor dulce y textura jugosa.",
    image: "https://ketoandco.com.ar/wp-content/uploads/2024/11/PASAS-DE-UVA-RUBIAS.jpg",
  },
  {
    id: 19,
    name: "Pistachos Salados con Cascara",
    prices: {
      X250G: "$12.900",
      "500G": "$23.500",
      Kilo: "$42.500",
    },
    category: "Frutos Secos",
    description:
      "Para consumo ocasional o como snack: Las presentaciones de 100 g o 300 g son ideales para probar la calidad del producto sin adquirir grandes cantidades.",
    image: "https://http2.mlstatic.com/D_NQ_NP_699469-MLA50482594447_062022-O.webp",
  },
  {
    id: 20,
    name: "Mix Frutas Secas Clasico",
    prices: {
      X250G: "$-",
      "500G": "$4.350",
      Kilo: "$7.850",
    },
    category: "Mix",
    description: "Contiene: Mani, pasas, nueces y almendras",
    image:
      "https://acdn-us.mitiendanube.com/stores/001/040/363/products/mix-economico1-887663413a216dce0716816663309953-640-0.jpg",
  },
  {
    id: 21,
    name: "Mix Frutas Secas Tropical",
    prices: {
      X250G: "$-",
      "500G": "$5.000",
      Kilo: "$9.060",
    },
    category: "Mix",
    description: "Contiene: Mani,pasas,castañas,nuez,almendras y banana.",
    image:
      "https://acdn-us.mitiendanube.com/stores/002/625/145/products/mix-tropical-ml1-b8ca06c44ca824046d16802564137117-1024-1024.jpg",
  },
  {
    id: 22,
    name: "Mix Frutas Secas Premium",
    prices: {
      X250G: "$-",
      "500G": "$5.650",
      Kilo: "$10.200",
    },
    category: "Mix",
    description: "Contiene: Mani,pasas rubias y morochas, nuez, almendras, castañas",
    image:
      "https://acdn-us.mitiendanube.com/stores/002/625/145/products/mix-premium-ml1-91d0a8cfa3c3b2495e16802566571203-640-0.jpg",
  },
  {
    id: 23,
    name: "Mix Especial sin Pasas",
    prices: {
      X250G: "$-",
      "500G": "$5.850",
      Kilo: "$10.550",
    },
    category: "Mix",
    description: "Contiene: Mani, castañas, almendras y nuez",
    image:
      "https://acdn-us.mitiendanube.com/stores/002/625/145/products/mix-sin-pasas-ml1-11e2fa8c7e9f30119b16802561021023-1024-1024.jpg",
  },
  {
    id: 24,
    name: "Mix Especial sin Mani",
    prices: {
      X250G: "$-",
      "500G": "$6.400",
      Kilo: "$11.600",
    },
    category: "Mix",
    description: "Contiene: Pasas rubias y morochas,castañas,almendras y nuez.",
    image:
      "https://acdn-us.mitiendanube.com/stores/001/229/173/products/mix-de-frutos-secos-con-pasas-12-kg-d_nq_np_589905-mla25107800259_102016-f1-799a1be3d88edbecbb15945260039537-640-0.jpg",
  },
  {
    id: 25,
    name: "Mix Tentacion",
    prices: {
      X250G: "$-",
      "500G": "$8.800",
      Kilo: "$15.990",
    },
    category: "Mix",
    description: "Contiene: Coco esc. y rallado,chips de choco,almendra,castaña,nuez y arandano.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQthbKv4jyCrbbT0PMPjrh-bruMGQaO8Ng_g&s",
  },
  {
    id: 26,
    name: "Mix Saint",
    prices: {
      X250G: "$-",
      "500G": "$10.250",
      Kilo: "$18.550",
    },
    category: "Mix",
    description: "Contiene: Nueces, almendras y castañas.",
    image:
      "https://hierbabuenaalmacen.com/wp-content/uploads/2021/03/mix-frutos-secos-sin-pasas-de-uva-12kg-solo-fruto-secos-D_NQ_NP_766299-MLA40659254694_022020-O.jpg",
  },
  {
    id: 27,
    name: "Mix Gold",
    prices: {
      X250G: "$-",
      "500G": "$11.100",
      Kilo: "$20.150",
    },
    category: "Mix",
    description: "Contiene: Nueces, almendras, castañas y avellanas",
    image:
      "https://d22fxaf9t8d39k.cloudfront.net/f3f86570521b9dbd7a1575ba92b7771d29c0fea9551e01dd723fe5369822573d155881.jpeg",
  },
  {
    id: 28,
    name: "Mix Salado",
    prices: {
      X250G: "$-",
      "500G": "$4.650",
      Kilo: "$8.450",
    },
    category: "Mix",
    description: "Contiene: Girasol, mani, maiz frito, semilla de zapallo",
    image:
      "https://acdn-us.mitiendanube.com/stores/002/324/020/products/mix-salado-1-921b13c129249cdee516982667425160-640-0.png",
  },
  {
    id: 29,
    name: "Granola Clasica",
    prices: {
      X250G: "$-",
      "500G": "$2.100",
      Kilo: "$3.800",
    },
    category: "Granola",
    description: "Contiene: mani,pasas,avena,copos naturales y hebras.",
    image: "https://http2.mlstatic.com/D_NQ_NP_830017-MLU71111421112_082023-O.webp",
  },
  {
    id: 30,
    name: "Granola con Miel",
    prices: {
      X250G: "$-",
      "500G": "$2.100",
      Kilo: "$3.800",
    },
    category: "Granola",
    description: "Contiene: mani, pasas,avena c extracto de miel,copos y hebras.",
    image: "https://biscottigalletas.com/wp-content/uploads/2020/04/2020-02-09-11.02.14-1.jpg",
  },
  {
    id: 31,
    name: "Granola con Coco",
    prices: {
      X250G: "$-",
      "500G": "$2.500",
      Kilo: "$4.500",
    },
    category: "Granola",
    description: "Contiene: mani, pasas,avena c extracto de miel,copos,hebras y coco.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnTkADsGpv5JlS8TJx7Bn6_DviKga0D-FgGw&s",
  },
  {
    id: 32,
    name: "Granola Crujiente",
    prices: {
      X250G: "$-",
      "500G": "$2.750",
      Kilo: "$4.950",
    },
    category: "Granola",
    description: "Contiene: copos,aritos de miel,hebras,cuadricopo,quinoa pop",
    image:
      "https://i.ytimg.com/vi/VpSihOWH1kA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLASPh5Z0Erw0vlT7v4H5w4KFHk6Vg",
  },
  {
    id: 33,
    name: "Granola Saint",
    prices: {
      X250G: "$-",
      "500G": "$5.600",
      Kilo: "$10.150",
    },
    category: "Granola",
    description: "Contiene: granola crocante, arandanos y almendras nonparei",
    image: "https://stgeorgemarket.co.uk/cdn/shop/products/IMG_8124.jpg?v=1662046236&width=1946",
  },
  {
    id: 34,
    name: "Amapola",
    prices: {
      X250G: "$-",
      "500G": "$8.450",
      Kilo: "$15.350",
    },
    category: "Semillas",
    description:
      "Las semillas de amapola son las pequeñas semillas que provienen de la planta Papaver somniferum, la misma de la que también se obtiene el opio, aunque las semillas en sí no contienen sustancias psicoactivas en cantidades significativas.",
    image: "https://www.oestepizzaparty.com.ar/wp-content/uploads/2024/10/AMAPOLA.webp",
  },
  {
    id: 35,
    name: "Chia",
    prices: {
      X250G: "$-",
      "500G": "$3.100",
      Kilo: "$5.500",
    },
    category: "Semillas",
    description:
      "La chia son las semillas de la planta Salvia hispanica, originaria de América Central, y son muy populares por sus beneficios nutricionales.",
    image: "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/NTNBWBYC75GMTITMJBAMRV6DUA.jpg",
  },
  {
    id: 36,
    name: "Girasol Pelado",
    prices: {
      X250G: "$-",
      "500G": "$2.050",
      Kilo: "$3.680",
    },
    category: "Semillas",
    description:
      "Las semillas de girasol peladas (sin cáscara) son un snack nutritivo y versátil, además de una gran fuente de energía.",
    image: "https://www.mayoristadelegumbres.com.ar/wp-content/uploads/2020/05/girasol-pelado.jpg",
  },
  {
    id: 37,
    name: "Lino",
    prices: {
      X250G: "$-",
      "500G": "$1.100",
      Kilo: "$1.950",
    },
    category: "Semillas",
    description: "El lino (o linaza) son las semillas de la planta Linum usitatissimum y es una de las más nutritivas.",
    image: "https://www.lasaponaria.es/img/cms/semi_di_lino_benefici_corpo.jpg",
  },
  {
    id: 38,
    name: "Quinoa Blanca Premium",
    prices: {
      X250G: "$-",
      "500G": "$4.380",
      Kilo: "$7.950",
    },
    category: "Semillas",
    description:
      "La quinoa blanca premium es una de las variedades más consumidas de quinoa (Chenopodium quinoa), y se considera de alta calidad por su sabor más suave, textura tierna y menor amargor.",
    image: "https://http2.mlstatic.com/D_NQ_NP_601822-MLA77850012812_072024-O.webp",
  },
  {
    id: 39,
    name: "Sesamo Blanco",
    prices: {
      X250G: "$-",
      "500G": "$4.875",
      Kilo: "$8.860",
    },
    category: "Semillas",
    description:
      "El sésamo blanco (también llamado ajonjolí) son las semillas de la planta Sesamum indicum, y se usan tanto por su sabor como por sus propiedades nutricionales.",
    image:
      "https://acdn-us.mitiendanube.com/stores/001/157/846/products/sesamo-blanco1-c366380862bc24751015871713092113-1024-1024.jpg",
  },
  {
    id: 40,
    name: "Sesamo Integral",
    prices: {
      X250G: "$-",
      "500G": "$1.950",
      Kilo: "$3.550",
    },
    category: "Semillas",
    description:
      "El sésamo integral es básicamente el sésamo sin pelar, es decir, conserva su cáscara natural, a diferencia del sésamo blanco (que está pelado). ",
    image: "https://acdn-us.mitiendanube.com/stores/139/211/products/si1-5f39e3dbf951b2058416613695784776-640-0.jpg",
  },
  {
    id: 41,
    name: "Sesamo Negro",
    prices: {
      X250G: "$-",
      "500G": "$3.850",
      Kilo: "$6.950",
    },
    category: "Semillas",
    description:
      "El sésamo negro es otra variedad de semilla de Sesamum indicum, con sabor más fuerte y terroso que el sésamo blanco o integral.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXcjSgIQTYaeadgOa-8gJCqwcDe_ptrNzaVA&s",
  },
  {
    id: 42,
    name: "Mix de Sesamo",
    prices: {
      X250G: "$-",
      "500G": "$4.550",
      Kilo: "$8.250",
    },
    category: "Semillas",
    description: "Un mix de sésamo es una mezcla de diferentes tipos de semillas de sésamo, comúnmente combinando",
    image:
      "https://acdn-us.mitiendanube.com/stores/004/542/496/products/sesamo-33af310099513c77a517182125521911-640-0.webp",
  },
  {
    id: 43,
    name: "Mix de Semillas",
    prices: {
      X250G: "$-",
      "500G": "$1.650",
      Kilo: "$2.990",
    },
    category: "Semillas",
    description:
      "El mix de semillas es una combinación de varias semillas nutritivas y crujientes, que se usa mucho para sumar sabor, textura y beneficios en comidas.",
    image:
      "https://acdn-us.mitiendanube.com/stores/914/913/products/mix-desayuno1-1175617f4c786d490d15677680584648-640-0.jpg",
  },
  {
    id: 44,
    name: "Semillas Zapallo",
    prices: {
      X250G: "$-",
      "500G": "$7.850",
      Kilo: "$14.250",
    },
    category: "Semillas",
    description:
      "Las semillas de zapallo (también llamadas pepitas) son las semillas del calabaza o zapallo (Cucurbita pepo), muy populares por su sabor y nutrientes.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSk1yvXWzpYdrpD0c1FB0-5A4xGUP7vLtBiQ&s",
  },
  {
    id: 45,
    name: "Avena Instantanea",
    prices: {
      X250G: "$-",
      "500G": "$1.200",
      Kilo: "$2.100",
    },
    category: "AvenaHarinasyFeculas",
    description:
      "La avena instantánea es avena que ha sido precocida, aplastada y procesada para que se cocine muy rápido, generalmente en 1 a 2 minutos.",
    image:
      "https://acdn-us.mitiendanube.com/stores/001/172/573/products/avena-instantanea1-a2f52909048896047315892228642830-640-0.jpg",
  },
  {
    id: 46,
    name: "Avena Tradicional",
    prices: {
      X250G: "$-",
      "500G": "$1.200",
      Kilo: "$2.100",
    },
    category: "AvenaHarinasyFeculas",
    description:
      "La avena tradicional (también llamada avena en hojuelas o rolled oats) son granos de avena que han sido solo tostados y aplastados, pero no precocidos.",
    image:
      "https://acdn-us.mitiendanube.com/stores/001/367/092/products/avena-tradicional-02-21-b80003ad5944a8c20516867722807974-1024-1024.jpg",
  },
  {
    id: 47,
    name: "Fecula de Maiz",
    prices: {
      X250G: "$-",
      "500G": "$1.050",
      Kilo: "$1.750",
    },
    category: "AvenaHarinasyFeculas",
    description:
      "La fécula de maíz (también llamada maicena) es un almidón extraído del grano de maíz, muy usado como espesante en la cocina.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJjSpb39YBmrSMPcaaOfJ_ufWKmzMohlSecA&s",
  },
  {
    id: 48,
    name: "Fecula de Mandioca",
    prices: {
      X250G: "$-",
      "500G": "$1.030",
      Kilo: "$1.860",
    },
    category: "AvenaHarinasyFeculas",
    description:
      "La fécula de mandioca (también conocida como almidón de yuca o harina de tapioca) es un polvo blanco y fino extraído de la raíz de la mandioca (yuca).",
    image: "https://miserdiet.com.ar/wp-content/uploads/2022/09/fecula-de-mandioca.webp",
  },
  {
    id: 49,
    name: "Harina de Arroz",
    prices: {
      X250G: "$-",
      "500G": "$900",
      Kilo: "$1.630",
    },
    category: "AvenaHarinasyFeculas",
    description:
      "La harina de arroz es un polvo fino que se obtiene moliendo arroz (puede ser arroz blanco o integral).",
    image: "https://cdn.recetasderechupete.com/wp-content/uploads/2022/02/Harina-de-arroz.jpg",
  },
  {
    id: 50,
    name: "Harina de Avena",
    prices: {
      X250G: "$-",
      "500G": "$1.150",
      Kilo: "$2.050",
    },
    category: "AvenaHarinasyFeculas",
    description:
      "La harina de avena es simplemente avena molida hasta obtener un polvo fino, que se puede hacer en casa o comprar ya preparada.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrhupRrMiuLCMZBWb_g_JpsUhh47JEmJfREQ&s",
  },
  {
    id: 51,
    name: "Harina de coco",
    prices: {
      X250G: "$-",
      "500G": "$3.800",
      Kilo: "$6.850",
    },
    category: "AvenaHarinasyFeculas",
    description:
      "La harina de coco es una harina hecha a partir de la pulpa seca y desgrasada del coco, molida en un polvo fino.",
    image:
      "https://cdn.aarp.net/content/dam/aarp/food/modern-kitchen/12/1140-how-to-cook-with-coconut-flour-bowl-esp.jpg",
  },
  {
    id: 52,
    name: "Harina de almendras c piel",
    prices: {
      X250G: "$-",
      "500G": "$2.750",
      Kilo: "$4.950",
    },
    category: "AvenaHarinasyFeculas",
    description:
      "La harina de almendras con piel es almendras molidas que conservan su cáscara marrón, lo que le da un color más oscuro y textura un poco más rústica que la harina de almendras pelada.",
    image:
      "https://acdn-us.mitiendanube.com/stores/002/712/058/products/harina-de-almendras-con-piel-547be1ead548323a5217072528323207-1024-1024.png",
  },
  {
    id: 53,
    name: "Harina de almendras sin piel",
    prices: {
      X250G: "$-",
      "500G": "$2.950",
      Kilo: "$5.299",
    },
    category: "AvenaHarinasyFeculas",
    description:
      "La harina de almendras sin piel (también llamada harina de almendra blanqueada) se obtiene moliendo almendras peladas, por eso es más clara y con textura más fina que la harina con piel.",
    image:
      "https://neufood.com.ar/wp-content/uploads/2022/05/harina-de-almendras1-4d993e44b85fbeb45c15887161412979-640-0.jpg",
  },
  {
    id: 54,
    name: "Harina de garbanzo",
    prices: {
      X250G: "$-",
      "500G": "$750",
      Kilo: "$1.300",
    },
    category: "AvenaHarinasyFeculas",
    description:
      "La harina de garbanzo es un polvo hecho de garbanzos molidos, muy usada en la cocina de Medio Oriente, India y Mediterráneo.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl5gtfA94K46a0grQ4lrtIqKYejWtqeTjaIQ&s",
  },
  {
    id: 55,
    name: "Harina de algarroba",
    prices: {
      X250G: "$-",
      "500G": "$1.800",
      Kilo: "$3.250",
    },
    category: "AvenaHarinasyFeculas",
    description:
      "La harina de algarroba se obtiene moliendo los frutos secos del algarrobo, que es un árbol típico de regiones cálidas.",
    image:
      "https://acdn-us.mitiendanube.com/stores/001/172/573/products/harina-de-algarroba1-2f81aaaa5b3224b78415885358820729-640-0.jpg",
  },
  {
    id: 56,
    name: "Harina integral fina",
    prices: {
      X250G: "$-",
      "500G": "$700",
      Kilo: "$1.150",
    },
    category: "AvenaHarinasyFeculas",
    description:
      "La harina integral fina es harina molida de trigo integral, donde se utilizan todas las partes del grano (endospermo, salvado y germen), pero con una molienda más fina que la harina integral común.",
    image: "https://miserdiet.com.ar/wp-content/uploads/2022/08/harina-integral-1-1.jpg",
  },
  {
    id: 57,
    name: "Salvado de avena",
    prices: {
      X250G: "$-",
      "500G": "$1.250",
      Kilo: "$2.250",
    },
    category: "AvenaHarinasyFeculas",
    description:
      "El salvado de avena es la capa externa del grano de avena que se separa durante el proceso de molienda.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeZP_5TEhnafFXCOxf4WsK7Bl5NEpbExwjPQ&s",
  },
  {
    id: 58,
    name: "Soja Texturizado",
    prices: {
      X250G: "$-",
      "500G": "$1.020",
      Kilo: "$1.820",
    },
    category: "AvenaHarinasyFeculas",
    description:
      "El soja texturizada (también llamada proteína vegetal texturizada o PVT) es un producto elaborado a partir de harina de soja desgrasada, que se procesa para obtener una textura similar a la carne picada.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGaY43BTH_63PIcLdMiMzk65xlEB_WueizaQ&s",
  },
]

export default function ShopPage() {
  const [filteredProducts, setFilteredProducts] = useState(productos)
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [searchTerm, setSearchTerm] = useState("")
  const [cartCount, setCartCount] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [cartAnimation, setCartAnimation] = useState(false)
  const searchParams = useSearchParams()

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filtrar productos por categoría y término de búsqueda
  useEffect(() => {
    const categoria = searchParams.get("categoria")

    if (categoria) {
      // Convertir el parámetro de URL a un formato que coincida con nuestras categorías
      const formattedCategory = categoria
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      setSelectedCategory(categorias.includes(formattedCategory) ? formattedCategory : "Todas")
    }

    let filtered = productos

    // Filtrar por categoría
    if (selectedCategory !== "Todas") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredProducts(filtered)
  }, [selectedCategory, searchTerm, searchParams])

  // Función para contactar por WhatsApp para comprar
  const addToCart = (productName: string, weight: string, price: string) => {
    setCartCount((prev) => prev + 1)
    setCartAnimation(true)
    setTimeout(() => setCartAnimation(false), 600)

    const message = `Hola, me gustaría comprar el producto: ${productName} (${weight}) por ${price}. ¿Está disponible?`
    window.open(`https://wa.me/542235256172?text=${encodeURIComponent(message)}`, "_blank")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-600 border-t-transparent mx-auto"></div>
          <div className="animate-pulse">
            <h2 className="text-2xl font-bold text-amber-700">Cargando productos...</h2>
            <p className="text-muted-foreground">Preparando la mejor selección para ti</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-slide-down">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center group">
              <Image
                src="https://i.ibb.co/jvz0rVS0/hojitaverde.png"
                alt="Saintmery Logo"
                width={250}
                height={80}
                className="h-20 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <Link
              href="/"
              className="hidden md:flex items-center text-sm font-medium text-muted-foreground hover:text-green-600 transition-all duration-300 hover:translate-x-1"
            >
              <ArrowLeft className="h-4 w-4 mr-1 transition-transform duration-300 group-hover:-translate-x-1" /> Volver
              al inicio
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="transition-transform duration-300 hover:scale-110"
            >
              <div className={`transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </div>
            </Button>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className={`relative transition-all duration-300 ${cartAnimation ? "animate-bounce" : ""}`}>
              <ShoppingCart className="h-6 w-6 transition-colors duration-300 hover:text-amber-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden border-t transition-all duration-500 ease-in-out ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
        >
          {isMenuOpen && (
            <div className="md:hidden border-t">
              <div className="container py-4">
                <Link
                  href="/"
                  className="flex items-center text-sm font-medium text-muted-foreground hover:text-green-600 mb-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Volver al inicio
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Carrito</span>
                  <div className={`relative transition-all duration-300 ${cartAnimation ? "animate-bounce" : ""}`}>
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2 animate-slide-up">Tienda Saintmery</h1>
            <p className="text-muted-foreground animate-slide-up animation-delay-100">
              Productos sueltos y saludables para venta minorista y mayorista.
            </p>
          </div>

          {/* Banner de entrega */}
          <div className="bg-gradient-to-r from-amber-100 to-green-100 rounded-lg p-4 mb-8 flex items-center gap-4 animate-slide-up animation-delay-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="bg-amber-200 p-2 rounded-full animate-pulse">
              <ShoppingBag className="h-6 w-6 text-amber-700" />
            </div>
            <div>
              <h3 className="font-medium">Entrega a domicilio</h3>
              <p className="text-sm text-muted-foreground">
                Hacemos envíos a Mar del Plata y Balcarce. Consultanos por WhatsApp al +54 223 525-6172
              </p>
            </div>
          </div>

          {/* Filtros y búsqueda */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 animate-slide-up animation-delay-300">
            <div className="flex-1 relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 transition-colors duration-300 group-focus-within:text-amber-600" />
              <Input
                placeholder="Buscar productos..."
                className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-amber-200 hover:shadow-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex gap-2 items-center transition-all duration-300 hover:shadow-md hover:scale-105"
                >
                  <Filter className="h-4 w-4" />
                  Categoría: {selectedCategory}
                  <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="animate-slide-down">
                {categorias.map((categoria, index) => (
                  <DropdownMenuItem
                    key={categoria}
                    onClick={() => setSelectedCategory(categoria)}
                    className={`transition-all duration-200 hover:translate-x-1 ${selectedCategory === categoria ? "bg-green-50 text-green-600" : ""}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {categoria}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Tipo de compra */}
          <div className="flex gap-4 mb-8 animate-slide-up animation-delay-400">
            <Button
              variant="outline"
              className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 transition-all duration-300 hover:scale-105 hover:shadow-md"
            >
              Compra Minorista
            </Button>
            <Button
              variant="outline"
              className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800 transition-all duration-300 hover:scale-105 hover:shadow-md"
            >
              Compra Mayorista
            </Button>
          </div>

          {/* Categorías en chips */}
          <div className="flex flex-wrap gap-2 mb-8 animate-slide-up animation-delay-500">
            {categorias.map((categoria, index) => (
              <Badge
                key={categoria}
                variant={selectedCategory === categoria ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-md ${
                  selectedCategory === categoria ? "bg-amber-600 hover:bg-amber-700 animate-pulse" : "hover:bg-amber-50"
                }`}
                onClick={() => setSelectedCategory(categoria)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {categoria}
              </Badge>
            ))}
          </div>

          {/* Productos */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className="overflow-hidden transition-all duration-500 hover:shadow-xl hover:scale-105 animate-fade-in-up group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-2 right-2 transform translate-x-10 group-hover:translate-x-0 transition-transform duration-300">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full bg-white/80 hover:bg-white transition-all duration-300 hover:scale-110"
                      >
                        <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors duration-300" />
                        <span className="sr-only">Añadir a favoritos</span>
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <span className="text-xs font-medium text-amber-600 animate-pulse">{product.category}</span>
                    </div>
                    <h3 className="font-bold transition-colors duration-300 group-hover:text-amber-700">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1 mb-2">{product.description}</p>

                    {/* Tabs para seleccionar el peso/precio */}
                    <Tabs defaultValue="X250G" className="mt-3">
                      <TabsList className="grid grid-cols-3 mb-2 transition-all duration-300">
                        <TabsTrigger value="X250G" className="transition-all duration-300 hover:scale-105">
                          250g
                        </TabsTrigger>
                        <TabsTrigger value="500G" className="transition-all duration-300 hover:scale-105">
                          500g
                        </TabsTrigger>
                        <TabsTrigger value="Kilo" className="transition-all duration-300 hover:scale-105">
                          Kilo
                        </TabsTrigger>
                      </TabsList>

                      {/* Contenido para cada peso */}
                      <TabsContent value="X250G" className="mt-0 animate-fade-in">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-lg transition-all duration-300 group-hover:text-amber-600">
                            {product.prices["X250G"]}
                          </span>
                          <Button
                            size="sm"
                            className="bg-amber-700 hover:bg-amber-800 transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
                            onClick={() => addToCart(product.name, "250g", product.prices["X250G"])}
                          >
                            <ShoppingBag className="h-4 w-4 mr-1 transition-transform duration-300 group-hover:rotate-12" />{" "}
                            Comprar
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="500G" className="mt-0 animate-fade-in">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-lg transition-all duration-300 group-hover:text-amber-600">
                            {product.prices["500G"]}
                          </span>
                          <Button
                            size="sm"
                            className="bg-amber-700 hover:bg-amber-800 transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
                            onClick={() => addToCart(product.name, "500g", product.prices["500G"])}
                          >
                            <ShoppingBag className="h-4 w-4 mr-1 transition-transform duration-300 group-hover:rotate-12" />{" "}
                            Comprar
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="Kilo" className="mt-0 animate-fade-in">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-lg transition-all duration-300 group-hover:text-amber-600">
                            {product.prices["Kilo"]}
                          </span>
                          <Button
                            size="sm"
                            className="bg-amber-700 hover:bg-amber-800 transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
                            onClick={() => addToCart(product.name, "1 kilo", product.prices["Kilo"])}
                          >
                            <ShoppingBag className="h-4 w-4 mr-1 transition-transform duration-300 group-hover:rotate-12" />{" "}
                            Comprar
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 animate-fade-in">
              <div className="mb-4 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto animate-bounce" />
              </div>
              <h3 className="text-xl font-bold mb-2 animate-slide-up">No se encontraron productos</h3>
              <p className="text-muted-foreground animate-slide-up animation-delay-100">
                No hay productos que coincidan con tu búsqueda. Intenta con otros términos o categorías.
              </p>
              <Button
                className="mt-4 bg-amber-700 hover:bg-amber-800 transition-all duration-300 hover:scale-110 hover:shadow-lg animate-slide-up animation-delay-200"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("Todas")
                  window.open(
                    "https://wa.me/542235256172?text=Hola%2C%20me%20gustar%C3%ADa%20conocer%20todos%20los%20productos%20disponibles.",
                    "_blank",
                  )
                }}
              >
                Ver todos los productos
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-gray-50 animate-slide-up">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Image
                src="https://i.ibb.co/jvz0rVS0/hojitaverde.png"
                alt="Saintmery Logo"
                width={150}
                height={50}
                className="h-12 w-auto transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="flex gap-8">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-amber-600 transition-all duration-300 hover:translate-y-1"
              >
                Inicio
              </Link>
              <Link
                href="/#contacto"
                className="text-sm text-muted-foreground hover:text-amber-600 transition-all duration-300 hover:translate-y-1"
              >
                Contacto
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-amber-600 transition-all duration-300 hover:translate-y-1"
              >
                Términos y Condiciones
              </Link>
            </div>
          </div>
          <div className="border-t mt-6 pt-6 text-center text-sm text-muted-foreground animate-fade-in">
            © {new Date().getFullYear()} Saintmery. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <WhatsAppButton />

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  )
}
