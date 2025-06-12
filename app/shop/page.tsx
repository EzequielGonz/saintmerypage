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
import { Navbar } from "@/components/navbar"
import { Cart } from "@/components/cart"
import { useCart, Product } from "@/lib/cart-context"

// Actualizar la lista de categorías disponibles
const categorias = ["Todas", "Frutos Secos", "Mix", "Granola", "Semillas", "AvenaHarinasyFeculas"]

// Actualizar las categorías de los productos de ejemplo con 3 precios diferentes
const productos: Product[] = [
  {
    id: 1352,
    name: "ALMENDRAS NONPAREI",
    prices: {
      X250G: "$6.050",
      "500G": "$10.950",
      Kilo: "$19.900",
    },
    category: "Frutos Secos",
    description: "Las almendras Nonpareil son una variedad premium, reconocida por su forma alargada, piel clara y delgada, y textura suave.",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_743628-MLC45358861265_032021-F.jpg",
  },
  {
    id: 1354,
    name: "ALMENDRAS GUARA",
    prices: {
      X250G: "$5.650",
      "500G": "$10.200",
      Kilo: "$18.500",
    },
    category: "Frutos Secos",
    description: "Las almendras Guara son una variedad de origen español, conocida por su forma redondeada, piel fina y sabor dulce.",
    image: "https://miserdiet.com.ar/wp-content/uploads/2022/08/Almendras-guara.jpg",
  },
  {
    id: 1356,
    name: "ARANDANOS DESHIDRATADOS",
    prices: {
      X250G: "$4.350",
      "500G": "$7.850",
      Kilo: "$13.850",
    },
    category: "Frutos Secos",
    description: "Los arándanos deshidratados son una excelente opción para incorporar antioxidantes y fibra a tu dieta.",
    image: "https://dam.cocinafacil.com.mx/wp-content/uploads/2018/05/arandanos-deshidratados.jpg",
  },
  {
    id: 1358,
    name: "AVELLANAS PELADAS",
    prices: {
      X250G: "$7.990",
      "500G": "$14.500",
      Kilo: "$26.350",
    },
    category: "Frutos Secos",
    description: "Las avellanas peladas son una excelente fuente de grasas saludables, proteínas y minerales, ideales para consumir solas o incorporar en recetas dulces y saladas.",
    image: "https://tse1.mm.bing.net/th/id/OIP.vwxD8lbA6FFX_Ctig5VOtQHaJ4?rs=1&pid=ImgDetMain",
  },
  {
    id: 1360,
    name: "BANANAS EN CHIP",
    prices: {
      X250G: "$2.900",
      "500G": "$5.200",
      Kilo: "$9.450",
    },
    category: "Frutos Secos",
    description: "Las chips de banana son un snack delicioso y nutritivo, ideal para consumir solo, mezclar con frutos secos o agregar a granolas y postres.",
    image: "https://tse2.mm.bing.net/th/id/OIP.KLIEkGNeZbfR1Wh04SBUDQHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: 1362,
    name: "CIRUELA SIN CAROZO",
    prices: {
      "500G": "$4.560",
      Kilo: "$8.290",
    },
    category: "Frutos Secos",
    description: "Las ciruelas sin carozo son una excelente fuente de fibra, potasio y antioxidantes, ideales para consumir como snack o incorporar en diversas recetas.",
    image: "https://tse3.mm.bing.net/th/id/OIP.oAvCQXYKT5Fv1EMoApkyMgHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: 1364,
    name: "CASTAÑAS DE CAJU",
    prices: {
      X250G: "$4.950",
      "500G": "$8.850",
      Kilo: "$15.980",
    },
    category: "Frutos Secos",
    description: "Las castañas de cajú son un snack saludable y versátil, rico en grasas saludables, proteínas y minerales.",
    image: "https://www.fmdos.cl/wp-content/uploads/2017/05/Casta%C3%B1as-de-caju2.jpg",
  },
  {
    id: 1368,
    name: "COCO EN ESCAMAS",
    prices: {
      X250G: "$5.100",
      "500G": "$9.250",
      Kilo: "$16.750",
    },
    category: "Frutos Secos",
    description: "El coco en escamas es un ingrediente versátil y nutritivo, ideal para repostería, granolas, smoothies y snacks saludables.",
    image: "https://tse4.mm.bing.net/th/id/OIP.4cirenI-REtkMSCdSmKmVwHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: 1370,
    name: "DATILES",
    prices: {
      "500G": "$5.035",
      Kilo: "$9.150",
    },
    category: "Frutos Secos",
    description: "Los dátiles son una fruta deshidratada rica en fibra, potasio y antioxidantes, ideales para consumir como snack o incorporar en diversas recetas.",
    image: "https://tse2.mm.bing.net/th/id/OIP.46YGuB-9HSptvojrpyl-pQHaEK?rs=1&pid=ImgDetMain",
  },
  {
    id: 1374,
    name: "MANI CON CASCARA GRANDE",
    prices: {
      X250G: "$1.220",
      "500G": "$2.200",
      Kilo: "$3.980",
    },
    category: "Frutos Secos",
    description: "El maní con cáscara grande es simplemente el fruto del maní tal como se cosecha, sin pelar, pero de un tamaño más grande que el habitual.",
    image: "https://tse1.explicit.bing.net/th/id/OIP.0_-Zb57-Arh8od9QQwgY_AHaHX?rs=1&pid=ImgDetMain",
  },
  {
    id: 1376,
    name: "MANI REPELADO SALADO",
    prices: {
      X250G: "$1.030",
      "500G": "$1.860",
      Kilo: "$3.380",
    },
    category: "Frutos Secos",
    description: "El maní repelado salado es un snack clásico en Argentina, ideal para picadas, colaciones o acompañar bebidas.",
    image: "https://tse2.mm.bing.net/th/id/OIP.Xm9kn_MQ63GiN31Ih73SZQHaIM?rs=1&pid=ImgDetMain",
  },
  {
    id: 1378,
    name: "MANI REPELADO SIN SAL",
    prices: {
      X250G: "$1.030",
      "500G": "$1.860",
      Kilo: "$3.380",
    },
    category: "Frutos Secos",
    description: "El maní repelado sin sal es un snack clásico en Argentina, ideal para picadas, colaciones o acompañar bebidas.",
    image: "https://tse3.mm.bing.net/th/id/OIP.9mkV2Nn-WxSFm_3yPHZPsAHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: 1380,
    name: "NUEZ CON CASCARA",
    prices: {
      X250G: "$2.500",
      "500G": "$4.500",
      Kilo: "$8.150",
    },
    category: "Frutos Secos",
    description: "La nuez con cáscara es el fruto seco en su estado natural, protegido por una cáscara dura que ayuda a conservar su frescura y propiedades nutricionales.",
    image: "https://tse1.mm.bing.net/th/id/OIP.TqMl91xtMyXWCMtqcZkMXwHaFG?rs=1&pid=ImgDetMain",
  },
  {
    id: 1382,
    name: "NUEZ MARIPOSA",
    prices: {
      X250G: "$6.700",
      "500G": "$12.200",
      Kilo: "$22.150",
    },
    category: "Frutos Secos",
    description: "La nuez mariposa es una variedad de nuez de nogal (Juglans regia) reconocida por su forma distintiva que recuerda a las alas de una mariposa.",
    image: "https://th.bing.com/th/id/OIP.xb-szWajRwioEz7m6-OGJAHaHa?o=7rm=3&rs=1&pid=ImgDetMain",
  },
  {
    id: 1383,
    name: "NUEZ PECAN MARIPOSA",
    prices: {
      "500G": "$14.500",
      Kilo: "$25.650",
    },
    category: "Frutos Secos",
    description: "La nuez pecan mariposa es una variedad premium de nuez pecan, reconocida por su forma alargada y simétrica que recuerda a las alas de una mariposa.",
    image: "https://tse4.mm.bing.net/th/id/OIP.IaepGwkqPTxPTzYrL3-GsAHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: 1384,
    name: "PASAS DE UVA JUMBO",
    prices: {
      X250G: "$2.060",
      "500G": "$3.750",
      Kilo: "$6.750",
    },
    category: "Frutos Secos",
    description: "Las pasas de uva jumbo son una variedad de uvas secas de mayor tamaño, jugosas y sin semillas, ideales para consumir como snack, en repostería o mezcladas con otros frutos secos.",
    image: "https://tse1.mm.bing.net/th/id/OIP.83b8B1okJYHSxdxBN6xELgHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: 1386,
    name: "PASAS DE UVA SULTANINA",
    prices: {
      X250G: "$1.750",
      "500G": "$3.150",
      Kilo: "$5.690",
    },
    category: "Frutos Secos",
    description: "Las pasas de uva sultanina son una variedad de uvas secas pequeñas y doradas, ideales para consumir como snack, en repostería o mezcladas con otros frutos secos.",
    image: "https://tse1.mm.bing.net/th/id/OIP.UA-bTAGaND-sMCOwOgSvLgHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: 1388,
    name: "PASAS DE UVA RUBIA",
    prices: {
      X250G: "$2.860",
      "500G": "$5.200",
      Kilo: "$9.450",
    },
    category: "Frutos Secos",
    description: "Las pasas de uva rubia son una variedad de uvas secas, deshidratadas y sin semillas, conocidas por su sabor dulce y textura jugosa.",
    image: "https://th.bing.com/th/id/OIP.p3EVorUKhC7WUEoEfHFEUAHaFC?o=7rm=3&rs=1&pid=ImgDetMain",
  },
  {
    id: 1390,
    name: "PISTACHOS SALADOS CON CASCARA",
    prices: {
      X250G: "$12.900",
      "500G": "$23.500",
      Kilo: "$42.500",
    },
    category: "Frutos Secos",
    description: "Los pistachos son un fruto seco delicioso y nutritivo, ideal para consumir solos, en ensaladas, postres o como parte de una dieta saludable.",
    image: "https://miserdiet.com.ar/wp-content/uploads/2022/08/pistachos.jpg",
  },
  {
    id: 1336,
    name: "MIX FRUTAS SECAS CLASICO",
    prices: {
      "500G": "$4.350",
      Kilo: "$7.850",
    },
    category: "Mix",
    description: "mani,pasas,nueces y almendras.",
    image: "https://tse4.mm.bing.net/th/id/OIP.sG37AnvaeLWTEvZLnXxWDAHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: 1338,
    name: "MIX FRUTAS SECAS TROPICAL",
    prices: {
      "500G": "$5.000",
      Kilo: "$9.060",
    },
    category: "Mix",
    description: "mani,pasas,castañas,nuez,almendras y banana.",
    image: "https://tse2.mm.bing.net/th/id/OIP.FRuaQjq3CVO4C7wIMqhPlwHaEQ?rs=1&pid=ImgDetMain",
  },
  {
    id: 1340,
    name: "MIX FRUTAS SECAS PREMIUM",
    prices: {
      "500G": "$5.650",
      Kilo: "$10.200",
    },
    category: "Mix",
    description: "mani,pasas rubias y morochas,nuez,almendras,castañas",
    image: "https://tse2.mm.bing.net/th/id/OIP.qaue7Lbka1o900bOwi7P8wHaFQ?rs=1&pid=ImgDetMain",
  },
  {
    id: 1341,
    name: "MIX ESPECIAL SIN PASAS",
    prices: {
      "500G": "$5.850",
      Kilo: "$10.550",
    },
    category: "Mix",
    description: "mani,castañas,almendras y nuez",
    image: "https://tse3.mm.bing.net/th/id/OIP.99-Udfqr7uvo38093TuWVQHaFQ?rs=1&pid=ImgDetMain",
  },
  {
    id: 1342,
    name: "MIX ESPECIASL SIN MANI",
    prices: {
      "500G": "$6.400",
      Kilo: "$11.600",
    },
    category: "Mix",
    description: "pasas rubias y morochas,castañas,almendras y nuez.",
    image: "https://th.bing.com/th/id/R.46e1837bfdd51f8817620d5600bb3960?rik=LwFOx91sos4FpA&riu=http%3a%2f%2facdn.mitiendanube.com%2fstores%2f001%2f229%2f173%2fproducts%2fmix-de-frutos-secos-con-pasas-12-kg-d_nq_np_589905-mla25107800259_102016-f1-799a1be3d88edbecbb15945260039537-640-0.jpg&ehk=hfVZPfoQi%2fDoV%2btdG7eshwcd4WlgM4mioLO2MK738sQ%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: 1344,
    name: "MIX TENTACION",
    prices: {
      "500G": "$8.800",
      Kilo: "$15.990",
    },
    category: "Mix",
    description: "coco esc. y rallado,chips de choco,almendra,castaña,nuez y arandano.",
    image: "https://tse2.mm.bing.net/th/id/OIP.tRRhId1MJB8HevmcAwO9LQHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: 1346,
    name: "MIX SAINT",
    prices: {
      "500G": "$10.250",
      Kilo: "$18.550",
    },
    category: "Mix",
    description: "nueces,almendras y castañas",
    image: "https://tse1.explicit.bing.net/th/id/OIP.5JXWVtXUmYOuli3Rp8wKPAHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: 1348,
    name: "MIX GOLD",
    prices: {
      "500G": "$11.100",
      Kilo: "$20.150",
    },
    category: "Mix",
    description: "nueces,almendras, castañas y avellanas.",
    image: "https://mercaditodigital.com.bo/wp-content/uploads/2023/06/mix-frutos-secos.jpg",
  },
  {
    id: 1349,
    name: "MIX SALADO",
    prices: {
      "500G": "$4.650",
      Kilo: "$8.450",
    },
    category: "Mix",
    description: "girasol, mani, maiz frito, semilla de zappallo",
    image: "https://tse3.mm.bing.net/th/id/OIP.Yv01CXgLDzocQxP5QHN3WwHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: 1450,
    name: "GRANOLA CLASICA",
    prices: {
      "500G": "$2.100",
      Kilo: "$3.800",
    },
    category: "Granola",
    description: "mani,pasas,avena,copos naturales y hebras.",
    image: "https://tse2.mm.bing.net/th/id/OIP.xI-I7WhMpn2liWLINcVWsQHaJK?rs=1&pid=ImgDetMain",
  },
  {
    id: 1452,
    name: "GRANOLA CON MIEL",
    prices: {
      X500G: "$2.100",
      Kilo: "$3.800",
    },
    category: "Granola",
    description: "mani, pasas,avena c extracto de miel,copos y hebras.",
    image: "https://tse1.mm.bing.net/th/id/OIP.mV0GTeUEfgjq6x93pqdJMgHaLG?rs=1&pid=ImgDetMain",
  },
  {
    id: 1454,
    name: "GRANOLA CON COCO",
    prices: {
      "500G": "$2.500",
      Kilo: "$4.500",
    },
    category: "Granola",
    description: "mani, pasas,avena c extracto de miel,copos,hebras y coco.",
    image: "https://tse1.mm.bing.net/th/id/OIP.LhxUe6vD8xvTDH8O01tDTgHaFz?rs=1&pid=ImgDetMain",
  },
  {
    id: 1456,
    name: "GRANOLA CRUJIENTE",
    prices: {
      "500G": "$2.750",
      Kilo: "$4.950",
    },
    category: "Granola",
    description: "copos,aritos de miel,hebras,cuadricopo,quinoa pop",
    image: "https://blog.renaware.com/wp-content/uploads/2020/09/Granola-3644-scaled.jpg",
  },
  {
    id: 1462,
    name: "GRANOLA SAINT",
    prices: {
      "500G": "$5.600",
      Kilo: "$10.150",
    },
    category: "Granola",
    description: "granola crocante, arandanos y almendras nonparei",
    image: "https://i0.wp.com/myskn.org/wp-content/uploads/2021/02/Granola-5.jpg?fit=960%2C872&ssl=1",
  },
  {
    id: 1202,
    name: "AMAPOLA",
    prices: {
      "500G": "$8.450",
      Kilo: "$15.350",
    },
    category: "Semillas",
    description: "Semillas de amapola.",
    image: "https://th.bing.com/th/id/OIP.grL6H_2Uo7PbbApKKQoHlgHaE8?o=7rm=3&rs=1&pid=ImgDetMain",
  },
  {
    id: 1206,
    name: "CHIA",
    prices: {
      "500G": "$3.100",
      Kilo: "$5.500",
    },
    category: "Semillas",
    description: "Semillas de chía.",
    image: "https://th.bing.com/th/id/OIP.zA6fr88ezfm_GzqnMu3E6QHaEK?o=7rm=3&rs=1&pid=ImgDetMain",
  },
  {
    id: 1208,
    name: "GIRASOL PELADO",
    prices: {
      "500G": "$2.050",
      Kilo: "$3.680",
    },
    category: "Semillas",
    description: "Semillas de girasol peladas.",
    image: "https://tse2.mm.bing.net/th/id/OIP.cYA7bcHwEoiLf7ztLo6eygHaE7?rs=1&pid=ImgDetMain",
  },
  {
    id: 1210,
    name: "LINO",
    prices: {
      "500G": "$1.100",
      Kilo: "$1.950",
    },
    category: "Semillas",
    description: "Semillas de lino.",
    image: "https://th.bing.com/th/id/OIP.hejpFUoPxSaVh0vFqsQswwHaE7?o=7rm=3&rs=1&pid=ImgDetMain",
  },
  {
    id: 1212,
    name: "QUINOA BLANCA PREMIUM",
    prices: {
      "500G": "$4.380",
      Kilo: "$7.950",
    },
    category: "Semillas",
    description: "Quinoa blanca premium.",
    image: "https://http2.mlstatic.com/D_NQ_NP_791754-MLM25916528106_082017-O.webp",
  },
  {
    id: 1214,
    name: "SESAMO BLANCO",
    prices: {
      "500G": "$4.875",
      Kilo: "$8.860",
    },
    category: "Semillas",
    description: "Semillas de sésamo blanco.",
    image: "https://tse3.mm.bing.net/th/id/OIP.PLYNCKwPK4m2ybZRUdfmpQHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: 1216,
    name: "SESAMO INTEGRAL",
    prices: {
      "500G": "$1.950",
      Kilo: "$3.550",
    },
    category: "Semillas",
    description: "Semillas de sésamo integral.",
    image: "https://tse3.mm.bing.net/th/id/OIP.Dv2hdMj7IZWnljk8LT1ybwHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: 1218,
    name: "SESAMO NEGRO",
    prices: {
      "500G": "$3.850",
      Kilo: "$6.950",
    },
    category: "Semillas",
    description: "Semillas de sésamo negro.",
    image: "https://www.oestepizzaparty.com.ar/wp-content/uploads/2025/05/sesamo-negro.jpg",
  },
  {
    id: 1219,
    name: "MIX DE SESAMO",
    prices: {
      "500G": "$4.550",
      Kilo: "$8.250",
    },
    category: "Semillas",
    description: "Mix de sésamo.",
    image: "https://acdn-us.mitiendanube.com/stores/004/542/496/products/sesamo-33af310099513c77a517182125521911-640-0.webp",
  },
  {
    id: 1220,
    name: "MIX DE SEMILLAS",
    prices: {
      "500G": "$1.650",
      Kilo: "$2.990",
    },
    category: "Semillas",
    description: "Mix de semillas.",
    image: "https://acdn-us.mitiendanube.com/stores/914/913/products/mix-desayuno1-1175617f4c786d490d15677680584648-640-0.jpg",
  },
  {
    id: 1222,
    name: "SEMILLAS ZAPALLO",
    prices: {
      "500G": "$7.850",
      Kilo: "$14.250",
    },
    category: "Semillas",
    description: "Semillas de zapallo.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSk1yvXWzpYdrpD0c1FB0-5A4xGUP7vLtBiQ&s",
  },
  {
    id: 1400,
    name: "AVENA INSTANTANEA",
    prices: {
      "500G": "$1.200",
      Kilo: "$2.100",
    },
    category: "AvenaHarinasyFeculas",
    description: "Avena instantánea.",
    image: "https://acdn-us.mitiendanube.com/stores/001/172/573/products/avena-instantanea1-a2f52909048896047315892228642830-640-0.jpg",
  },
  {
    id: 1402,
    name: "AVENA TRADICIONAL",
    prices: {
      "500G": "$1.200",
      Kilo: "$2.100",
    },
    category: "AvenaHarinasyFeculas",
    description: "Avena tradicional.",
    image: "https://acdn-us.mitiendanube.com/stores/001/187/090/products/927813dc-7ebd-458a-b98b-fb0e50f26dde_nube-b4c1ace716d55924a415950326607012-640-0.jpg",
  },
  {
    id: 1404,
    name: "FECULA DE MAIZ",
    prices: {
      "500G": "$1.050",
      Kilo: "$1.750",
    },
    category: "AvenaHarinasyFeculas",
    description: "Fécula de maíz.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0DTgcjL-OtdGGbkgxc28yP_IDtzbgAZpnJw&s",
  },
  {
    id: 1406,
    name: "FECULA DE MANDIOCA",
    prices: {
      "500G": "$1.030",
      Kilo: "$1.860",
    },
    category: "AvenaHarinasyFeculas",
    description: "Fécula de mandioca.",
    image: "https://acdn-us.mitiendanube.com/stores/002/625/145/products/granola-exotica-2023-03-29t140407-3991-85fbe6bc9cbf8e851316801095749884-1024-1024.jpg",
  },
  {
    id: 1408,
    name: "HARINA DE ARROZ",
    prices: {
      "500G": "$900",
      Kilo: "$1.630",
    },
    category: "AvenaHarinasyFeculas",
    description: "Harina de arroz.",
    image: "https://cdn.recetasderechupete.com/wp-content/uploads/2022/02/Harina-de-arroz.jpg",
  },
  {
    id: 1410,
    name: "HARINA DE AVENA",
    prices: {
      "500G": "$1.150",
      Kilo: "$2.050",
    },
    category: "AvenaHarinasyFeculas",
    description: "Harina de avena.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrhupRrMiuLCMZBWb_g_JpsUhh47JEmJfREQ&s",
  },
  {
    id: 1412,
    name: "HARINA DE COCO",
    prices: {
      "500G": "$3.800",
      Kilo: "$6.850",
    },
    category: "AvenaHarinasyFeculas",
    description: "Harina de coco.",
    image: "https://cdn.aarp.net/content/dam/aarp/food/modern-kitchen/12/1140-how-to-cook-with-coconut-flour-bowl-esp.jpg",
  },
  {
    id: 1414,
    name: "HARINA DE ALMENDRAS C PIEL",
    prices: {
      "500G": "$2.750",
      Kilo: "$4.950",
    },
    category: "AvenaHarinasyFeculas",
    description: "Harina de almendras con piel.",
    image: "https://acdn-us.mitiendanube.com/stores/002/712/058/products/harina-de-almendras-con-piel-547be1ead548323a5217072528323207-1024-1024.png",
  },
  {
    id: 1415,
    name: "HARINA DE ALMENDRAS SIN PIEL",
    prices: {
      "500G": "$2.950",
      Kilo: "$5.299",
    },
    category: "AvenaHarinasyFeculas",
    description: "Harina de almendras sin piel.",
    image: "https://chitza.com.ar/wp-content/uploads/2023/07/006713.jpg",
  },
  {
    id: 1418,
    name: "HARINA DE GARBANZO",
    prices: {
      "500G": "$750",
      Kilo: "$1.300",
    },
    category: "AvenaHarinasyFeculas",
    description: "Harina de garbanzo.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl5gtfA94K46a0grQ4lrtIqKYejWtqeTjaIQ&s",
  },
  {
    id: 1420,
    name: "HARINA DE ALGARROBA",
    prices: {
      "500G": "$1.800",
      Kilo: "$3.250",
    },
    category: "AvenaHarinasyFeculas",
    description: "Harina de algarroba.",
    image: "https://acdn-us.mitiendanube.com/stores/001/172/573/products/harina-de-algarroba1-2f81aaaa5b3224b78415885358820729-640-0.jpg",
  },
  {
    id: 1422,
    name: "HARINA INTEGRAL FINA",
    prices: {
      "500G": "$700",
      Kilo: "$1.150",
    },
    category: "AvenaHarinasyFeculas",
    description: "Harina integral fina.",
    image: "https://miserdiet.com.ar/wp-content/uploads/2022/08/harina-integral-1-1.jpg",
  },
  {
    id: 1424,
    name: "SALVADO DE AVENA",
    prices: {
      "500G": "$1.250",
      Kilo: "$2.250",
    },
    category: "AvenaHarinasyFeculas",
    description: "Salvado de avena.",
    image: "https://acdn-us.mitiendanube.com/stores/002/625/145/products/granola-exotica-151-a69e8072432a102f3016946921636222-1024-1024.png",
  },
  {
    id: 1428,
    name: "SOJA TEXTURIZADO",
    prices: {
      "500G": "$1.020",
      Kilo: "$1.850",
    },
    category: "AvenaHarinasyFeculas",
    description: "Soja texturizada.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGaY43BTH_63PIcLdMiMzk65xlEB_WueizaQ&s",
  },
]

