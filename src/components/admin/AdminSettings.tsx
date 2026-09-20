import React, { useState, useEffect } from 'react';
import {
  Settings,
  ShieldCheck,
  Save,
  Truck,
  Store,
  Lock,
  Mail,
  Bell,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Loader2,
  Plus,
  Trash2,
  Layers
} from 'lucide-react';
import { SiteSettings, CategoryItem } from '../../types';
import { api } from '../../services/api';

interface AdminSettingsProps {
  settings: SiteSettings;
  onRefreshSettings: () => void;
  showToast: (msg: string, type?: any) => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({
  settings,
  onRefreshSettings,
  showToast
}) => {
  const [storeName, setStoreName] = useState(settings?.storeName || 'ZEDBEAUTY');
  const [announcementText, setAnnouncementText] = useState(
    settings?.announcementText ||
      '✨ 100% Original Korean Skincare — Fast Shipping Across Bangladesh | Free Shipping Over ৳ 1,500!'
  );
  const [supportPhone, setSupportPhone] = useState(settings?.supportPhone || '+880 1814-024099');
  const [supportEmail, setSupportEmail] = useState(settings?.supportEmail || 'support@zedbeauty.com.bd');
  const [address, setAddress] = useState(
    settings?.address || 'House 8/1, Road 2, Block D, Nazira Bazar, Dhaka-1100, Bangladesh'
  );
  const [insideDhakaFee, setInsideDhakaFee] = useState<number | ''>(settings?.insideDhakaFee || 60);
  const [outsideDhakaFee, setOutsideDhakaFee] = useState<number | ''>(settings?.outsideDhakaFee || 120);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState<number | ''>(
    settings?.freeShippingThreshold || 1500
  );

  // Exclusive K-Beauty Launch & Hero Banner State
  const [heroBadgeText, setHeroBadgeText] = useState(settings?.heroBadgeText || 'OFFICIAL EXCLUSIVE PRODUCT LAUNCH');
  const [heroTitle, setHeroTitle] = useState(settings?.heroTitle || 'White Cushion Facial Foam Cleanser 120ml');
  const [heroSubtitle, setHeroSubtitle] = useState(
    settings?.heroSubtitle ||
      'Cathy Doll Face Wash (Made In Korea) — Gentle plush cushion foam cleanser enriched with Snail Mucin & Berry Extracts for deep makeup removal, intense radiance & dark spot reduction.'
  );
  const [heroImageUrl, setHeroImageUrl] = useState(settings?.heroImageUrl || '/cathy_doll_cushion.jpg');
  const [heroPrice, setHeroPrice] = useState<number | ''>(settings?.heroPrice ?? 790);
  const [heroOriginalPrice, setHeroOriginalPrice] = useState<number | ''>(settings?.heroOriginalPrice ?? 990);

  // Featured Categories Cards State
  const [categoryList, setCategoryList] = useState<CategoryItem[]>(
    settings?.categoryList || [
      {
        id: 'cat-1',
        name: 'Face Wash',
        description: 'Deep makeup removal & plush cushion foam cleansing',
        image: '/cathy_doll_cushion.jpg',
        itemCount: '1 Exclusive Item'
      },
      {
        id: 'cat-2',
        name: 'Cleanser & Brightening',
        description: 'Formulated with Snail Mucin & Berries to reduce dark spots',
        image: '/cathy_doll_foam.jpg',
        itemCount: 'Korean Formula'
      },
      {
        id: 'cat-3',
        name: 'Made In Korea',
        description: '100% Authentic imported Korean facial foam cleanser',
        image: '/osufi_collagen_serum.jpg',
        itemCount: '100% Original'
      }
    ]
  );

  // Collection Banner State
  const [collectionBannerBadge, setCollectionBannerBadge] = useState(
    settings?.collectionBannerBadge || '100% ORIGINAL MADE IN KOREA'
  );
  const [collectionBannerTitle, setCollectionBannerTitle] = useState(
    settings?.collectionBannerTitle || 'Plush Cushion Foam, Instant Glow.'
  );
  const [collectionBannerSubtitle, setCollectionBannerSubtitle] = useState(
    settings?.collectionBannerSubtitle ||
      'Formulated with Snail Mucin, Berry Complex & Collagen to deeply cleanse makeup, remove urban pollutants, and reduce dark spots for a radiant, soft skin feel.'
  );
  const [collectionBannerImageUrl, setCollectionBannerImageUrl] = useState(
    settings?.collectionBannerImageUrl || '/cathy_doll_cushion.jpg'
  );
  const [collectionBannerButtonText, setCollectionBannerButtonText] = useState(
    settings?.collectionBannerButtonText || 'Order Cathy Doll Face Wash (৳ 790)'
  );

  const [uploadingHeroImage, setUploadingHeroImage] = useState(false);
  const [uploadingCollectionImage, setUploadingCollectionImage] = useState(false);
  const [uploadingCatIndex, setUploadingCatIndex] = useState<number | null>(null);

  // Security Credentials State
  const [adminEmail, setAdminEmail] = useState('admin@zedbeauty.com');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [savingSettings, setSavingSettings] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (settings) {
      setStoreName(settings.storeName || 'ZEDBEAUTY');
      setAnnouncementText(settings.announcementText || '');
      setSupportPhone(settings.supportPhone || '');
      setSupportEmail(settings.supportEmail || '');
      setAddress(settings.address || '');
      setInsideDhakaFee(settings.insideDhakaFee || 60);
      setOutsideDhakaFee(settings.outsideDhakaFee || 120);
      setFreeShippingThreshold(settings.freeShippingThreshold || 1500);
      setHeroBadgeText(settings.heroBadgeText || 'OFFICIAL EXCLUSIVE PRODUCT LAUNCH');
      setHeroTitle(settings.heroTitle || 'White Cushion Facial Foam Cleanser 120ml');
      setHeroSubtitle(settings.heroSubtitle || '');
      setHeroImageUrl(settings.heroImageUrl || '/cathy_doll_cushion.jpg');
      setHeroPrice(settings.heroPrice ?? 790);
      setHeroOriginalPrice(settings.heroOriginalPrice ?? 990);
      setCollectionBannerBadge(settings.collectionBannerBadge || '100% ORIGINAL MADE IN KOREA');
      setCollectionBannerTitle(settings.collectionBannerTitle || 'Plush Cushion Foam, Instant Glow.');
      setCollectionBannerSubtitle(settings.collectionBannerSubtitle || '');
      setCollectionBannerImageUrl(settings.collectionBannerImageUrl || '/cathy_doll_cushion.jpg');
      setCollectionBannerButtonText(settings.collectionBannerButtonText || 'Order Cathy Doll Face Wash (৳ 790)');
      if (settings.categoryList && settings.categoryList.length > 0) {
        setCategoryList(settings.categoryList);
      }
    }
  }, [settings]);

  const handleFileUpload = async (file: File, target: 'hero' | 'collection') => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      showToast('Invalid file format. Please upload JPG, PNG, or WEBP images.', 'info');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast('File size exceeds 10MB limit. Please choose a smaller image.', 'info');
      return;
    }

    if (target === 'hero') setUploadingHeroImage(true);
    else setUploadingCollectionImage(true);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const base64Data = e.target?.result as string;
          if (!base64Data) throw new Error('Failed to read image file');

          const uploadedUrl = await api.uploadImage(base64Data);
          if (uploadedUrl) {
            if (target === 'hero') {
              setHeroImageUrl(uploadedUrl);
            } else {
              setCollectionBannerImageUrl(uploadedUrl);
            }
            showToast('Banner image uploaded successfully!');
          } else {
            throw new Error('Upload response missing image URL');
          }
        } catch (err: any) {
          showToast(err.message || 'Image upload failed. Please try again.', 'info');
        } finally {
          if (target === 'hero') setUploadingHeroImage(false);
          else setUploadingCollectionImage(false);
        }
      };

      reader.onerror = () => {
        showToast('Error reading selected image file.', 'info');
        if (target === 'hero') setUploadingHeroImage(false);
        else setUploadingCollectionImage(false);
      };

      reader.readAsDataURL(file);
    } catch (err: any) {
      showToast('Failed to process image upload.', 'info');
      if (target === 'hero') setUploadingHeroImage(false);
      else setUploadingCollectionImage(false);
    }
  };

  const handleCategoryFileUpload = async (file: File, index: number) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      showToast('Invalid file format. Please upload JPG, PNG, or WEBP images.', 'info');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast('File size exceeds 10MB limit. Please choose a smaller image.', 'info');
      return;
    }

    setUploadingCatIndex(index);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const base64Data = e.target?.result as string;
          if (!base64Data) throw new Error('Failed to read image file');

          const uploadedUrl = await api.uploadImage(base64Data);
          if (uploadedUrl) {
            const updated = [...categoryList];
            updated[index] = { ...updated[index], image: uploadedUrl };
            setCategoryList(updated);
            showToast(`Image for "${updated[index].name}" updated!`);
          } else {
            throw new Error('Upload response missing image URL');
          }
        } catch (err: any) {
          showToast(err.message || 'Image upload failed. Please try again.', 'info');
        } finally {
          setUploadingCatIndex(null);
        }
      };

      reader.onerror = () => {
        showToast('Error reading selected image file.', 'info');
        setUploadingCatIndex(null);
      };

      reader.readAsDataURL(file);
    } catch (err: any) {
      showToast('Failed to process image upload.', 'info');
      setUploadingCatIndex(null);
    }
  };

  const handleAddCategory = () => {
    const newCat: CategoryItem = {
      id: 'cat-' + Date.now(),
      name: 'New Category',
      description: 'Category description text',
      image: '/cathy_doll_cushion.jpg',
      itemCount: 'New Collection'
    };
    setCategoryList([...categoryList, newCat]);
    showToast('New Category added! Fill details and save settings.');
  };

  const handleRemoveCategory = (index: number) => {
    if (categoryList.length <= 1) {
      showToast('You must keep at least one category.', 'info');
      return;
    }
    const updated = categoryList.filter((_, i) => i !== index);
    setCategoryList(updated);
    showToast('Category removed from list.');
  };

  const handleSaveStoreSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);

    try {
      await api.updateSettings({
        storeName,
        announcementText,
        supportPhone,
        supportEmail,
        address,
        insideDhakaFee: Number(insideDhakaFee) || 60,
        outsideDhakaFee: Number(outsideDhakaFee) || 120,
        freeShippingThreshold: Number(freeShippingThreshold) || 1500,
        heroBadgeText,
        heroTitle,
        heroSubtitle,
        heroImageUrl,
        heroPrice: Number(heroPrice) || 790,
        heroOriginalPrice: Number(heroOriginalPrice) || 990,
        collectionBannerBadge,
        collectionBannerTitle,
        collectionBannerSubtitle,
        collectionBannerImageUrl,
        collectionBannerButtonText,
        categoryList
      });

      showToast('Website storefront & category settings updated!');
      onRefreshSettings();
    } catch (err: any) {
      showToast(err.message || 'Failed to update settings', 'info');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleUpdateAdminCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      showToast('Passwords do not match!', 'info');
      return;
    }

    setSavingPassword(true);
    try {
      await api.updateAdminCredentials(adminEmail, newPassword || undefined);
      showToast('Admin security credentials updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      showToast(err.message || 'Failed to update admin credentials', 'info');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#211a1c] border border-[#3d2b2d] p-6 rounded-2xl shadow-lg">
        <div>
          <h2 className="font-serif-display text-2xl font-bold text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#d4af37]" />
            <span>Storefront & Banner Customization Settings</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Customize website announcement banners, featured categories, hero launch images, delivery charges, and support contacts.
          </p>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSaveStoreSettings} className="space-y-8">
        
        {/* Section 1: E-Commerce Storefront Basic Configuration */}
        <div className="bg-[#211a1c] border border-[#3d2b2d] p-6 rounded-2xl shadow-lg space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[#312325]">
            <Store className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-serif-display text-base font-bold text-white">
              E-Commerce Storefront Configuration
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                Brand Store Name
              </label>
              <input
                type="text"
                required
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                Support Phone Number
              </label>
              <input
                type="text"
                required
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                Support Email
              </label>
              <input
                type="email"
                required
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                Store Location Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Top Announcement Marquee Banner Text</span>
            </label>
            <input
              type="text"
              required
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
            />
          </div>

          <div className="pt-4 border-t border-[#312325]">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#d4af37] mb-3 flex items-center gap-2">
              <Truck className="w-4 h-4" />
              <span>Delivery & Shipping Fees (BDT ৳)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                  Inside Dhaka Delivery Charge (৳)
                </label>
                <input
                  type="number"
                  required
                  value={insideDhakaFee}
                  onChange={(e) => setInsideDhakaFee(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-4 py-2 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                  Outside Dhaka Delivery Charge (৳)
                </label>
                <input
                  type="number"
                  required
                  value={outsideDhakaFee}
                  onChange={(e) => setOutsideDhakaFee(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-4 py-2 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                  Free Shipping Minimum Cart (৳)
                </label>
                <input
                  type="number"
                  required
                  value={freeShippingThreshold}
                  onChange={(e) => setFreeShippingThreshold(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-4 py-2 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Exclusive K-Beauty Launch Hero Banner */}
        <div className="bg-[#211a1c] border border-[#3d2b2d] p-6 rounded-2xl shadow-lg space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[#312325]">
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
            <div>
              <h3 className="font-serif-display text-base font-bold text-white">
                Exclusive K-Beauty Launch — Hero Section Banner
              </h3>
              <p className="text-[11px] text-neutral-400">
                Change the main homepage hero banner image and copy.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Image Upload & Live Preview */}
            <div className="md:col-span-4 space-y-3">
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
                Hero Launch Image
              </label>
              
              <div className="relative rounded-2xl overflow-hidden bg-[#171315] border border-[#3d2b2d] aspect-[3/4] flex items-center justify-center group shadow-md">
                <img
                  src={heroImageUrl || '/cathy_doll_cushion.jpg'}
                  alt="Hero Preview"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/cathy_doll_cushion.jpg';
                  }}
                  className="w-full h-full object-contain p-2"
                />
                <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center gap-2">
                  <span className="text-[10px] text-neutral-200 font-medium">Click button below to upload new file</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="w-full px-4 py-2.5 bg-[#312325] hover:bg-[#422e31] text-[#f8d4c1] rounded-xl text-xs font-bold transition-all border border-[#523337] flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                  {uploadingHeroImage ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#d4af37]" />
                      <span>Uploading Image...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 text-[#d4af37]" />
                      <span>Upload File from Device</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    className="hidden"
                    disabled={uploadingHeroImage}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'hero');
                    }}
                  />
                </label>

                <div>
                  <label className="block text-[10px] text-neutral-400 mb-1">Image URL Path</label>
                  <input
                    type="text"
                    value={heroImageUrl}
                    onChange={(e) => setHeroImageUrl(e.target.value)}
                    placeholder="/uploads/..."
                    className="w-full px-3 py-1.5 bg-[#171315] border border-[#3d2b2d] rounded-lg text-[11px] text-neutral-300 focus:outline-none focus:border-[#8c3b31]"
                  />
                </div>
              </div>
            </div>

            {/* Hero Copy & Details */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Hero Tagline / Badge Text
                </label>
                <input
                  type="text"
                  value={heroBadgeText}
                  onChange={(e) => setHeroBadgeText(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Main Headline / Product Title
                </label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Hero Subtitle Description
                </label>
                <textarea
                  rows={3}
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Offer Price (৳ BDT)
                  </label>
                  <input
                    type="number"
                    value={heroPrice}
                    onChange={(e) => setHeroPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Original Regular Price (৳ BDT)
                  </label>
                  <input
                    type="number"
                    value={heroOriginalPrice}
                    onChange={(e) => setHeroOriginalPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Featured Categories Cards & Images Customization */}
        <div className="bg-[#211a1c] border border-[#3d2b2d] p-6 rounded-2xl shadow-lg space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#312325]">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-[#d4af37]" />
              <div>
                <h3 className="font-serif-display text-base font-bold text-white">
                  Featured Categories Cards & Images
                </h3>
                <p className="text-[11px] text-neutral-400">
                  Manage category titles, badges, descriptions, and background images.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddCategory}
              className="px-3.5 py-2 bg-[#312325] hover:bg-[#422e31] text-[#f8d4c1] border border-[#523337] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#d4af37]" />
              <span>Add Category Card</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categoryList.map((cat, idx) => (
              <div
                key={cat.id || idx}
                className="bg-[#171315] border border-[#3d2b2d] p-4 rounded-xl space-y-4 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider">
                      Category Card #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(idx)}
                      className="text-neutral-500 hover:text-red-400 p-1 rounded-md transition-colors cursor-pointer"
                      title="Remove Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Category Image Preview */}
                  <div className="relative rounded-xl overflow-hidden bg-neutral-900 border border-[#3d2b2d] aspect-[16/9] mb-3 flex items-center justify-center">
                    <img
                      src={cat.image || '/cathy_doll_cushion.jpg'}
                      alt={cat.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/cathy_doll_cushion.jpg';
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Upload Image Button */}
                  <label className="w-full py-2 px-3 bg-[#261d1f] hover:bg-[#332629] text-neutral-200 rounded-lg text-[11px] font-bold transition-all border border-[#3d2b2d] flex items-center justify-center gap-2 cursor-pointer mb-3">
                    {uploadingCatIndex === idx ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#d4af37]" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>Upload Category Image</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      className="hidden"
                      disabled={uploadingCatIndex === idx}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleCategoryFileUpload(file, idx);
                      }}
                    />
                  </label>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                        Category Name
                      </label>
                      <input
                        type="text"
                        value={cat.name}
                        onChange={(e) => {
                          const updated = [...categoryList];
                          updated[idx] = { ...updated[idx], name: e.target.value };
                          setCategoryList(updated);
                        }}
                        className="w-full px-3 py-1.5 bg-[#211a1c] border border-[#3d2b2d] rounded-lg text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                        Badge / Item Count Tag
                      </label>
                      <input
                        type="text"
                        value={cat.itemCount}
                        onChange={(e) => {
                          const updated = [...categoryList];
                          updated[idx] = { ...updated[idx], itemCount: e.target.value };
                          setCategoryList(updated);
                        }}
                        className="w-full px-3 py-1.5 bg-[#211a1c] border border-[#3d2b2d] rounded-lg text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                        Short Subtitle
                      </label>
                      <input
                        type="text"
                        value={cat.description}
                        onChange={(e) => {
                          const updated = [...categoryList];
                          updated[idx] = { ...updated[idx], description: e.target.value };
                          setCategoryList(updated);
                        }}
                        className="w-full px-3 py-1.5 bg-[#211a1c] border border-[#3d2b2d] rounded-lg text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-neutral-500 mb-1">Image URL</label>
                      <input
                        type="text"
                        value={cat.image}
                        onChange={(e) => {
                          const updated = [...categoryList];
                          updated[idx] = { ...updated[idx], image: e.target.value };
                          setCategoryList(updated);
                        }}
                        className="w-full px-3 py-1.5 bg-[#211a1c] border border-[#3d2b2d] rounded-lg text-[10px] text-neutral-300 focus:outline-none focus:border-[#8c3b31]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Collection Banner Configuration */}
        <div className="bg-[#211a1c] border border-[#3d2b2d] p-6 rounded-2xl shadow-lg space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[#312325]">
            <ImageIcon className="w-5 h-5 text-[#d4af37]" />
            <div>
              <h3 className="font-serif-display text-base font-bold text-white">
                Bottom Collection Showcase Banner
              </h3>
              <p className="text-[11px] text-neutral-400">
                Customize the wide banner image and text shown at the bottom of the homepage.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Image Preview & Upload */}
            <div className="md:col-span-4 space-y-3">
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
                Collection Banner Image
              </label>

              <div className="relative rounded-2xl overflow-hidden bg-[#171315] border border-[#3d2b2d] aspect-[16/9] flex items-center justify-center group shadow-md">
                <img
                  src={collectionBannerImageUrl || '/cathy_doll_cushion.jpg'}
                  alt="Collection Banner Preview"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/cathy_doll_cushion.jpg';
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="w-full px-4 py-2.5 bg-[#312325] hover:bg-[#422e31] text-[#f8d4c1] rounded-xl text-xs font-bold transition-all border border-[#523337] flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                  {uploadingCollectionImage ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#d4af37]" />
                      <span>Uploading Banner...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 text-[#d4af37]" />
                      <span>Upload Banner File</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    className="hidden"
                    disabled={uploadingCollectionImage}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'collection');
                    }}
                  />
                </label>

                <div>
                  <label className="block text-[10px] text-neutral-400 mb-1">Banner Image URL</label>
                  <input
                    type="text"
                    value={collectionBannerImageUrl}
                    onChange={(e) => setCollectionBannerImageUrl(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#171315] border border-[#3d2b2d] rounded-lg text-[11px] text-neutral-300 focus:outline-none focus:border-[#8c3b31]"
                  />
                </div>
              </div>
            </div>

            {/* Banner Content Fields */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Badge Tagline
                </label>
                <input
                  type="text"
                  value={collectionBannerBadge}
                  onChange={(e) => setCollectionBannerBadge(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Banner Headline
                </label>
                <input
                  type="text"
                  value={collectionBannerTitle}
                  onChange={(e) => setCollectionBannerTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Banner Description
                </label>
                <textarea
                  rows={2}
                  value={collectionBannerSubtitle}
                  onChange={(e) => setCollectionBannerSubtitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Action Button Label Text
                </label>
                <input
                  type="text"
                  value={collectionBannerButtonText}
                  onChange={(e) => setCollectionBannerButtonText(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Global Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={savingSettings}
            className="px-8 py-4 bg-[#8c3b31] hover:bg-[#a84438] text-white rounded-xl text-sm font-bold transition-all shadow-xl flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-5 h-5 text-[#d4af37]" />
            <span>{savingSettings ? 'Saving All Settings...' : 'Save All Store & Banner Settings'}</span>
          </button>
        </div>

      </form>

      {/* Section 5: Admin Security Credentials Form */}
      <div className="bg-[#211a1c] border border-[#3d2b2d] p-6 rounded-2xl shadow-lg space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#312325]">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="font-serif-display text-base font-bold text-white">
            Admin Profile & Security Password
          </h3>
        </div>

        <form onSubmit={handleUpdateAdminCredentials} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
              Admin Login Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Leave blank to keep current"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={savingPassword}
              className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-bold transition-all border border-neutral-700 cursor-pointer disabled:opacity-50"
            >
              {savingPassword ? 'Updating...' : 'Update Admin Credentials'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
