
import { MenuItem, Article } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // KOPI
  { id: 'k1', name: 'Signature Tomo Latte', price: 'Rp 35.000', description: 'Espresso dengan susu creamy dan sentuhan rahasia Cocho.', category: 'Kopi', image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=400&h=300&fit=crop' },
  { id: 'k2', name: 'Dark Mocha Cocho', price: 'Rp 38.000', description: 'Paduan sempurna cokelat premium dan espresso robusta.', category: 'Kopi', image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&h=300&fit=crop' },
  { id: 'k3', name: 'Caramel Macchiato', price: 'Rp 40.000', description: 'Lapisan vanila, espresso, dan saus karamel.', category: 'Kopi', image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&h=300&fit=crop' },
  { id: 'k4', name: 'Espresso Double', price: 'Rp 25.000', description: 'Ekstraksi kopi murni dengan krema tebal.', category: 'Kopi', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop' },
  { id: 'k5', name: 'Iced Americano', price: 'Rp 28.000', description: 'Kesegaran kopi hitam klasik dengan es batu.', category: 'Kopi', image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=400&h=300&fit=crop' },
  { id: 'k6', name: 'Cappuccino Velvet', price: 'Rp 34.000', description: 'Busa susu lembut dengan taburan cokelat.', category: 'Kopi', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&h=300&fit=crop' },
  { id: 'k7', name: 'Hazelnut Praline', price: 'Rp 42.000', description: 'Kopi manis dengan aroma kacang hazelnut.', category: 'Kopi', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop' },
  { id: 'k8', name: 'Vanilla Bean Latte', price: 'Rp 38.000', description: 'Susu vanila organik berpadu espresso.', category: 'Kopi', image: 'https://images.unsplash.com/photo-1572286258217-40142c1c6a70?w=400&h=300&fit=crop' },
  { id: 'k9', name: 'Affogato Style', price: 'Rp 35.000', description: 'Es krim vanila disiram espresso panas.', category: 'Kopi', image: 'https://images.unsplash.com/photo-1594631252845-59fc59739e83?w=400&h=300&fit=crop' },
  { id: 'k10', name: 'Vietnamese Drip', price: 'Rp 30.000', description: 'Kopi pekat dengan susu kental manis.', category: 'Kopi', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop' },
  { id: 'k11', name: 'Rum Raisin Coffee', price: 'Rp 45.000', description: 'Varian kopi eksklusif dengan aroma rum.', category: 'Kopi', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop' },

  // NON-KOPI
  { id: 'nk1', name: 'Matcha Zen', price: 'Rp 32.000', description: 'Matcha Jepang berkualitas tinggi dengan susu segar.', category: 'Non-Kopi', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=300&fit=crop' },
  { id: 'nk2', name: 'Red Velvet Silk', price: 'Rp 35.000', description: 'Minuman manis gurih dengan warna merah ikonik.', category: 'Non-Kopi', image: 'https://images.unsplash.com/photo-1582042122176-069796677f2f?w=400&h=300&fit=crop' },
  { id: 'nk3', name: 'Royal Thai Tea', price: 'Rp 28.000', description: 'Teh Thailand autentik dengan rempah pilihan.', category: 'Non-Kopi', image: 'https://images.unsplash.com/photo-1594631252845-59fc59739e83?w=400&h=300&fit=crop' },

  // JUS
  { id: 'j1', name: 'Tropical Mango', price: 'Rp 30.000', description: 'Mangga segar pilihan tanpa pemanis buatan.', category: 'Jus', image: 'https://images.unsplash.com/photo-1544054158-422e9d759a78?w=400&h=300&fit=crop' },
  { id: 'j2', name: 'Berry Blast', price: 'Rp 35.000', description: 'Campuran strawberry, blueberry, dan raspberry.', category: 'Jus', image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=400&h=300&fit=crop' },

  // CEMILAN
  { id: 'c1', name: 'Butter Croissant', price: 'Rp 22.000', description: 'Pastry renyah dengan aroma mentega yang kuat.', category: 'Cemilan', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop' },
  { id: 'c2', name: 'Almond Brownies', price: 'Rp 25.000', description: 'Cokelat padat dengan taburan kacang almond.', category: 'Cemilan', image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=400&h=300&fit=crop' },

  // MAKANAN
  { id: 'm1', name: 'Tomo Beef Burger', price: 'Rp 55.000', description: 'Daging sapi premium dengan saus BBQ khas Tomo.', category: 'Makanan', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop' },
  { id: 'm2', name: 'Creamy Carbonara', price: 'Rp 48.000', description: 'Pasta dengan saus krim telur dan keju parmesan.', category: 'Makanan', image: 'https://images.unsplash.com/photo-1612450866927-42f0b9102431?w=400&h=300&fit=crop' }
];

export const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Seni Memilih Biji Kopi Terbaik',
    excerpt: 'Menemukan karakter rasa yang sesuai dengan kepribadian Anda melalui origin biji kopi.',
    content: 'Kopi bukan sekadar minuman, ia adalah perjalanan rasa...',
    date: '12 Mei 2024',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop'
  },
  {
    id: '2',
    title: 'Mengapa Coffee Break itu Penting?',
    excerpt: 'Bagaimana jeda minum kopi meningkatkan produktivitas dan kreativitas di tempat kerja.',
    content: 'Dalam hiruk pikuk pekerjaan, secangkir kopi adalah sauh...',
    date: '08 Mei 2024',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop'
  }
];
