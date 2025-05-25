import type { Product } from '../contexts/CartContext';

export const products: Product[] = [
  {
    id: 1,
    name: 'Notebook Gamer Pro X1',
    description: 'Performance extrema com Intel i9, RTX 4090, 32GB RAM e SSD 2TB NVMe. Tela 240Hz.',
    price: 14500.90,
    image: 'https://images.pexels.com/photos/38568/macbook-apple-imac-ipad-38568.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Notebooks', // NOVO
    rating: 4.8,          // NOVO (ex: 0-5)
  },
  {
    id: 2,
    name: 'Mouse Gamer HyperSpeed Z',
    description: 'Sensor óptico de 20.000 DPI, sem fio com baixa latência e design ergonômico RGB.',
    price: 320.50,
    image: 'https://images.pexels.com/photos/459762/pexels-photo-459762.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Periféricos',
    rating: 4.5,
  },
  {
    id: 3,
    name: 'Teclado Mecânico K7 RGB',
    description: 'Switches ópticos Red, ABNT2, iluminação RGB por tecla e descanso de pulso magnético.',
    price: 550.00,
    image: 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Periféricos',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Headset Gamer Surround 7.1',
    description: 'Áudio imersivo 7.1, microfone com cancelamento de ruído e conforto para longas sessões.',
    price: 480.75,
    image: 'https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Áudio',
    rating: 4.3,
  },
  {
    id: 5,
    name: 'Monitor Gamer Curvo 32" QHD',
    description: 'Tela curva de 32 polegadas, resolução QHD (2560x1440), 165Hz e 1ms de resposta.',
    price: 2800.00,
    image: 'https://images.pexels.com/photos/1999463/pexels-photo-1999463.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Monitores',
    rating: 4.9,
  },
  {
    id: 6,
    name: 'Cadeira Gamer Ergonômica Alpha',
    description: 'Conforto superior com design ergonômico, ajuste de altura, inclinação e almofadas lombar e cervical.',
    price: 1250.00,
    image: 'https://images.pexels.com/photos/7210748/pexels-photo-7210748.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Cadeiras Gamer',
    rating: 4.6,
  }
];