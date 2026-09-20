import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Upload,
  X,
  Package,
  Check,
  AlertCircle,
  Eye,
  Sparkles,
  Image as ImageIcon,
  Camera,
  CheckCircle2,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { Product } from '../../types';
import { api } from '../../services/api';

interface AdminProductsProps {
  products: Product[];
  onRefreshProducts: () => void;
  showToast: (msg: string, type?: any) => void;
}

const PRESET_IMAGES = [
  { name: 'Cathy Doll Cushion Foam', url: '/cathy_doll_cushion.jpg' },
  { name: 'Cathy Doll White Cleanser', url: '/cathy_doll_foam.jpg' },
  { name: 'Osufi Collagen Serum', url: '/osufi_collagen_serum.jpg' },
  { name: 'Korean Hydrating Sunscreen', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600' },
  { name: 'Hydrating Facial Essence', url: 'https://images.unsplash.com/photo-1608248597260-50d440a43093?auto=format&fit=crop&q=80&w=600' },
  { name: 'Radiance Glow Cream', url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600' },
  { name: 'Nourishing Sheet Mask', url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600' },
  { name: 'Botanical Facial Mist', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600' },
];

export const AdminProducts: React.FC<AdminProductsProps> = ({
  products,
  onRefreshProducts,
  showToast
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  // Quick Change Image Modal State
  const [quickImageProduct, setQuickImageProduct] = useState<Product | null>(null);
  const [quickImageUrl, setQuickImageUrl] = useState('');
  const [quickGalleryImages, setQuickGalleryImages] = useState<string[]>([]);
  const [quickUploadingGalleryIndex, setQuickUploadingGalleryIndex] = useState<number | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('Cathy Doll');
  const [category, setCategory] = useState('Face Wash');
  const [price, setPrice] = useState<number | ''>(790);
  const [originalPrice, setOriginalPrice] = useState<number | ''>(990);
  const [stockQuantity, setStockQuantity] = useState<number | ''>(50);
  const [productStatus, setProductStatus] = useState<'Active' | 'Draft' | 'Out of Stock'>('Active');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('/cathy_doll_cushion.jpg');
  const [galleryImages, setGalleryImages] = useState<string[]>([
    '/cathy_doll_cushion.jpg',
    '/cathy_doll_foam.jpg'
  ]);
  const [benefitsInput, setBenefitsInput] = useState('');
  const [howToUse, setHowToUse] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [volume, setVolume] = useState('120ml');

  // File Upload state
  const [uploadingGalleryIndex, setUploadingGalleryIndex] = useState<number | null>(null);

  const categories = ['All', 'Face Wash', 'Skincare', 'Face Care', 'Hair Care', 'Body Care', 'Beauty Essentials'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setName('');
    setBrand('Cathy Doll');
    setCategory('Face Wash');
    setPrice(790);
    setOriginalPrice(990);
    setStockQuantity(50);
    setProductStatus('Active');
    setShortDescription('Gentle cushion foam face wash with Snail Mucin & Berry Extracts for deep cleansing.');
    setDescription('Experience Korean skincare excellence with Cathy Doll White Cushion Facial Foam Cleanser (120ml).');
    setImage('/cathy_doll_cushion.jpg');
    setGalleryImages(['/cathy_doll_cushion.jpg', '/cathy_doll_foam.jpg']);
    setBenefitsInput('Deep makeup removal\nReduces dark spots & revives glow\nSnail Mucin & Berry Complex');
    setHowToUse('Work into a rich cushion foam with water, gently massage over face, and rinse with lukewarm water.');
    setIngredients('Water, Myristic Acid, Snail Secretion Filtrate, Niacinamide, Collagen Extract.');
    setVolume('120ml');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setBrand(product.brand || 'ZEDBEAUTY');
    setCategory(product.category || 'Face Wash');
    setPrice(product.price);
    setOriginalPrice(product.originalPrice || product.price);
    setStockQuantity(product.stockQuantity ?? 50);
    setProductStatus(product.productStatus || 'Active');
    setShortDescription(product.shortDescription || '');
    setDescription(product.description || '');
    setImage(product.image);

    const existingGallery =
      product.gallery && product.gallery.length > 0
        ? product.gallery
        : [product.image, '/cathy_doll_foam.jpg'];
    setGalleryImages(existingGallery);

    setBenefitsInput(Array.isArray(product.benefits) ? product.benefits.join('\n') : '');
    setHowToUse(product.howToUse || '');
    setIngredients(product.ingredients || '');
    setVolume(product.volume || '120ml');
    setIsModalOpen(true);
  };

  const handleOpenQuickImageModal = (product: Product) => {
    setQuickImageProduct(product);
    setQuickImageUrl(product.image);
    const existingGallery =
      product.gallery && product.gallery.length > 0
        ? product.gallery
        : [product.image, '/cathy_doll_foam.jpg'];
    setQuickGalleryImages(existingGallery);
  };

  const handleGalleryFileUpload = async (file: File, index: number, isQuickModal = false) => {
    if (!file) return;

    // Format validation: JPG, JPEG, PNG, WEBP
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const allowedExts = ['jpg', 'jpeg', 'png', 'webp'];

    if (!allowedTypes.includes(file.type.toLowerCase()) && (!fileExt || !allowedExts.includes(fileExt))) {
      showToast('Invalid image format! Only JPG, JPEG, PNG, and WEBP formats are allowed.', 'info');
      return;
    }

    // Size validation: 10MB limit
    const MAX_MB = 10;
    if (file.size > MAX_MB * 1024 * 1024) {
      showToast(
        `Image file is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed size is ${MAX_MB}MB.`,
        'info'
      );
      return;
    }

    if (isQuickModal) {
      setQuickUploadingGalleryIndex(index);
    } else {
      setUploadingGalleryIndex(index);
    }

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const base64 = event.target?.result as string;
          if (!base64) throw new Error('Could not read image data');

          const uploadedUrl = await api.uploadImage(base64);

          if (isQuickModal) {
            const updated = [...quickGalleryImages];
            updated[index] = uploadedUrl;
            setQuickGalleryImages(updated);
            if (index === 0) setQuickImageUrl(uploadedUrl);
          } else {
            const updated = [...galleryImages];
            updated[index] = uploadedUrl;
            setGalleryImages(updated);
            if (index === 0) setImage(uploadedUrl);
          }
          showToast(`Gallery Image #${index + 1} uploaded successfully!`);
        } catch (err: any) {
          showToast(err.message || 'Image upload failed. Please try again.', 'info');
        } finally {
          if (isQuickModal) setQuickUploadingGalleryIndex(null);
          else setUploadingGalleryIndex(null);
        }
      };

      reader.onerror = () => {
        showToast('Error reading image file from device', 'info');
        if (isQuickModal) setQuickUploadingGalleryIndex(null);
        else setUploadingGalleryIndex(null);
      };

      reader.readAsDataURL(file);
    } catch (err: any) {
      showToast('Failed to process image upload.', 'info');
      if (isQuickModal) setQuickUploadingGalleryIndex(null);
      else setUploadingGalleryIndex(null);
    }
  };

  const handleAddGalleryField = (isQuickModal = false) => {
    if (isQuickModal) {
      setQuickGalleryImages([...quickGalleryImages, '/cathy_doll_foam.jpg']);
    } else {
      setGalleryImages([...galleryImages, '/cathy_doll_foam.jpg']);
    }
  };

  const handleRemoveGalleryField = (index: number, isQuickModal = false) => {
    if (isQuickModal) {
      if (quickGalleryImages.length <= 1) {
        showToast('You must keep at least 1 image.', 'info');
        return;
      }
      const updated = quickGalleryImages.filter((_, i) => i !== index);
      setQuickGalleryImages(updated);
      if (index === 0 && updated.length > 0) setQuickImageUrl(updated[0]);
    } else {
      if (galleryImages.length <= 1) {
        showToast('You must keep at least 1 image.', 'info');
        return;
      }
      const updated = galleryImages.filter((_, i) => i !== index);
      setGalleryImages(updated);
      if (index === 0 && updated.length > 0) setImage(updated[0]);
    }
  };

  const handleSaveQuickImage = async () => {
    if (!quickImageProduct) return;

    const finalGallery = quickGalleryImages.filter((url) => url && url.trim().length > 0);
    const mainImg = finalGallery[0] || quickImageUrl || quickImageProduct.image;

    setLoading(true);
    try {
      await api.updateProduct(quickImageProduct.id, {
        image: mainImg,
        gallery: finalGallery.length > 0 ? finalGallery : [mainImg]
      });
      showToast(`Product gallery images updated for ${quickImageProduct.name}!`);
      setQuickImageProduct(null);
      onRefreshProducts();
    } catch (err: any) {
      showToast(err.message || 'Failed to update image', 'info');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const benefitsArray = benefitsInput
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const finalGallery = galleryImages.filter((url) => url && url.trim().length > 0);
    const mainImg = finalGallery[0] || image || '/cathy_doll_cushion.jpg';

    const payload: Partial<Product> = {
      name,
      brand,
      category,
      price: Number(price) || 0,
      originalPrice: Number(originalPrice) || Number(price) || 0,
      stockQuantity: Number(stockQuantity) || 0,
      productStatus,
      shortDescription,
      description,
      image: mainImg,
      gallery: finalGallery.length > 0 ? finalGallery : [mainImg],
      benefits: benefitsArray,
      howToUse,
      ingredients,
      volume,
      stockStatus: Number(stockQuantity) > 0 ? (Number(stockQuantity) < 10 ? 'Low Stock' : 'In Stock') : 'Out of Stock'
    };

    try {
      if (editingProduct) {
        await api.updateProduct(editingProduct.id, payload);
        showToast('Product details & images updated successfully!');
      } else {
        await api.createProduct(payload);
        showToast('New product added to catalog!');
      }
      setIsModalOpen(false);
      onRefreshProducts();
    } catch (err: any) {
      showToast(err.message || 'Failed to save product', 'info');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from catalog?`)) {
      try {
        await api.deleteProduct(id);
        showToast('Product removed');
        onRefreshProducts();
      } catch (err: any) {
        showToast(err.message || 'Failed to delete product', 'info');
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-6xl">
      {/* Header & Quick Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#211a1c] border border-[#3d2b2d] p-6 rounded-2xl shadow-lg">
        <div>
          <h2 className="font-serif-display text-2xl font-bold text-white flex items-center gap-2">
            <Package className="w-6 h-6 text-[#d4af37]" />
            <span>Product Catalog & Images</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Manage product titles, prices, stock levels, and multi-image gallery photos for ZEDBEAUTY.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-3 bg-[#8c3b31] hover:bg-[#a84438] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#d4af37]" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#211a1c] border border-[#3d2b2d] p-4 rounded-2xl flex flex-col sm:flex-row gap-4 justify-between items-center">
        {/* Search Field */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search product name or brand..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#8c3b31] text-white'
                  : 'bg-[#171315] text-neutral-400 hover:text-white border border-[#3d2b2d]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#211a1c] border border-[#3d2b2d] rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-[#171315] text-neutral-400 border-b border-[#3d2b2d] uppercase tracking-wider font-semibold text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Product & Images</th>
                <th className="py-3.5 px-4">Brand</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#312325]">
              {filteredProducts.map((p) => {
                const galleryCount = p.gallery?.length || 1;
                return (
                  <tr key={p.id} className="hover:bg-[#281f21] transition-colors">
                    {/* Product & Gallery Thumbnails */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative group flex-shrink-0">
                          <div className="w-12 h-14 rounded-xl bg-white border border-neutral-700 p-1 flex items-center justify-center overflow-hidden shadow-xs">
                            <img
                              src={p.image}
                              alt={p.name}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/cathy_doll_cushion.jpg';
                              }}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <button
                            onClick={() => handleOpenQuickImageModal(p)}
                            className="absolute -bottom-1 -right-1 p-1 bg-[#8c3b31] hover:bg-[#a84438] text-white rounded-full shadow-md transition-transform transform hover:scale-110 cursor-pointer"
                            title="Change product images"
                          >
                            <Camera className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="min-w-0">
                          <p className="font-bold text-white line-clamp-1 hover:text-[#f8d4c1] transition-colors">
                            {p.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-neutral-400">{p.volume || '120ml'}</span>
                            <span className="text-neutral-600">•</span>
                            <span className="text-[10px] text-[#d4af37] font-medium flex items-center gap-1">
                              <ImageIcon className="w-3 h-3" />
                              <span>{galleryCount} Gallery Images</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-neutral-300">{p.brand}</td>
                    <td className="py-3.5 px-4 text-neutral-400">{p.category}</td>

                    <td className="py-3.5 px-4 font-bold text-white">
                      ৳ {p.price.toLocaleString()}
                      {p.originalPrice && p.originalPrice > p.price && (
                        <span className="text-[10px] text-neutral-500 line-through ml-1.5 font-normal">
                          ৳ {p.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-neutral-200">{p.stockQuantity ?? 50} units</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.productStatus === 'Active' || !p.productStatus
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : p.productStatus === 'Draft'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}
                      >
                        {p.productStatus || 'Active'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenQuickImageModal(p)}
                          className="p-1.5 bg-[#312325] hover:bg-[#422e31] text-[#f8d4c1] border border-[#523337] rounded-lg transition-colors cursor-pointer"
                          title="Quick Change Images"
                        >
                          <ImageIcon className="w-3.5 h-3.5 text-[#d4af37]" />
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg transition-colors cursor-pointer"
                          title="Edit Full Details"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id, p.name)}
                          className="p-1.5 bg-neutral-800 hover:bg-rose-900/50 text-rose-400 rounded-lg transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* QUICK CHANGE MULTI-IMAGE MODAL */}
      {quickImageProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#211a1c] border border-[#4a3436] rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl p-6 space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#312325]">
              <div>
                <h3 className="font-serif-display text-lg font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[#d4af37]" />
                  <span>Update Product Images ({quickImageProduct.brand})</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">
                  Product: <strong className="text-white">{quickImageProduct.name}</strong>
                </p>
              </div>
              <button
                onClick={() => setQuickImageProduct(null)}
                className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Multi-Image Gallery Cards */}
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {quickGalleryImages.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="bg-[#171315] p-3.5 rounded-2xl border border-[#3d2b2d] flex flex-col sm:flex-row items-center gap-4"
                >
                  <div className="w-24 aspect-[3/4] rounded-xl bg-white border border-neutral-700 p-1 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm relative">
                    <img
                      src={imgUrl || '/cathy_doll_cushion.jpg'}
                      alt={`Gallery #${idx + 1}`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/cathy_doll_cushion.jpg';
                      }}
                      className="w-full h-full object-contain"
                    />
                    <span className="absolute top-1 left-1 bg-[#8c3b31] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      #{idx + 1}
                    </span>
                  </div>

                  <div className="flex-1 space-y-2 w-full text-left">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                        {idx === 0 ? 'Image #1 (Main Product View)' : `Image #${idx + 1} (Gallery Detail View)`}
                      </label>
                      {quickGalleryImages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryField(idx, true)}
                          className="text-xs text-neutral-500 hover:text-rose-400 p-1"
                          title="Remove this image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      value={imgUrl}
                      onChange={(e) => {
                        const updated = [...quickGalleryImages];
                        updated[idx] = e.target.value;
                        setQuickGalleryImages(updated);
                        if (idx === 0) setQuickImageUrl(e.target.value);
                      }}
                      placeholder="Image URL path"
                      className="w-full px-3 py-1.5 bg-[#211a1c] border border-[#3d2b2d] rounded-lg text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                    />

                    <label className="px-3.5 py-1.5 bg-[#8c3b31] hover:bg-[#a84438] text-white rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-2 shadow-xs">
                      {quickUploadingGalleryIndex === idx ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#d4af37]" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload File from Device</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                        disabled={quickUploadingGalleryIndex === idx}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleGalleryFileUpload(file, idx, true);
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => handleAddGalleryField(true)}
                className="w-full py-2.5 bg-[#261d1f] hover:bg-[#332629] text-[#f8d4c1] rounded-xl text-xs font-bold border border-[#523337] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#d4af37]" />
                <span>+ Add Additional Gallery Image</span>
              </button>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-[#312325] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setQuickImageProduct(null)}
                className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveQuickImage}
                disabled={loading}
                className="px-6 py-2.5 bg-[#8c3b31] hover:bg-[#a84438] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                <span>{loading ? 'Saving Images...' : 'Save Product Images'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL ADD / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-[#211a1c] border border-[#4a3436] rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#312325] flex items-center justify-between">
              <div>
                <h3 className="font-serif-display text-xl font-bold text-white">
                  {editingProduct ? 'Edit Product Details' : 'Add New Skincare Product'}
                </h3>
                <p className="text-xs text-neutral-400">
                  Update product name, gallery images, prices, inventory, and description for ZEDBEAUTY storefront.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Product Title / Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. White Cushion Facial Foam Cleanser 120ml Cathy Doll"
                    className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Cathy Doll"
                    className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31] cursor-pointer"
                  >
                    <option value="Face Wash">Face Wash</option>
                    <option value="Skincare">Skincare</option>
                    <option value="Face Care">Face Care</option>
                    <option value="Hair Care">Hair Care</option>
                    <option value="Body Care">Body Care</option>
                    <option value="Beauty Essentials">Beauty Essentials</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Sale Price (৳ BDT) *
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="790"
                    className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Regular Price (৳ BDT)
                  </label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="990"
                    className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="50"
                    className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Product Status *
                  </label>
                  <select
                    value={productStatus}
                    onChange={(e) => setProductStatus(e.target.value as any)}
                    className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31] cursor-pointer"
                  >
                    <option value="Active">Active (Live in Store)</option>
                    <option value="Draft">Draft (Hidden)</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              {/* Product Gallery & Multi-Image Upload Section */}
              <div className="space-y-4 pt-4 border-t border-[#312325]">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                      Product Gallery Photos (Multiple Images)
                    </label>
                    <p className="text-[11px] text-neutral-400">
                      Upload Image #1 (Main View) and Image #2 (Secondary Detail View).
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddGalleryField(false)}
                    className="px-3 py-1.5 bg-[#312325] hover:bg-[#422e31] text-[#f8d4c1] border border-[#523337] rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Add Gallery Image</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {galleryImages.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="bg-[#171315] p-3.5 rounded-2xl border border-[#3d2b2d] space-y-3 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                          {idx === 0 ? 'Image #1 (Primary Main)' : `Image #${idx + 1} (Secondary)`}
                        </span>

                        {galleryImages.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryField(idx, false)}
                            className="text-neutral-500 hover:text-rose-400 p-1"
                            title="Remove image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-20 aspect-[3/4] rounded-xl bg-white border border-neutral-700 p-1 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-xs">
                          <img
                            src={imgUrl || '/cathy_doll_cushion.jpg'}
                            alt={`Preview #${idx + 1}`}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/cathy_doll_cushion.jpg';
                            }}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={imgUrl}
                            onChange={(e) => {
                              const updated = [...galleryImages];
                              updated[idx] = e.target.value;
                              setGalleryImages(updated);
                              if (idx === 0) setImage(e.target.value);
                            }}
                            placeholder="/cathy_doll_cushion.jpg"
                            className="w-full px-3 py-1.5 bg-[#211a1c] border border-[#3d2b2d] rounded-lg text-[11px] text-white focus:outline-none focus:border-[#8c3b31]"
                          />

                          <label className="px-3 py-1.5 bg-[#8c3b31] hover:bg-[#a84438] text-white rounded-lg text-[11px] font-bold transition-all cursor-pointer inline-flex items-center gap-1.5">
                            {uploadingGalleryIndex === idx ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#d4af37]" />
                                <span>Uploading...</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-3.5 h-3.5" />
                                <span>Upload Device File</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/jpeg,image/jpg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                              disabled={uploadingGalleryIndex === idx}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleGalleryFileUpload(file, idx, false);
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Preset Gallery Choice */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] text-neutral-400 font-semibold">
                    1-Click Preset Gallery Choice:
                  </span>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          const updated = [...galleryImages];
                          if (updated.length === 0) updated.push(preset.url);
                          else updated[0] = preset.url;
                          setGalleryImages(updated);
                          setImage(preset.url);
                        }}
                        className={`p-1 rounded-xl border bg-white flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
                          image === preset.url
                            ? 'border-[#8c3b31] ring-2 ring-[#8c3b31]'
                            : 'border-neutral-700 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={preset.url} alt={preset.name} className="w-8 h-8 object-contain" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Short Highlight Tagline
                </label>
                <input
                  type="text"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Gentle cushion foam face wash with Snail Mucin & Berry Extracts"
                  className="w-full px-4 py-2 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Full Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Key Benefits (One per line)
                </label>
                <textarea
                  rows={3}
                  value={benefitsInput}
                  onChange={(e) => setBenefitsInput(e.target.value)}
                  placeholder="Deeply removes makeup&#10;Infused with Snail Mucin&#10;100% Made In Korea"
                  className="w-full px-4 py-2 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-[#312325] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-[#8c3b31] hover:bg-[#a84438] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingProduct ? 'Update Product Details & Images' : 'Save New Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
