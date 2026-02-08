
export enum Page {
  BERANDA = 'beranda',
  TENTANG = 'tentang',
  ARTIKEL = 'artikel',
  KONTAK = 'kontak',
  MENU_LENGKAP = 'menu_lengkap',
  LOGIN = 'login',
  DASHBOARD = 'dashboard'
}

export type MenuCategory = 'Semua' | 'Kopi' | 'Non-Kopi' | 'Jus' | 'Cemilan' | 'Makanan';

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  category: MenuCategory;
  image: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
}

export interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  lastLogin: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
