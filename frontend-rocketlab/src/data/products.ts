import type { Product } from '../contexts/CartContext'; // Ajuste o caminho conforme sua estrutura

export const products: Product[] = [
  // --- Notebooks ---
  {
    id: 1,
    name: 'Notebook Gamer Predator X22',
    description: 'Domine seus jogos com o processador Intel Core i9, RTX 4080, 32GB RAM e tela MiniLED de 240Hz.',
    price: 17999.90,
    image: 'https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=600', // Laptop em uma mesa
    category: 'Notebooks',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Ultrabook Swift Air 13"',
    description: 'Leveza e performance para o dia a dia. Intel Core i7 Evo, 16GB RAM, SSD 1TB e design premium.',
    price: 8250.00,
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=600', // Laptop aberto
    category: 'Notebooks',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Notebook Convertível Yoga Pro',
    description: 'Versatilidade 2 em 1 com tela touchscreen QHD de 14", caneta inclusa e performance AMD Ryzen 7.',
    price: 7890.50,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600', // Laptop sendo usado
    category: 'Notebooks',
    rating: 4.6,
  },
  {
    id: 4,
    name: 'Chromebook Flex 11"',
    description: 'Ideal para estudantes e tarefas online. Leve, rápido, seguro e com longa duração de bateria.',
    price: 1899.00,
    image: 'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=600', // Laptop simples
    category: 'Notebooks',
    rating: 4.3,
  },

  // --- Mouses ---
  {
    id: 5,
    name: 'Mouse Gamer Óptico RGB ViperX',
    description: 'Sensor de 24.000 DPI, 8 botões programáveis, design ambidestro e iluminação RGB personalizável.',
    price: 349.90,
    image: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=600', // Setup com mouse e teclado iluminados
    category: 'Mouses',
    rating: 4.8,
  },
  {
    id: 6,
    name: 'Mouse Ergonômico Sem Fio Lift MX',
    description: 'Conforto prolongado com design vertical, conexão Bluetooth/USB e botões silenciosos.',
    price: 420.00,
    image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=600', // Mouse ergonômico
    category: 'Mouses',
    rating: 4.7,
  },
  {
    id: 7,
    name: 'Mouse Portátil Bluetooth Slim',
    description: 'Super fino e leve, ideal para viagens. Conexão Bluetooth estável e sensor preciso.',
    price: 129.00,
    image: 'https://images.pexels.com/photos/6180010/pexels-photo-6180010.jpeg?auto=compress&cs=tinysrgb&w=600', // Mouse simples
    category: 'Mouses',
    rating: 4.4,
  },
  {
    id: 8,
    name: 'Mousepad Gamer Control XXL',
    description: 'Superfície de tecido otimizada para controle, base emborrachada antiderrapante, 90x40cm.',
    price: 119.90,
    image: 'https://images.pexels.com/photos/392018/pexels-photo-392018.jpeg?auto=compress&cs=tinysrgb&w=600', // Desktop com mousepad
    category: 'Mouses', // Ou Acessórios
    rating: 4.9,
  },

  // --- Teclados ---
  {
    id: 9,
    name: 'Teclado Mecânico Gamer K9 RGB Pro',
    description: 'Switches ópticos Red, ABNT2, teclas PBT, iluminação RGB por tecla e macros programáveis.',
    price: 780.00,
    image: 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=600', // Teclado mecânico RGB
    category: 'Teclados',
    rating: 4.9,
  },
  {
    id: 10,
    name: 'Teclado Sem Fio Compacto K3 Slim',
    description: 'Layout 75%, perfil baixo, conexão Bluetooth multidispositivo e teclas macias.',
    price: 499.50,
    image: 'https://images.pexels.com/photos/4005571/pexels-photo-4005571.jpeg?auto=compress&cs=tinysrgb&w=600', // Teclado com tablet
    category: 'Teclados',
    rating: 4.6,
  },
  {
    id: 11,
    name: 'Teclado Ergonômico Sculpt Comfort',
    description: 'Design dividido e contornado para postura natural, descanso de pulso e teclas silenciosas.',
    price: 620.00,
    image: 'https://images.pexels.com/photos/572056/pexels-photo-572056.jpeg?auto=compress&cs=tinysrgb&w=600', // Teclado em uma mesa
    category: 'Teclados',
    rating: 4.5,
  },
  {
    id: 12,
    name: 'Kit Teclado e Mouse Sem Fio Office Basic',
    description: 'Solução completa e confiável para escritório, ABNT2, design simples e funcional.',
    price: 189.90,
    image: 'https://images.pexels.com/photos/2528118/pexels-photo-2528118.jpeg?auto=compress&cs=tinysrgb&w=600', // Teclado e mouse brancos
    category: 'Teclados', // Ou Kits
    rating: 4.3,
  },

  // --- Fones de Ouvido / Headsets ---
  {
    id: 13,
    name: 'Headset Gamer HyperX Cloud Alpha S',
    description: 'Som Surround 7.1, drivers de câmara dupla, microfone com cancelamento de ruído e conforto premium.',
    price: 899.00,
    image: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=600', // Headset gamer
    category: 'Fones de Ouvido',
    rating: 4.8,
  },
  {
    id: 14,
    name: 'Fones Bluetooth Sony WH-1000XM5',
    description: 'Cancelamento de ruído líder de mercado, áudio de alta resolução e conforto excepcional.',
    price: 1999.00,
    image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=600', // Pessoa com fone de ouvido
    category: 'Fones de Ouvido',
    rating: 4.9,
  },
  {
    id: 15,
    name: 'Earbuds True Wireless Galaxy Buds Pro 2',
    description: 'Som imersivo, cancelamento de ruído ativo inteligente e design compacto e confortável.',
    price: 950.00,
    image: 'https://images.pexels.com/photos/6270478/pexels-photo-6270478.jpeg?auto=compress&cs=tinysrgb&w=600', // Earbuds na case
    category: 'Fones de Ouvido',
    rating: 4.7,
  },
  {
    id: 16,
    name: 'Headset para Conferência Logitech H390',
    description: 'Microfone com cancelamento de ruído, áudio estéreo e controles integrados. Ideal para chamadas.',
    price: 230.00,
    image: 'https://images.pexels.com/photos/5082976/pexels-photo-5082976.jpeg?auto=compress&cs=tinysrgb&w=600', // Pessoa em vídeo chamada com headset
    category: 'Fones de Ouvido',
    rating: 4.4,
  },

  // --- Monitores ---
  {
    id: 17,
    name: 'Monitor Gamer Alienware AW3423DWF QD-OLED',
    description: 'Tela QD-OLED de 34" ultrawide curva, 165Hz, tempo de resposta de 0.1ms e cores vibrantes.',
    price: 7500.00,
    image: 'https://images.pexels.com/photos/1999463/pexels-photo-1999463.jpeg?auto=compress&cs=tinysrgb&w=600', // Monitor em setup gamer
    category: 'Monitores',
    rating: 4.9,
  },
  {
    id: 18,
    name: 'Monitor Dell UltraSharp U2723QE 4K Hub USB-C',
    description: 'Resolução 4K, tecnologia IPS Black, ampla cobertura de cores e hub USB-C para produtividade.',
    price: 4200.00,
    image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=600', // Monitor profissional
    category: 'Monitores',
    rating: 4.8,
  },
  {
    id: 19,
    name: 'Monitor Portátil Arzopa 15.6" Full HD IPS',
    description: 'Tela IPS Full HD, leve e fino, ideal como segundo monitor para notebooks. Conexão USB-C/HDMI.',
    price: 890.00,
    image: 'https://images.pexels.com/photos/777000/pexels-photo-777000.jpeg?auto=compress&cs=tinysrgb&w=600', // Monitor em mesa
    category: 'Monitores',
    rating: 4.6,
  },
  {
    id: 20,
    name: 'Monitor LG 24" Full HD IPS Bordas Finas',
    description: 'Design elegante com bordas finas, painel IPS para cores vivas e bom ângulo de visão.',
    price: 750.00,
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600', // Pessoa trabalhando em frente a monitor
    category: 'Monitores',
    rating: 4.5,
  },
  
  // --- Celulares ---
  {
    id: 21,
    name: 'Smartphone Galaxy S25 Ultra',
    description: 'Câmera de 200MP, processador Snapdragon de última geração, tela Dynamic AMOLED 2X e S Pen integrada.',
    price: 8999.00,
    image: 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=600', // Smartphone
    category: 'Celulares',
    rating: 4.9,
  },
  {
    id: 22,
    name: 'iPhone 16 Pro Max',
    description: 'Chip A18 Bionic, sistema de câmera Pro avançado, tela ProMotion e design em titânio.',
    price: 9999.00,
    image: 'https://images.pexels.com/photos/14782765/pexels-photo-14782765.jpeg?auto=compress&cs=tinysrgb&w=600', // iPhones
    category: 'Celulares',
    rating: 4.9,
  },
  {
    id: 23,
    name: 'Smartphone Pixel 9 Pro',
    description: 'Experiência Android pura, câmera com IA avançada, chip Tensor G4 e atualizações rápidas.',
    price: 6500.00,
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600', // Mão segurando smartphone
    category: 'Celulares',
    rating: 4.8,
  },
  {
    id: 24,
    name: 'Celular Intermediário Redmi Note 14 Pro',
    description: 'Excelente custo-benefício com tela AMOLED 120Hz, câmera de 108MP e bateria de longa duração.',
    price: 2200.00,
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=600', // Vários smartphones
    category: 'Celulares',
    rating: 4.7,
  },
];