export default function ShopPage() {
  const { getTotalItems, addToCart } = useCart()
  const [filteredProducts, setFilteredProducts] = useState(productos)
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [searchTerm, setSearchTerm] = useState("")
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
  const handleAddToCart = (product: Product, size: string, price: string) => {
    addToCart(product, size, price)
    setCartAnimation(true)
    setTimeout(() => setCartAnimation(false), 600)
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
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-green-800">Nuestra Tienda</h1>
            <p className="text-lg text-green-600">
              Descubrí nuestra selección de productos naturales y saludables.
            </p>
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

          {/* Productos */}
          {filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <Card key={product.id} className="transition-all hover:shadow-lg bg-green-50">
                  <CardContent className="p-6 text-center space-y-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="mx-auto rounded-lg"
                    />
                    <div className="space-y-2">
                      <span className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                        {product.category}
                      </span>
                      <h3 className="text-xl font-bold text-green-800">{product.name}</h3>
                      <p className="text-green-600">{product.description}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {Object.entries(product.prices).map(([size, price]) => (
                        <Button 
                          key={size}
                          size="sm" 
                          className="w-full bg-green-500 hover:bg-green-600 text-white"
                          onClick={() => handleAddToCart(product, size, price)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {size} - {price}
                        </Button>
                      ))}
                    </div>
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

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform translate-x-full transition-transform duration-300 ease-in-out z-50 cart-sidebar">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Carrito de Compras</h2>
            <Button variant="ghost" size="icon" onClick={() => document.querySelector('.cart-sidebar')?.classList.toggle('translate-x-full')}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Cart />
        </div>
      </div>

      {/* Cart Toggle Button */}
      <Button
        className="fixed bottom-4 right-4 bg-green-600 hover:bg-green-700 rounded-full p-4 shadow-lg z-40"
        onClick={() => document.querySelector('.cart-sidebar')?.classList.toggle('translate-x-full')}
      >
        <ShoppingBag className="h-6 w-6" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
          {getTotalItems()}
        </span>
      </Button>

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
