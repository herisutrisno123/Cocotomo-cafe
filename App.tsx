
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Page, MenuCategory, MenuItem, Article, User } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { MENU_ITEMS as INITIAL_MENU, ARTICLES as INITIAL_ARTICLES } from './constants';

type DashboardSubPage = 'ringkasan' | 'profil' | 'beranda' | 'artikel' | 'menu' | 'pengguna';
type UserSubTab = 'daftar' | 'hak_akses';
type MenuSubTab = 'daftar' | 'kategori';

interface CategoryItem {
  id: string;
  name: string;
  isActive: boolean;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.BERANDA);
  const [activeTab, setActiveTab] = useState<string>('Semua');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [activeDashboardSubPage, setActiveDashboardSubPage] = useState<DashboardSubPage>('ringkasan');
  const [userSubTab, setUserSubTab] = useState<UserSubTab>('daftar');
  const [menuSubTab, setMenuSubTab] = useState<MenuSubTab>('daftar');
  
  // Dynamic Data States
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU);
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [categoryList, setCategoryList] = useState<CategoryItem[]>([
    { id: 'c1', name: 'Kopi', isActive: true },
    { id: 'c2', name: 'Non-Kopi', isActive: true },
    { id: 'c3', name: 'Jus', isActive: true },
    { id: 'c4', name: 'Cemilan', isActive: true },
    { id: 'c5', name: 'Makanan', isActive: true },
  ]);
  const [users, setUsers] = useState<User[]>([
    { id: 'u1', name: 'Admin Utama', role: 'Super Admin', email: 'admin@cochotomo.com', lastLogin: 'Hari ini' },
    { id: 'u2', name: 'Barista John', role: 'Editor Menu', email: 'john@cochotomo.com', lastLogin: '2 hari lalu' },
    { id: 'u3', name: 'Sarah Writer', role: 'Kontributor Artikel', email: 'sarah@cochotomo.com', lastLogin: 'Kemarin' }
  ]);
  
  // UI States
  const [showModal, setShowModal] = useState<'menu' | 'article' | 'user' | 'category' | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Profile & Content States
  const [siteData, setSiteData] = useState({
    name: "Cocho Tomo Cafe",
    whatsapp: "81234567890",
    email: "hello@cochotomo.com",
    address: "Jl. Aroma Kopi No. 42, Jakarta Selatan, 12345",
    about: "Menghadirkan kehangatan dalam setiap cangkir sejak 2020. Tempat di mana kopi dan cerita bertemu.",
    heroTitle: "Awali Harimu Dengan Aroma Sempurna",
    heroSub: "Di Cocho Tomo, setiap biji kopi bercerita. Kami menghadirkan kualitas premium langsung ke cangkir Anda melalui teknik roasting terbaik.",
    footerOpWeekdays: "Senin - Jumat: 08:00 - 22:00",
    footerOpWeekends: "Sabtu - Minggu: 09:00 - 23:00"
  });

  const [logoPreview, setLogoPreview] = useState<string | null>("https://drive.google.com/uc?id=1UNnDclNGwOx37k8a8bOEgHBsgwVdolWL");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const heroImages = [
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=90",
    "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=90",
    "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=1200&q=90"
  ];

  useEffect(() => {
    if (currentPage === Page.BERANDA) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [currentPage]);

  const handlePageChange = (newPage: Page) => {
    if (newPage === Page.DASHBOARD && !isLoggedIn) {
      setCurrentPage(Page.LOGIN);
    } else {
      setCurrentPage(newPage);
    }
    window.scrollTo(0, 0);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === 'administrasi' && loginData.password === 'sandi123') {
      setIsLoggedIn(true);
      setCurrentPage(Page.DASHBOARD);
      setLoginData({ username: '', password: '' });
    } else {
      alert("Username atau Password salah! Hubungi sistem administrator.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage(Page.BERANDA);
  };

  // CRUD Functions for Menu
  const saveMenuItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const item: MenuItem = {
      id: editingItem?.id || `m-${Date.now()}`,
      name: formData.get('name') as string,
      price: formData.get('price') as string,
      category: formData.get('category') as MenuCategory,
      description: formData.get('description') as string,
      image: formData.get('image') as string || 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=400'
    };

    if (editingItem) {
      setMenuItems(prev => prev.map(i => i.id === item.id ? item : i));
    } else {
      setMenuItems(prev => [item, ...prev]);
    }
    setShowModal(null);
    setEditingItem(null);
  };

  const deleteMenuItem = (id: string) => {
    if (confirm("Hapus menu ini?")) {
      setMenuItems(prev => prev.filter(i => i.id !== id));
    }
  };

  // CRUD Functions for Categories
  const handleToggleCategory = (id: string) => {
    setCategoryList(prev => prev.map(cat => 
      cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
    ));
  };

  const handleSaveCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newName = formData.get('name') as string;

    if (editingItem) {
      const oldName = editingItem.name;
      // Update Category List
      setCategoryList(prev => prev.map(cat => 
        cat.id === editingItem.id ? { ...cat, name: newName } : cat
      ));
      // Update Menu Items associated with this category
      setMenuItems(prev => prev.map(item => 
        item.category === oldName ? { ...item, category: newName as any } : item
      ));
    } else {
      const newCategory: CategoryItem = {
        id: `c-${Date.now()}`,
        name: newName,
        isActive: true
      };
      setCategoryList(prev => [...prev, newCategory]);
    }
    setShowModal(null);
    setEditingItem(null);
  };

  // CRUD Functions for Articles
  const saveArticle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const article: Article = {
      id: editingItem?.id || `art-${Date.now()}`,
      title: formData.get('title') as string,
      excerpt: formData.get('excerpt') as string,
      content: formData.get('content') as string,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      image: formData.get('image') as string || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600'
    };

    if (editingItem) {
      setArticles(prev => prev.map(a => a.id === article.id ? article : a));
    } else {
      setArticles(prev => [article, ...prev]);
    }
    setShowModal(null);
    setEditingItem(null);
  };

  const deleteArticle = (id: string) => {
    if (confirm("Hapus artikel ini?")) {
      setArticles(prev => prev.filter(a => a.id !== id));
    }
  };

  // CRUD Functions for Users
  const saveUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUser: User = {
      id: editingItem?.id || `u-${Date.now()}`,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as string,
      lastLogin: editingItem?.lastLogin || 'Baru Saja'
    };

    if (editingItem) {
      setUsers(prev => prev.map(u => u.id === newUser.id ? newUser : u));
    } else {
      setUsers(prev => [newUser, ...prev]);
    }
    setShowModal(null);
    setEditingItem(null);
  };

  const deleteUser = (id: string) => {
    if (confirm("Hapus akses admin ini?")) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Derived Categories (only active ones for the public menu)
  const activeCategories = useMemo(() => {
    return ['Semua', ...categoryList.filter(c => c.isActive).map(c => c.name)];
  }, [categoryList]);

  // All categories for the admin select
  const adminCategories = useMemo(() => {
    return categoryList.map(c => c.name);
  }, [categoryList]);

  const filteredMenu = useMemo(() => {
    if (activeTab === 'Semua') return menuItems;
    return menuItems.filter(item => item.category === activeTab);
  }, [activeTab, menuItems]);

  const displayedMenu = useMemo(() => filteredMenu.slice(0, 10), [filteredMenu]);
  const hasMoreItems = filteredMenu.length > 10;

  const renderMenuGrid = (items: MenuItem[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {items.map((item) => (
        <div key={item.id} className="group bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-[#D7CCC8]/30 flex flex-col h-full">
          <div className="h-56 overflow-hidden relative">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#3E2723] shadow-sm">
              {item.category}
            </div>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold font-serif text-[#3E2723]">{item.name}</h3>
              <span className="text-sm font-bold text-[#8D6E63] shrink-0 ml-2">{item.price}</span>
            </div>
            <p className="text-sm text-[#5D4037]/80 leading-relaxed line-clamp-2 mb-4">{item.description}</p>
            <button className="mt-auto w-full py-3 bg-white text-[#3E2723] text-sm font-bold rounded-xl border border-[#D7CCC8] hover:bg-[#3E2723] hover:text-white hover:border-[#3E2723] transition-all">Pesan Sekarang</button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDashboardContent = () => {
    switch (activeDashboardSubPage) {
      case 'ringkasan':
        return (
          <div className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Menu', value: `${menuItems.length} Item`, icon: '☕', color: 'bg-brown-50 text-amber-900' },
                { label: 'Total Artikel', value: `${articles.length} Post`, icon: '✍️', color: 'bg-blue-50 text-blue-700' },
                { label: 'Total Admin', value: `${users.length} User`, icon: '👥', color: 'bg-orange-50 text-orange-700' },
                { label: 'Total Penjualan', value: 'Rp 12.450.000', icon: '💰', color: 'bg-green-50 text-green-700' }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-[#D7CCC8]/30">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${stat.color}`}>{stat.icon}</div>
                  </div>
                  <h3 className="text-[#5D4037] text-sm font-bold uppercase tracking-wider mb-1">{stat.label}</h3>
                  <p className="text-2xl font-bold text-[#3E2723]">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'profil':
        return (
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-[#D7CCC8]/30 p-8 md:p-12 animate-fadeIn">
            <h2 className="text-2xl font-bold text-[#3E2723] mb-8 font-serif border-b border-[#FAF7F2] pb-4">Profil Organisasi</h2>
            <div className="flex flex-col md:flex-row gap-12">
              <div className="flex flex-col items-center space-y-4 shrink-0">
                <label className="block text-sm font-bold text-[#3E2723] uppercase tracking-wider">Logo Kafe</label>
                <div className="relative group">
                  <div className="w-40 h-40 rounded-full border-4 border-[#D7CCC8] overflow-hidden bg-[#FAF7F2] shadow-inner flex items-center justify-center">
                    {logoPreview ? <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" /> : <span className="text-[#3E2723]/20 text-4xl">☕</span>}
                  </div>
                  <button onClick={() => fileInputRef.current?.click()} className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">Ubah Logo</button>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                </div>
              </div>
              <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-[#3E2723] uppercase tracking-wider">Nama Kafe</label>
                  <input type="text" value={siteData.name} onChange={(e) => setSiteData({...siteData, name: e.target.value})} className="w-full bg-[#FAF7F2] border border-[#D7CCC8]/50 rounded-xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-[#3E2723] uppercase tracking-wider">WhatsApp</label>
                  <input type="tel" value={siteData.whatsapp} onChange={(e) => setSiteData({...siteData, whatsapp: e.target.value})} className="w-full bg-[#FAF7F2] border border-[#D7CCC8]/50 rounded-xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-[#3E2723] uppercase tracking-wider">Email Kontak</label>
                  <input type="email" value={siteData.email} onChange={(e) => setSiteData({...siteData, email: e.target.value})} className="w-full bg-[#FAF7F2] border border-[#D7CCC8]/50 rounded-xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-[#3E2723] uppercase tracking-wider">Alamat</label>
                  <input type="text" value={siteData.address} onChange={(e) => setSiteData({...siteData, address: e.target.value})} className="w-full bg-[#FAF7F2] border border-[#D7CCC8]/50 rounded-xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-4 md:col-span-2">
                  <label className="block text-sm font-bold text-[#3E2723] uppercase tracking-wider">Tentang Kami</label>
                  <textarea rows={3} value={siteData.about} onChange={(e) => setSiteData({...siteData, about: e.target.value})} className="w-full bg-[#FAF7F2] border border-[#D7CCC8]/50 rounded-xl px-4 py-3 outline-none" />
                </div>
              </div>
            </div>
            <div className="mt-12 flex justify-end"><button onClick={() => alert("Profil Disimpan!")} className="bg-[#3E2723] text-white px-10 py-3 rounded-xl font-bold hover:bg-[#5D4037] transition-all">Simpan Profil</button></div>
          </div>
        );
      case 'beranda':
        return (
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-[#D7CCC8]/30 p-8 md:p-12 animate-fadeIn">
            <h2 className="text-2xl font-bold text-[#3E2723] mb-8 font-serif">Konten Beranda</h2>
            <div className="space-y-10">
              <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#D7CCC8]/30">
                <label className="block text-sm font-bold text-[#3E2723] uppercase mb-4">Hero Title</label>
                <input type="text" value={siteData.heroTitle} onChange={(e) => setSiteData({...siteData, heroTitle: e.target.value})} className="w-full bg-white border border-[#D7CCC8]/50 rounded-xl px-4 py-3 outline-none mb-4" />
                <label className="block text-sm font-bold text-[#3E2723] uppercase mb-4">Hero Description</label>
                <textarea value={siteData.heroSub} onChange={(e) => setSiteData({...siteData, heroSub: e.target.value})} className="w-full bg-white border border-[#D7CCC8]/50 rounded-xl px-4 py-3 outline-none" rows={3} />
              </div>
              <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#D7CCC8]/30">
                <h3 className="font-bold text-[#3E2723] uppercase text-sm mb-4">Footer Settings</h3>
                <div className="space-y-4">
                  <input type="text" value={siteData.footerOpWeekdays} onChange={(e) => setSiteData({...siteData, footerOpWeekdays: e.target.value})} className="w-full bg-white border border-[#D7CCC8]/50 rounded-xl px-4 py-3 outline-none" placeholder="Weekdays OP" />
                  <input type="text" value={siteData.footerOpWeekends} onChange={(e) => setSiteData({...siteData, footerOpWeekends: e.target.value})} className="w-full bg-white border border-[#D7CCC8]/50 rounded-xl px-4 py-3 outline-none" placeholder="Weekends OP" />
                </div>
              </div>
            </div>
            <div className="mt-10 flex justify-end"><button onClick={() => alert("Beranda Diperbarui!")} className="bg-[#3E2723] text-white px-8 py-3 rounded-xl font-bold transition-all">Perbarui Tampilan</button></div>
          </div>
        );
      case 'artikel':
        return (
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-[#D7CCC8]/30 p-8 md:p-12 animate-fadeIn">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-[#3E2723] font-serif">Artikel</h2>
              <button onClick={() => { setEditingItem(null); setShowModal('article'); }} className="bg-[#3E2723] text-white px-5 py-2 rounded-xl text-sm font-bold">+ Tulis Baru</button>
            </div>
            <div className="space-y-4">
              {articles.map(art => (
                <div key={art.id} className="flex items-center justify-between p-4 bg-[#FAF7F2] rounded-2xl border border-[#D7CCC8]/20 group">
                  <div className="flex items-center space-x-4">
                    <img src={art.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                    <div>
                      <h4 className="font-bold text-[#3E2723]">{art.title}</h4>
                      <p className="text-xs text-[#8D6E63] font-bold">{art.date}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => { setEditingItem(art); setShowModal('article'); }} className="p-2 bg-white rounded-lg text-blue-600 border border-blue-100 hover:bg-blue-50">Edit</button>
                    <button onClick={() => deleteArticle(art.id)} className="p-2 bg-white rounded-lg text-red-600 border border-red-100 hover:bg-red-50">Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'menu':
        return (
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-[#D7CCC8]/30 p-8 md:p-12 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <h2 className="text-2xl font-bold text-[#3E2723] font-serif">Manajemen Menu</h2>
              <div className="flex bg-[#FAF7F2] p-1 rounded-xl border border-[#D7CCC8]/30">
                <button 
                  onClick={() => setMenuSubTab('daftar')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${menuSubTab === 'daftar' ? 'bg-[#3E2723] text-white shadow-md' : 'text-[#8D6E63] hover:bg-[#D7CCC8]/20'}`}
                >
                  Daftar Menu
                </button>
                <button 
                  onClick={() => setMenuSubTab('kategori')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${menuSubTab === 'kategori' ? 'bg-[#3E2723] text-white shadow-md' : 'text-[#8D6E63] hover:bg-[#D7CCC8]/20'}`}
                >
                  Kategori
                </button>
              </div>
            </div>

            {menuSubTab === 'daftar' ? (
              <div className="animate-fadeIn">
                <div className="flex justify-between items-center mb-8">
                  <p className="text-sm text-[#5D4037] font-bold">Total {menuItems.length} Produk Aktif</p>
                  <button onClick={() => { setEditingItem(null); setShowModal('menu'); }} className="bg-[#3E2723] text-white px-5 py-2 rounded-xl text-sm font-bold">+ Menu Baru</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="text-[#8D6E63] border-b border-[#D7CCC8]/20"><tr className="text-sm">
                      <th className="pb-4 font-bold">Nama</th><th className="pb-4 font-bold">Kategori</th><th className="pb-4 font-bold">Harga</th><th className="pb-4 font-bold text-right">Aksi</th>
                    </tr></thead>
                    <tbody className="divide-y divide-[#D7CCC8]/10">{menuItems.map(item => (
                      <tr key={item.id} className="hover:bg-[#FAF7F2]/50">
                        <td className="py-4 font-bold text-[#3E2723]">{item.name}</td>
                        <td className="py-4 text-xs text-[#5D4037]">{item.category}</td>
                        <td className="py-4 text-sm font-bold text-[#3E2723]">{item.price}</td>
                        <td className="py-4 text-right">
                          <button onClick={() => { setEditingItem(item); setShowModal('menu'); }} className="text-[#3E2723] hover:underline text-xs font-bold mr-3">Edit</button>
                          <button onClick={() => deleteMenuItem(item.id)} className="text-red-600 hover:underline text-xs font-bold">Hapus</button>
                        </td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="animate-fadeIn space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-[#5D4037] font-bold">Kelola Kategori Menu</p>
                  <button onClick={() => { setEditingItem(null); setShowModal('category'); }} className="bg-[#3E2723] text-white px-5 py-2 rounded-xl text-sm font-bold">+ Tambah Kategori</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryList.map((cat) => (
                    <div key={cat.id} className={`bg-[#FAF7F2] p-6 rounded-3xl border ${cat.isActive ? 'border-[#D7CCC8]/30' : 'border-red-200 opacity-70'} hover:shadow-md transition-all`}>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-2">
                          <h4 className={`text-lg font-bold ${cat.isActive ? 'text-[#3E2723]' : 'text-red-800'}`}>{cat.name}</h4>
                          {!cat.isActive && <span className="bg-red-100 text-red-600 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Nonaktif</span>}
                        </div>
                        <span className="bg-white px-2 py-1 rounded-lg text-[10px] font-bold text-[#8D6E63] border border-[#D7CCC8]/20">
                          {menuItems.filter(m => m.category === (cat.name as any)).length} Item
                        </span>
                      </div>
                      <p className="text-xs text-[#5D4037] mb-6 opacity-70">Pengaturan khusus untuk produk kategori {cat.name.toLowerCase()}.</p>
                      <div className="flex space-x-3">
                        <button onClick={() => { setEditingItem(cat); setShowModal('category'); }} className="text-xs font-bold text-[#3E2723] hover:underline">Edit Nama</button>
                        <button onClick={() => handleToggleCategory(cat.id)} className={`text-xs font-bold ${cat.isActive ? 'text-red-600' : 'text-green-600'} hover:underline`}>
                          {cat.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case 'pengguna':
        return (
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-[#D7CCC8]/30 p-8 md:p-12 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <h2 className="text-2xl font-bold text-[#3E2723] font-serif">Manajemen Pengguna</h2>
              <div className="flex bg-[#FAF7F2] p-1 rounded-xl border border-[#D7CCC8]/30">
                <button 
                  onClick={() => setUserSubTab('daftar')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${userSubTab === 'daftar' ? 'bg-[#3E2723] text-white shadow-md' : 'text-[#8D6E63] hover:bg-[#D7CCC8]/20'}`}
                >
                  Daftar Admin
                </button>
                <button 
                  onClick={() => setUserSubTab('hak_akses')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${userSubTab === 'hak_akses' ? 'bg-[#3E2723] text-white shadow-md' : 'text-[#8D6E63] hover:bg-[#D7CCC8]/20'}`}
                >
                  Hak Akses
                </button>
              </div>
            </div>

            {userSubTab === 'daftar' ? (
              <div className="space-y-6">
                <div className="flex justify-end">
                  <button onClick={() => { setEditingItem(null); setShowModal('user'); }} className="bg-[#3E2723] text-white px-5 py-2 rounded-xl text-sm font-bold">+ Tambah Admin</button>
                </div>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-6 bg-[#FAF7F2] rounded-2xl border border-[#D7CCC8]/20 group">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-[#3E2723] rounded-full flex items-center justify-center text-white font-bold text-lg">{user.name[0]}</div>
                        <div>
                          <h4 className="font-bold text-[#3E2723]">{user.name}</h4>
                          <div className="flex space-x-2 items-center">
                            <span className="text-[10px] bg-[#D7CCC8] text-[#3E2723] px-2 py-0.5 rounded-full font-bold uppercase">{user.role}</span>
                            <span className="text-[10px] text-[#5D4037]">{user.email}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex items-center space-x-4">
                        <div className="hidden sm:block">
                          <p className="text-[10px] text-[#8D6E63] font-bold">Sesi Terakhir: {user.lastLogin}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button onClick={() => { setEditingItem(user); setShowModal('user'); }} className="text-[#3E2723] hover:underline text-xs font-bold">Edit</button>
                          <button onClick={() => deleteUser(user.id)} className="text-red-600 hover:underline text-xs font-bold">Hapus</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="animate-fadeIn">
                <div className="bg-[#FAF7F2] rounded-3xl border border-[#D7CCC8]/30 overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-[#3E2723] text-white text-xs font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Peran (Role)</th>
                        <th className="px-6 py-4">Izin Akses (Permissions)</th>
                        <th className="px-6 py-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D7CCC8]/20">
                      {[
                        { role: 'Super Admin', permissions: 'Akses penuh ke semua fitur dashboard, manajemen admin, dan profil kafe.' },
                        { role: 'Editor Menu', permissions: 'Kelola daftar menu (tambah, edit, hapus), perbarui harga, dan stok.' },
                        { role: 'Kontributor Artikel', permissions: 'Tulis dan edit artikel blog, kelola komentar, dan konten berita.' }
                      ].map((p, i) => (
                        <tr key={i} className="hover:bg-white/50 transition-colors">
                          <td className="px-6 py-5 align-top">
                            <span className="font-bold text-[#3E2723]">{p.role}</span>
                          </td>
                          <td className="px-6 py-5">
                            <p className="text-sm text-[#5D4037] leading-relaxed">{p.permissions}</p>
                          </td>
                          <td className="px-6 py-5 text-right align-top">
                            <button className="text-[#8D6E63] hover:text-[#3E2723] text-xs font-bold">Ubah Izin</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-8 p-6 bg-amber-50 rounded-2xl border border-amber-200">
                  <p className="text-xs text-amber-800 leading-relaxed">
                    <strong>Catatan:</strong> Perubahan pada "Hak Akses" akan berdampak pada seluruh pengguna dengan peran yang sama. Pastikan Anda memahami struktur organisasi sebelum mengubah izin default.
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      default: return null;
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.BERANDA:
        return (
          <div className="animate-fadeIn">
            <section className="flex flex-col lg:flex-row min-h-[60vh] bg-[#FAF7F2] overflow-hidden">
              <div className="flex-1 flex items-center px-6 py-10 md:px-12 lg:px-24">
                <div className="max-w-2xl">
                  <div className="inline-block px-4 py-1 rounded-full bg-[#3E2723] text-[#D7CCC8] text-xs font-bold uppercase tracking-widest mb-4">Sejak 2020</div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-[#3E2723]">{siteData.heroTitle}</h1>
                  <p className="text-base md:text-lg mb-8 text-[#5D4037] opacity-90 leading-relaxed">{siteData.heroSub}</p>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <button onClick={() => handlePageChange(Page.KONTAK)} className="bg-[#3E2723] text-white px-8 py-3 rounded-full font-bold text-base shadow-lg">Kunjungi Kami</button>
                    <button onClick={() => handlePageChange(Page.TENTANG)} className="border-2 border-[#3E2723] text-[#3E2723] px-8 py-3 rounded-full font-bold text-base hover:bg-[#3E2723] hover:text-white transition-all">Cerita Kami</button>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 relative min-h-[350px] lg:h-auto overflow-hidden bg-[#3E2723]">
                {heroImages.map((img, index) => (
                  <div key={index} className={`absolute inset-0 transition-all duration-1000 ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                    <img src={img} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </section>
            <section className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-12 text-[#3E2723]">Menu Pilihan</h2>
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                  {activeCategories.map((cat) => (
                    <button key={cat} onClick={() => setActiveTab(cat)} className={`px-6 py-2 rounded-full text-sm font-bold border-2 ${activeTab === cat ? 'bg-[#3E2723] border-[#3E2723] text-white' : 'bg-white border-[#D7CCC8] text-[#3E2723]'}`}>{cat}</button>
                  ))}
                </div>
                {renderMenuGrid(displayedMenu)}
                {hasMoreItems && <button onClick={() => handlePageChange(Page.MENU_LENGKAP)} className="mt-12 text-[#3E2723] font-bold border-b-2 border-[#3E2723]">Lihat Semua</button>}
              </div>
            </section>
          </div>
        );
      case Page.MENU_LENGKAP:
        return (
          <div className="py-20 bg-[#FAF7F2] min-h-screen">
            <div className="max-w-7xl mx-auto px-4">
              <button onClick={() => handlePageChange(Page.BERANDA)} className="mb-8 font-bold text-[#3E2723]">← Beranda</button>
              <h2 className="text-4xl font-serif font-bold text-[#3E2723] mb-12 text-center">Koleksi Rasa Cocho Tomo</h2>
              <div className="flex justify-center gap-2 mb-12">
                {activeCategories.map(cat => <button key={cat} onClick={() => setActiveTab(cat)} className={`px-4 py-1.5 rounded-full text-xs font-bold border ${activeTab === cat ? 'bg-[#3E2723] text-white' : 'bg-white text-[#3E2723]'}`}>{cat}</button>)}
              </div>
              {renderMenuGrid(filteredMenu)}
            </div>
          </div>
        );
      case Page.TENTANG:
        return (
          <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-8 font-serif text-[#3E2723]">Awal Mula {siteData.name}</h2>
                <p className="text-[#5D4037] text-lg leading-relaxed mb-6">{siteData.about}</p>
              </div>
              <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800" alt="Cafe" className="rounded-2xl shadow-xl" />
            </div>
          </div>
        );
      case Page.ARTIKEL:
        return (
          <div className="py-20 bg-[#FAF7F2]">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-16 font-serif text-[#3E2723]">Catatan Barista</h2>
              <div className="grid md:grid-cols-2 gap-12">
                {articles.map(article => (
                  <article key={article.id} className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-[#D7CCC8]/20 p-8">
                    <img src={article.image} className="w-full h-64 object-cover rounded-xl mb-6" alt="" />
                    <span className="text-xs font-bold text-[#8D6E63] uppercase">{article.date}</span>
                    <h3 className="text-2xl font-bold my-4 font-serif text-[#3E2723]">{article.title}</h3>
                    <p className="text-[#5D4037] mb-6">{article.excerpt}</p>
                    <button className="font-bold text-[#3E2723] border-b-2 border-[#3E2723]">Baca Selengkapnya</button>
                  </article>
                ))}
              </div>
            </div>
          </div>
        );
      case Page.KONTAK:
        return (
          <div className="py-20 bg-[#FAF7F2]">
            <div className="max-w-7xl mx-auto px-4">
              <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/3 coffee-gradient p-12 text-white">
                  <h2 className="text-3xl font-bold mb-8 font-serif">Hubungi Kami</h2>
                  <p className="mb-6 opacity-80">{siteData.address}</p>
                  <p className="font-bold">WA: +62 {siteData.whatsapp}</p>
                  <p className="font-bold">{siteData.email}</p>
                </div>
                <div className="md:w-2/3 p-12"><form className="space-y-6">
                  <input type="text" placeholder="Nama" className="w-full bg-[#FAF7F2] p-4 rounded-xl outline-none" />
                  <textarea rows={4} placeholder="Pesan" className="w-full bg-[#FAF7F2] p-4 rounded-xl outline-none" />
                  <button className="w-full bg-[#3E2723] text-white py-4 rounded-xl font-bold">Kirim</button>
                </form></div>
              </div>
            </div>
          </div>
        );
      case Page.LOGIN:
        return (
          <div className="min-h-[80vh] flex items-center justify-center bg-[#FAF7F2] p-4">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-[#D7CCC8]/30">
              <div className="coffee-gradient p-10 text-center text-white">
                <h2 className="text-2xl font-bold mb-2">Panel Admin</h2>
                <p className="opacity-70 text-sm">sandi123 / administrasi</p>
              </div>
              <form className="p-10 space-y-6" onSubmit={handleLoginSubmit}>
                <input type="text" value={loginData.username} onChange={(e) => setLoginData({...loginData, username: e.target.value})} className="w-full bg-[#FAF7F2] border border-[#D7CCC8]/50 rounded-xl px-5 py-3 outline-none" placeholder="Username" />
                <input type="password" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} className="w-full bg-[#FAF7F2] border border-[#D7CCC8]/50 rounded-xl px-5 py-3 outline-none" placeholder="Password" />
                <button type="submit" className="w-full bg-[#3E2723] text-white py-4 rounded-xl font-bold shadow-lg">Masuk</button>
              </form>
            </div>
          </div>
        );
      case Page.DASHBOARD:
        return (
          <div className="min-h-screen bg-[#FAF7F2] flex flex-col md:flex-row">
            <aside className="w-full md:w-72 bg-[#3E2723] text-white flex flex-col">
              <div className="p-8 border-b border-white/10 hidden md:block">
                <h2 className="text-xl font-bold">Panel Cochotomo</h2>
              </div>
              <nav className="p-4 space-y-1">
                {[
                  { id: 'ringkasan', label: 'Ringkasan', icon: '📊' },
                  { id: 'profil', label: 'Profil Organisasi', icon: '🏢' },
                  { id: 'beranda', label: 'Beranda', icon: '🏠' },
                  { id: 'artikel', label: 'Artikel', icon: '✍️' },
                  { id: 'menu', label: 'Menu', icon: '☕' },
                  { id: 'pengguna', label: 'Manajemen Pengguna', icon: '👥' },
                ].map((item) => (
                  <button key={item.id} onClick={() => setActiveDashboardSubPage(item.id as DashboardSubPage)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeDashboardSubPage === item.id ? 'bg-[#FAF7F2] text-[#3E2723]' : 'opacity-70 hover:opacity-100'}`}>
                    <span>{item.icon}</span><span>{item.label}</span>
                  </button>
                ))}
              </nav>
              <button onClick={handleLogout} className="m-4 p-3 bg-red-500/10 text-red-400 rounded-xl font-bold text-sm">Log Out</button>
            </aside>
            <main className="flex-grow p-6 md:p-12 max-h-screen overflow-y-auto">
              <header className="mb-10 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-[#3E2723] font-serif capitalize">
                  {activeDashboardSubPage === 'profil' ? 'Profil Organisasi' : 
                   activeDashboardSubPage === 'pengguna' ? 'Manajemen Pengguna' :
                   activeDashboardSubPage === 'menu' ? 'Manajemen Menu' :
                   activeDashboardSubPage.replace('_', ' ')}
                </h1>
              </header>
              {renderDashboardContent()}
            </main>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} setPage={handlePageChange} />
      <main className="flex-grow">{renderPage()}</main>
      <Footer />
      
      {/* Modal Components */}
      {showModal === 'menu' && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-lg p-8 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6 font-serif">{editingItem ? 'Edit Menu' : 'Tambah Menu Baru'}</h2>
            <form onSubmit={saveMenuItem} className="space-y-4">
              <input name="name" defaultValue={editingItem?.name} required placeholder="Nama Produk" className="w-full bg-[#FAF7F2] p-3 rounded-xl outline-none" />
              <div className="grid grid-cols-2 gap-4">
                <input name="price" defaultValue={editingItem?.price} required placeholder="Harga (e.g. Rp 30.000)" className="w-full bg-[#FAF7F2] p-3 rounded-xl outline-none" />
                <select name="category" defaultValue={editingItem?.category || adminCategories[0]} className="w-full bg-[#FAF7F2] p-3 rounded-xl outline-none">
                  {adminCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <input name="image" defaultValue={editingItem?.image} placeholder="URL Gambar (Unsplash/Link)" className="w-full bg-[#FAF7F2] p-3 rounded-xl outline-none" />
              <textarea name="description" defaultValue={editingItem?.description} required placeholder="Deskripsi Singkat" className="w-full bg-[#FAF7F2] p-3 rounded-xl outline-none" rows={3} />
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowModal(null)} className="px-5 py-2 text-[#8D6E63] font-bold">Batal</button>
                <button type="submit" className="bg-[#3E2723] text-white px-8 py-2 rounded-xl font-bold">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showModal === 'category' && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-8 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6 font-serif">{editingItem ? 'Edit Kategori' : 'Tambah Kategori Baru'}</h2>
            <form onSubmit={handleSaveCategory} className="space-y-4">
              <label className="block text-xs font-bold text-[#3E2723] uppercase mb-1">Nama Kategori</label>
              <input name="name" defaultValue={editingItem?.name} required placeholder="Contoh: Kopi Cold Brew" className="w-full bg-[#FAF7F2] p-3 rounded-xl outline-none" />
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowModal(null)} className="px-5 py-2 text-[#8D6E63] font-bold">Batal</button>
                <button type="submit" className="bg-[#3E2723] text-white px-8 py-2 rounded-xl font-bold">Simpan Kategori</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showModal === 'article' && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-2xl p-8 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6 font-serif">{editingItem ? 'Edit Artikel' : 'Tulis Artikel Baru'}</h2>
            <form onSubmit={saveArticle} className="space-y-4">
              <input name="title" defaultValue={editingItem?.title} required placeholder="Judul Artikel" className="w-full bg-[#FAF7F2] p-3 rounded-xl outline-none text-lg font-bold" />
              <input name="image" defaultValue={editingItem?.image} placeholder="URL Gambar Cover" className="w-full bg-[#FAF7F2] p-3 rounded-xl outline-none" />
              <textarea name="excerpt" defaultValue={editingItem?.excerpt} required placeholder="Ringkasan Pendek (muncul di daftar)" className="w-full bg-[#FAF7F2] p-3 rounded-xl outline-none" rows={2} />
              <textarea name="content" defaultValue={editingItem?.content} required placeholder="Isi Artikel Lengkap..." className="w-full bg-[#FAF7F2] p-3 rounded-xl outline-none" rows={6} />
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowModal(null)} className="px-5 py-2 text-[#8D6E63] font-bold">Batal</button>
                <button type="submit" className="bg-[#3E2723] text-white px-8 py-2 rounded-xl font-bold">Publikasikan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showModal === 'user' && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-8 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6 font-serif">{editingItem ? 'Edit Admin' : 'Tambah Admin Baru'}</h2>
            <form onSubmit={saveUser} className="space-y-4">
              <input name="name" defaultValue={editingItem?.name} required placeholder="Nama Lengkap" className="w-full bg-[#FAF7F2] p-3 rounded-xl outline-none" />
              <input name="email" defaultValue={editingItem?.email} required type="email" placeholder="Email Admin" className="w-full bg-[#FAF7F2] p-3 rounded-xl outline-none" />
              <select name="role" defaultValue={editingItem?.role || 'Editor Menu'} className="w-full bg-[#FAF7F2] p-3 rounded-xl outline-none">
                <option value="Super Admin">Super Admin</option>
                <option value="Editor Menu">Editor Menu</option>
                <option value="Kontributor Artikel">Kontributor Artikel</option>
              </select>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowModal(null)} className="px-5 py-2 text-[#8D6E63] font-bold">Batal</button>
                <button type="submit" className="bg-[#3E2723] text-white px-8 py-2 rounded-xl font-bold">Simpan Akses</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default App;
