import React, { useState, useMemo, useEffect } from 'react';
import {
  Shield,
  Lock,
  Unlock,
  Plus,
  Trash2,
  Eye,
  Sparkles,
  Building2,
  MapPin,
  DollarSign,
  Maximize2,
  BedDouble,
  Bath,
  CheckCircle2,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  Images,
  ArrowLeft,
  Search,
  Filter,
  RefreshCw,
  SlidersHorizontal,
  Home,
  Check,
  X,
  ExternalLink,
  KeyRound,
  Pencil,
  Star,
  Layers,
  ArrowUpDown,
  Mail,
  Key,
  ShieldCheck,
  Clock,
  Loader2,
  Settings,
} from 'lucide-react';
import { Property, AppPage } from '../types';
import { formatCurrency, formatRawAmount, xafToUSDBase, convertPrice } from '../utils/currency';
import {
  loginAdmin,
  verify2FA,
  verifyAdminSession,
  clearAdminSession,
  changeAdminPassword,
  getStoredAdminUser,
  getAdminToken,
  AdminUser,
} from '../utils/api';
import { AdminSecurityCenter } from '../components/AdminSecurityCenter';
import logoImg from '../assets/images/logo.webp';

interface AdminDashboardProps {
  properties: Property[];
  onAddProperty: (property: Property) => void;
  onUpdateProperty?: (property: Property) => void;
  onRemoveProperty: (propertyId: string) => void;
  onResetProperties: () => void;
  onSelectProperty: (property: Property) => void;
  onNavigate: (page: AppPage) => void;
}

const PRESET_ARCHITECTURAL_IMAGES = [
  {
    name: 'Modernist Bastos Villa (Cantilever & Slat Facade)',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Bonapriso Executive Waterfront Residence',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Kribi Oceanfront Modernist Sanctuary',
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Yaoundé Golf Diplomatic Penthouse',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Ultra-Modern Minimalist Glass Pavilion',
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Bel Air Contemporary Horizon Estate',
    url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Sunlit Living Room & Interior Lounge',
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Modern Fitted Kitchen & Dining Suite',
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Master Bedroom Suite & Balcony View',
    url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85',
  },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  properties,
  onAddProperty,
  onUpdateProperty,
  onRemoveProperty,
  onResetProperties,
  onSelectProperty,
  onNavigate,
}) => {
  // Security Authentication State (Option 2 Backend Auth)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(getAdminToken());
  });
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => getStoredAdminUser());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState('');
  const [lockoutRemaining, setLockoutRemaining] = useState<number>(0);
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);

  // 2FA Challenge State
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [temp2FAToken, setTemp2FAToken] = useState('');
  const [otpCodeInput, setOtpCodeInput] = useState('');
  const [demoOtpHint, setDemoOtpHint] = useState('');
  const [isVerifying2FA, setIsVerifying2FA] = useState(false);

  // Password Change Modal State
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [changePasswordError, setChangePasswordError] = useState('');
  const [changePasswordSuccess, setChangePasswordSuccess] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Tab & Filter State within Admin
  const [activeTab, setActiveTab] = useState<'inventory' | 'add' | 'security'>('inventory');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Form State for Adding New Property
  const [formName, setFormName] = useState('');
  const [formType, setFormType] = useState<Property['category']>('Apartment');
  const [formCountry, setFormCountry] = useState('Cameroon');
  const [formCity, setFormCity] = useState('Buea');
  const [formPriceFCFA, setFormPriceFCFA] = useState<number | string>(350000);
  const [formSizeM2, setFormSizeM2] = useState<number | string>(180);
  const [formFloors, setFormFloors] = useState<number | string>(1);
  const [formBeds, setFormBeds] = useState<number | string>(3);
  const [formBaths, setFormBaths] = useState<number | string>(2);
  
  // Primary Image State (Add Form)
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formImagePreview, setFormImagePreview] = useState(PRESET_ARCHITECTURAL_IMAGES[0].url);

  // Secondary Images / Gallery State (Add Form)
  const [formSecondaryImages, setFormSecondaryImages] = useState<string[]>([]);
  const [formSecondaryUrlInput, setFormSecondaryUrlInput] = useState('');

  const [formDescription, setFormDescription] = useState(
    'Quality residential rental property with secure perimeter, constant water supply, and comfortable living spaces.'
  );
  const [formFeatures, setFormFeatures] = useState<string>(
    '24/7 Security, Continuous Water Supply, Fitted Kitchen, Balcony, Parking Space'
  );
  const [formAgentName, setFormAgentName] = useState('Enownfor Manyi-Oben');
  const [formAgentPhone, setFormAgentPhone] = useState('677499722');
  const [formSuccessMessage, setFormSuccessMessage] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // ==========================================
  // EDIT PROPERTY STATE & MODAL
  // ==========================================
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [editName, setEditName] = useState('');
  const [editType, setEditType] = useState<Property['category']>('Apartment');
  const [editCountry, setEditCountry] = useState('Cameroon');
  const [editCity, setEditCity] = useState('Buea');
  const [editPriceFCFA, setEditPriceFCFA] = useState<number | string>(350000);
  const [editSizeM2, setEditSizeM2] = useState<number | string>(180);
  const [editFloors, setEditFloors] = useState<number | string>(1);
  const [editBeds, setEditBeds] = useState<number | string>(3);
  const [editBaths, setEditBaths] = useState<number | string>(2);
  const [editPrimaryImageUrl, setEditPrimaryImageUrl] = useState('');
  const [editPrimaryImagePreview, setEditPrimaryImagePreview] = useState('');
  const [editSecondaryImages, setEditSecondaryImages] = useState<string[]>([]);
  const [editSecondaryUrlInput, setEditSecondaryUrlInput] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editFeatures, setEditFeatures] = useState('');
  const [editAgentName, setEditAgentName] = useState('');
  const [editAgentPhone, setEditAgentPhone] = useState('');
  const [editErrors, setEditErrors] = useState<Record<string, string>>({});
  const [editSuccessMessage, setEditSuccessMessage] = useState('');

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutRemaining <= 0) return;
    const timer = setInterval(() => {
      setLockoutRemaining((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutRemaining]);

  // Check token session validity on mount
  useEffect(() => {
    const existingToken = getAdminToken();
    if (existingToken) {
      verifyAdminSession().then((isValid) => {
        if (!isValid) {
          setIsAuthenticated(false);
          setAdminUser(null);
        }
      });
    }
  }, []);

  // Handle Backend Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutRemaining > 0) return;

    if (!email.trim() || !password) {
      setAuthError('Please enter your authorized email address and master password.');
      return;
    }

    setIsLoggingIn(true);
    setAuthError('');

    const res = await loginAdmin(email.trim(), password, rememberMe);
    setIsLoggingIn(false);

    if (res.success && res.requires2FA) {
      setTwoFactorRequired(true);
      setTemp2FAToken(res.tempToken || '');
      setDemoOtpHint(res.demoOtpHint || '');
      setAuthError('');
      return;
    }

    if (res.success && res.user) {
      setIsAuthenticated(true);
      setAdminUser(res.user);
      setPassword('');
      setAuthError('');
      setAttemptsRemaining(null);
    } else {
      if (res.locked && res.remainingSecs) {
        setLockoutRemaining(res.remainingSecs);
      }
      if (res.attemptsLeft !== undefined) {
        setAttemptsRemaining(res.attemptsLeft);
      }
      setAuthError(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  // Handle 2FA OTP Submission
  const handleVerify2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCodeInput.trim() || !temp2FAToken) {
      setAuthError('Please enter the 6-digit OTP verification code.');
      return;
    }

    setIsVerifying2FA(true);
    setAuthError('');

    const res = await verify2FA(temp2FAToken, otpCodeInput.trim(), rememberMe);
    setIsVerifying2FA(false);

    if (res.success && res.user) {
      setIsAuthenticated(true);
      setAdminUser(res.user);
      setTwoFactorRequired(false);
      setTemp2FAToken('');
      setOtpCodeInput('');
      setPassword('');
      setAuthError('');
    } else {
      setAuthError(res.error || 'Invalid 2FA code. Please try again.');
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    setIsAuthenticated(false);
    setAdminUser(null);
    setPassword('');
    setTwoFactorRequired(false);
    setTemp2FAToken('');
    setOtpCodeInput('');
  };

  // Handle Password Change
  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangePasswordError('');
    setChangePasswordSuccess('');

    if (!currentPasswordInput) {
      setChangePasswordError('Please enter your current password.');
      return;
    }
    if (!newPasswordInput || newPasswordInput.length < 6) {
      setChangePasswordError('New password must be at least 6 characters.');
      return;
    }
    if (newPasswordInput !== confirmPasswordInput) {
      setChangePasswordError('New password and confirmation do not match.');
      return;
    }

    setIsChangingPassword(true);
    const res = await changeAdminPassword(currentPasswordInput, newPasswordInput);
    setIsChangingPassword(false);

    if (res.success) {
      setChangePasswordSuccess(res.message || 'Password successfully updated on server.');
      setCurrentPasswordInput('');
      setNewPasswordInput('');
      setConfirmPasswordInput('');
      setTimeout(() => {
        setShowChangePasswordModal(false);
        setChangePasswordSuccess('');
      }, 1500);
    } else {
      setChangePasswordError(res.error || 'Failed to update password.');
    }
  };

  // Primary Image Upload Handler
  const handlePrimaryFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (isEdit) {
          setEditPrimaryImagePreview(result);
          setEditPrimaryImageUrl(result);
        } else {
          setFormImagePreview(result);
          setFormImageUrl(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Secondary Images Upload Handler (Multi-file)
  const handleSecondaryFilesUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          if (isEdit) {
            setEditSecondaryImages((prev) => [...prev, result]);
          } else {
            setFormSecondaryImages((prev) => [...prev, result]);
          }
        };
        reader.readAsDataURL(file);
      }
      e.target.value = '';
    }
  };

  // Add Secondary Image by URL
  const handleAddSecondaryUrl = (isEdit = false) => {
    if (isEdit) {
      if (editSecondaryUrlInput.trim()) {
        setEditSecondaryImages((prev) => [...prev, editSecondaryUrlInput.trim()]);
        setEditSecondaryUrlInput('');
      }
    } else {
      if (formSecondaryUrlInput.trim()) {
        setFormSecondaryImages((prev) => [...prev, formSecondaryUrlInput.trim()]);
        setFormSecondaryUrlInput('');
      }
    }
  };

  // Remove Secondary Image
  const handleRemoveSecondaryImage = (index: number, isEdit = false) => {
    if (isEdit) {
      setEditSecondaryImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setFormSecondaryImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Set a Secondary Image as Primary (Swaps current primary into secondary gallery)
  const handlePromoteToPrimary = (index: number, isEdit = false) => {
    if (isEdit) {
      const currentPrimary = editPrimaryImageUrl || editPrimaryImagePreview;
      const targetSecondary = editSecondaryImages[index];
      const newSecondaries = editSecondaryImages.filter((_, i) => i !== index);
      if (currentPrimary && currentPrimary !== targetSecondary) {
        newSecondaries.unshift(currentPrimary);
      }
      setEditPrimaryImageUrl(targetSecondary);
      setEditPrimaryImagePreview(targetSecondary);
      setEditSecondaryImages(newSecondaries);
    } else {
      const currentPrimary = formImageUrl || formImagePreview;
      const targetSecondary = formSecondaryImages[index];
      const newSecondaries = formSecondaryImages.filter((_, i) => i !== index);
      if (currentPrimary && currentPrimary !== targetSecondary) {
        newSecondaries.unshift(currentPrimary);
      }
      setFormImageUrl(targetSecondary);
      setFormImagePreview(targetSecondary);
      setFormSecondaryImages(newSecondaries);
    }
  };

  // Open Edit Modal for a property
  const handleStartEdit = (prop: Property) => {
    setEditingProperty(prop);
    setEditName(prop.title);
    setEditType(prop.category);
    setEditCountry(prop.country || 'Cameroon');
    setEditCity(prop.city || 'Buea');
    setEditPriceFCFA(convertPrice(prop.price, 'XAF'));
    setEditSizeM2(prop.sizeM2);
    setEditFloors(prop.floors || 1);
    setEditBeds(prop.beds || 1);
    setEditBaths(prop.baths || 1);
    setEditPrimaryImageUrl(prop.image);
    setEditPrimaryImagePreview(prop.image);
    
    // Extract secondary images (excluding primary image)
    const secondaries = (prop.gallery || []).filter((img) => Boolean(img && img !== prop.image));
    setEditSecondaryImages(secondaries);
    setEditSecondaryUrlInput('');

    setEditDescription(prop.description || '');
    setEditFeatures((prop.features || []).join(', '));
    setEditAgentName(prop.agent?.name || 'Enownfor Manyi-Oben');
    setEditAgentPhone(prop.agent?.phone || '677499722');
    setEditErrors({});
    setEditSuccessMessage('');
  };

  // Save Edit Property Handler
  const handleSaveEditProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty) return;

    const errors: Record<string, string> = {};
    if (!editName.trim()) errors.name = 'Property title is required';
    if (!editCity.trim()) errors.city = 'City is required';
    if (!editCountry.trim()) errors.country = 'Country is required';
    if (!editPriceFCFA || Number(editPriceFCFA) <= 0) errors.price = 'Valid monthly rent in FCFA is required';
    if (editSizeM2 === '' || isNaN(Number(editSizeM2)) || Number(editSizeM2) < 0) {
      errors.size = 'Please enter a valid area size in m² (any amount)';
    }

    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      return;
    }

    const finalPrimaryImage = editPrimaryImageUrl.trim() || editPrimaryImagePreview || editingProperty.image;
    const finalGallery = Array.from(new Set([finalPrimaryImage, ...editSecondaryImages.filter(Boolean)]));

    const featureList = editFeatures
      .split(',')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const basePriceUSD = xafToUSDBase(Number(editPriceFCFA));

    const updatedProperty: Property = {
      ...editingProperty,
      title: editName.trim(),
      address: `${editCity.trim()}, ${editCountry.trim()}`,
      price: basePriceUSD,
      location: `${editCity}, ${editCountry}`,
      country: editCountry.trim(),
      region: editCity.trim(),
      city: editCity.trim(),
      sizeM2: Number(editSizeM2) || 0,
      sqft: Math.round((Number(editSizeM2) || 0) * 10.7639),
      floors: Number(editFloors) || 1,
      beds: Number(editBeds) || 1,
      baths: Number(editBaths) || 1,
      image: finalPrimaryImage,
      gallery: finalGallery,
      category: editType,
      description: editDescription.trim(),
      features: featureList.length > 0 ? featureList : editingProperty.features,
      agent: {
        ...editingProperty.agent,
        name: editAgentName || editingProperty.agent?.name || 'Enownfor Manyi-Oben',
        phone: editAgentPhone || editingProperty.agent?.phone || '677499722',
        avatar: editingProperty.agent?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      },
    };

    if (onUpdateProperty) {
      onUpdateProperty(updatedProperty);
    }
    setEditSuccessMessage(`"${updatedProperty.title}" updated successfully!`);
    setTimeout(() => {
      setEditingProperty(null);
      setEditSuccessMessage('');
    }, 1200);
  };

  // Handle Form Submission for Adding Property
  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formName.trim()) errors.name = 'Property title is required';
    if (!formCity.trim()) errors.city = 'City is required';
    if (!formCountry.trim()) errors.country = 'Country is required';
    if (!formPriceFCFA || Number(formPriceFCFA) <= 0) errors.price = 'Valid monthly rent in FCFA is required';
    if (formSizeM2 === '' || isNaN(Number(formSizeM2)) || Number(formSizeM2) < 0) {
      errors.size = 'Please enter a valid area size in m² (any amount)';
    }

    const finalPrimaryImage = formImageUrl.trim() || formImagePreview || PRESET_ARCHITECTURAL_IMAGES[0].url;
    const finalGallery = Array.from(new Set([finalPrimaryImage, ...formSecondaryImages.filter(Boolean)]));

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const featureList = formFeatures
      .split(',')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const generatedId =
      formName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') +
      '-' +
      Math.floor(1000 + Math.random() * 9000);

    const basePriceUSD = xafToUSDBase(Number(formPriceFCFA));

    const newProperty: Property = {
      id: generatedId,
      title: formName.trim(),
      address: `${formCity.trim()}, ${formCountry.trim()}`,
      price: basePriceUSD,
      location: `${formCity}, ${formCountry}`,
      country: formCountry.trim(),
      region: formCity.trim(),
      city: formCity.trim(),
      sizeM2: Number(formSizeM2) || 0,
      sqft: Math.round((Number(formSizeM2) || 0) * 10.7639),
      floors: Number(formFloors) || 1,
      beds: Number(formBeds) || 1,
      baths: Number(formBaths) || 1,
      image: finalPrimaryImage,
      gallery: finalGallery,
      type: 'Rent',
      category: formType,
      description: formDescription.trim(),
      features: featureList.length > 0 ? featureList : ['24/7 Security', 'Solar Power Backup', 'Modern Kitchen'],
      yearBuilt: new Date().getFullYear(),
      isNew: true,
      featured: true,
      agent: {
        name: formAgentName || 'Enownfor Manyi-Oben',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        phone: formAgentPhone || '677499722',
        role: 'Property Manager',
      },
    };

    onAddProperty(newProperty);
    setFormSuccessMessage(`"${newProperty.title}" successfully added to the live catalog!`);
    setFormErrors({});

    // Reset fields
    setFormName('');
    setFormSecondaryImages([]);
    setTimeout(() => {
      setFormSuccessMessage('');
      setActiveTab('inventory');
    }, 1800);
  };

  // Filtered Properties for the inventory table
  const adminFilteredProperties = useMemo(() => {
    return properties.filter((p) => {
      if (typeFilter !== 'All' && p.category !== typeFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [properties, searchQuery, typeFilter]);

  // Statistics calculation in FCFA
  const totalValueFCFA = useMemo(() => {
    return properties.reduce((acc, curr) => acc + convertPrice(curr.price, 'XAF'), 0);
  }, [properties]);

  const avgRentFCFA = useMemo(() => {
    return properties.length ? Math.round(totalValueFCFA / properties.length) : 0;
  }, [properties, totalValueFCFA]);

  const citiesList = useMemo(() => {
    const set = new Set(properties.map((p) => p.city || p.location.split(',')[0]));
    return Array.from(set);
  }, [properties]);

  // ==========================================
  // VIEW 1: FULL-STACK BACKEND AUTH LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-zinc-200/90 shadow-2xl relative overflow-hidden">
          {/* Top Decorative security accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-zinc-950 via-amber-600 to-zinc-950" />

          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-zinc-950 text-white flex items-center justify-center mx-auto mb-4 shadow-lg ring-4 ring-amber-500/10">
              <Shield className="w-7 h-7 text-amber-400" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-[10px] font-bold uppercase tracking-wider mb-2 border border-zinc-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Express 256-Bit Token Security
            </div>
            <h1 className="text-2xl font-bold text-zinc-950 tracking-tight">
              Admin Authentication
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Authorized real estate administration portal. Authenticate with your encrypted credentials to proceed.
            </p>
          </div>

          {/* Lockout Banner */}
          {lockoutRemaining > 0 && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs font-semibold flex items-center gap-3 animate-pulse">
              <Clock className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <p className="font-bold">Security Lockout Active</p>
                <p className="text-[11px] font-normal text-red-700 mt-0.5">
                  Too many failed attempts. Try again in{' '}
                  <span className="font-mono font-bold text-red-950">{lockoutRemaining}s</span>.
                </p>
              </div>
            </div>
          )}

          {/* Conditional Login Form vs 2FA Form */}
          {twoFactorRequired ? (
            <form onSubmit={handleVerify2FASubmit} className="space-y-4 animate-in fade-in duration-200">
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Two-Factor Authentication Active</span>
                </div>
                <p className="text-amber-800 text-[11px] leading-relaxed">
                  Enter the 6-digit OTP verification code to finalize your secure session.
                </p>
                {demoOtpHint && (
                  <div className="mt-2 pt-2 border-t border-amber-200/80 flex items-center justify-between text-[11px]">
                    <span className="text-amber-700">Calculated OTP:</span>
                    <span className="font-mono font-bold bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                      {demoOtpHint}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  6-Digit Verification Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    autoFocus
                    value={otpCodeInput}
                    onChange={(e) => {
                      setOtpCodeInput(e.target.value.replace(/\D/g, '').slice(0, 6));
                      if (authError) setAuthError('');
                    }}
                    placeholder="123456"
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-center text-lg font-mono font-bold tracking-widest text-zinc-950 focus:outline-hidden focus:ring-2 focus:ring-zinc-950 focus:bg-white transition-all"
                  />
                  <Key className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying2FA || otpCodeInput.length < 6}
                className="w-full py-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying2FA ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Validating OTP...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Verify 2FA Code & Proceed
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setTwoFactorRequired(false);
                  setTemp2FAToken('');
                  setOtpCodeInput('');
                  setAuthError('');
                }}
                className="w-full py-2 text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer text-center"
              >
                ← Back to standard login
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Authorized Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (authError) setAuthError('');
                    }}
                    disabled={lockoutRemaining > 0 || isLoggingIn}
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-xs sm:text-sm font-medium text-zinc-950 focus:outline-hidden focus:ring-2 focus:ring-zinc-950 focus:bg-white transition-all disabled:opacity-50"
                  />
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">
                    Master Password
                  </label>
                  {attemptsRemaining !== null && attemptsRemaining > 0 && (
                    <span className="text-[11px] text-amber-600 font-semibold">
                      {attemptsRemaining} attempts left
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (authError) setAuthError('');
                    }}
                    placeholder="Enter encrypted password..."
                    disabled={lockoutRemaining > 0 || isLoggingIn}
                    className="w-full pl-10 pr-12 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-xs sm:text-sm font-mono text-zinc-950 focus:outline-hidden focus:ring-2 focus:ring-zinc-950 focus:bg-white transition-all tracking-wider placeholder:tracking-normal disabled:opacity-50"
                  />
                  <Key className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-500 hover:text-zinc-900 cursor-pointer"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {/* Remember Me checkbox */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-600 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950"
                  />
                  Remember admin session
                </label>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={lockoutRemaining > 0 || isLoggingIn}
                className="w-full py-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying Token...
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    Authenticate & Unlock Portal
                  </>
                )}
              </button>
            </form>
          )}

          {/* Security Features Overview */}
          <div className="mt-6 pt-5 border-t border-zinc-100 space-y-2">
            <div className="flex items-center gap-2 text-[11px] text-zinc-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Server-side bcrypt password encryption & verification</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-zinc-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>5-attempt brute-force rate limiter with temporary lockouts</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-zinc-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Cryptographically signed JWT bearer tokens</span>
            </div>
          </div>

          {/* Authorized credentials helper hint */}
          <div className="mt-4 p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-center">
            <p className="text-[10px] text-zinc-500">
              Restricted portal for authorized Easy House Cameroon administrators.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Portal Header Bar with Status & Navigation */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-zinc-950 text-white flex items-center justify-center shrink-0 shadow-md">
            <Shield className="w-7 h-7 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
                Property Portfolio & Inventory Hub
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Backend Authenticated
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Logged in as <span className="font-semibold text-zinc-800">{adminUser?.email || email}</span> • Token active & protected.
            </p>
          </div>
        </div>

        {/* Header Right Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => onNavigate('properties')}
            className="px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live Client Catalog
          </button>

          <button
            onClick={() => setShowChangePasswordModal(true)}
            className="px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5 text-zinc-500" />
            Security & Password
          </button>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-600 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Reset to default seed portfolio"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-xs font-semibold text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* 2. Key Inventory Metrics (in FCFA & Units) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total Active Units</span>
            <Building2 className="w-4 h-4 text-zinc-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-mono">
            {properties.length}
          </p>
          <p className="text-[11px] text-zinc-500 mt-1">Properties in server database</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Average Rent</span>
            <DollarSign className="w-4 h-4 text-zinc-400" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-zinc-950 font-mono truncate">
            {formatRawAmount(avgRentFCFA, 'XAF')}
          </p>
          <p className="text-[11px] text-zinc-500 mt-1">FCFA / month / property</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total Monthly Flow</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-zinc-950 font-mono truncate">
            {formatRawAmount(totalValueFCFA, 'XAF')}
          </p>
          <p className="text-[11px] text-zinc-500 mt-1">FCFA cumulative gross</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Coverage Cities</span>
            <MapPin className="w-4 h-4 text-zinc-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-mono">
            {citiesList.length}
          </p>
          <p className="text-[11px] text-zinc-500 mt-1 truncate">
            {citiesList.join(', ')}
          </p>
        </div>
      </div>

      {/* 3. Section Tabs Switcher (Inventory Directory vs Add New Property vs Security Center) */}
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'inventory'
              ? 'bg-zinc-950 text-white shadow-sm'
              : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
          }`}
        >
          <Building2 className="w-4 h-4" />
          Live Inventory Directory ({properties.length})
        </button>

        <button
          onClick={() => setActiveTab('add')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'add'
              ? 'bg-zinc-950 text-white shadow-sm'
              : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
          }`}
        >
          <Plus className="w-4 h-4" />
          Add New Property
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'security'
              ? 'bg-zinc-950 text-white shadow-sm'
              : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          Security Defenses & Audit Logs (100%)
        </button>
      </div>

      {/* ==================================================== */}
      {/* TAB 1: ADD NEW PROPERTY FORM */}
      {/* ==================================================== */}
      {activeTab === 'add' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/90 shadow-sm animate-in fade-in-50 duration-200">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
                Publish a New Property Listing
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                Fill in the specifications below. Upload a high-resolution primary showcase image and secondary gallery photos for the property inspection view.
              </p>
            </div>

            {formSuccessMessage && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-medium flex items-center gap-2 animate-in zoom-in-95">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{formSuccessMessage}</span>
              </div>
            )}

            <form onSubmit={handleCreateProperty} className="space-y-8">
              
              {/* Section 1: Basic Identity */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2 flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5" /> 1. Property Identity & Type
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      Property Title / Listing Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Modern Executive 2-Bedroom Apartment in Molyko"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 text-xs sm:text-sm focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                    />
                    {formErrors.name && (
                      <p className="text-xs text-red-600 mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      Property Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value as Property['category'])}
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 text-xs sm:text-sm focus:ring-2 focus:ring-zinc-950 focus:outline-hidden bg-white cursor-pointer"
                    >
                      <option value="Apartment">Apartment</option>
                      <option value="Single Room">Single Room</option>
                      <option value="Studio">Studio</option>
                      <option value="Modern House">Modern House</option>
                      <option value="Duplex">Duplex</option>
                      <option value="Villa">Villa</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Commercial">Commercial / Office Space</option>
                      <option value="Eco Retreat">Eco Retreat</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Location */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> 2. Location Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formCountry}
                      onChange={(e) => setFormCountry(e.target.value)}
                      placeholder="e.g. Cameroon"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 text-xs sm:text-sm focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                    />
                    {formErrors.country && (
                      <p className="text-xs text-red-600 mt-1">{formErrors.country}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      City / Destination <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      placeholder="e.g. Buea, Douala, Limbe, Yaoundé"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 text-xs sm:text-sm focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                    />
                    {formErrors.city && (
                      <p className="text-xs text-red-600 mt-1">{formErrors.city}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 3: Financials & Size Dimensions (NO SIZE CONSTRAINT) */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5" /> 3. Financials & Dimensional Specifications
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                  <div className="lg:col-span-2">
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      Monthly Rent (FCFA / XAF) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="5000"
                        min="1000"
                        value={formPriceFCFA}
                        onChange={(e) => setFormPriceFCFA(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full pl-4 pr-16 py-2.5 rounded-xl border border-zinc-300 text-xs sm:text-sm font-mono font-bold text-zinc-950 focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">
                        FCFA/mo
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      Display: {formatRawAmount(Number(formPriceFCFA) || 0, 'XAF')} / month
                    </p>
                    {formErrors.price && (
                      <p className="text-xs text-red-600 mt-1">{formErrors.price}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      Size in m² (Any Amount) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="any"
                      min="0"
                      value={formSizeM2}
                      onChange={(e) => setFormSizeM2(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="e.g. 15, 35, 120, 450"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 text-xs sm:text-sm focus:ring-2 focus:ring-zinc-950 focus:outline-hidden font-mono"
                    />
                    <p className="text-[11px] text-zinc-500 mt-1">
                      ≈ {formSizeM2 ? Math.round(Number(formSizeM2) * 10.7639) : 0} sq ft
                    </p>
                    {formErrors.size && (
                      <p className="text-xs text-red-600 mt-1">{formErrors.size}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={formBeds}
                      onChange={(e) => setFormBeds(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 text-xs sm:text-sm focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={formBaths}
                      onChange={(e) => setFormBaths(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 text-xs sm:text-sm focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Primary Architectural Image Asset */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-zinc-950" /> 4. Primary Image Asset (Main Showcase)
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 bg-zinc-100 rounded-md font-semibold text-zinc-600">
                    Card & Main Cover Photo
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                  {/* Image Preview Box */}
                  <div className="lg:col-span-1 border border-zinc-200 rounded-2xl p-3 bg-zinc-50">
                    <span className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-2">
                      Primary Photo Preview
                    </span>
                    <div className="aspect-4/3 rounded-xl overflow-hidden bg-zinc-200 relative group">
                      <img
                        src={formImageUrl.trim() || formImagePreview}
                        alt="Property Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = PRESET_ARCHITECTURAL_IMAGES[0].url;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                        Primary Cover Display
                      </div>
                    </div>
                  </div>

                  {/* Upload or URL Controls */}
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                        Upload Primary Photo from Device
                      </label>
                      <label className="border-2 border-dashed border-zinc-300 hover:border-zinc-500 rounded-xl p-4 flex items-center justify-center gap-3 cursor-pointer bg-zinc-50 hover:bg-zinc-100 transition-all">
                        <Upload className="w-5 h-5 text-zinc-500" />
                        <span className="text-xs font-semibold text-zinc-700">
                          Click to select main cover photo (PNG, JPG, WEBP)
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handlePrimaryFileUpload(e, false)}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                        Or Paste Direct Image URL
                      </label>
                      <input
                        type="url"
                        value={formImageUrl}
                        onChange={(e) => setFormImageUrl(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 text-xs sm:text-sm focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                      />
                    </div>

                    {/* Preset quick picker */}
                    <div>
                      <span className="block text-xs font-bold text-zinc-700 mb-2">
                        Or Pick a Curated Architecture Preset
                      </span>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {PRESET_ARCHITECTURAL_IMAGES.slice(0, 6).map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setFormImagePreview(preset.url);
                              setFormImageUrl(preset.url);
                            }}
                            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer relative ${
                              (formImageUrl || formImagePreview) === preset.url
                                ? 'border-zinc-950 ring-2 ring-zinc-950/20'
                                : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                            title={preset.name}
                          >
                            <img
                              src={preset.url}
                              alt={preset.name}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: Secondary Images & Gallery Upload (For Property Details) */}
              <div className="space-y-4 bg-zinc-50/80 p-5 sm:p-6 rounded-2xl border border-zinc-200">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2.5">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-zinc-950 flex items-center gap-1.5">
                      <Images className="w-4 h-4 text-amber-600" /> 5. Secondary Images (Property Details Gallery)
                    </h3>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      Upload interior rooms, kitchen, bathrooms, balcony, or compound photos. These will be viewable in the property details slideshow.
                    </p>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-white border border-zinc-200 rounded-full font-bold text-zinc-800">
                    {formSecondaryImages.length} Secondary {formSecondaryImages.length === 1 ? 'Photo' : 'Photos'}
                  </span>
                </div>

                {/* Upload & Add Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      Upload Multiple Secondary Photos
                    </label>
                    <label className="border-2 border-dashed border-zinc-300 hover:border-zinc-500 rounded-xl p-3.5 flex items-center justify-center gap-2.5 cursor-pointer bg-white hover:bg-zinc-50 transition-all text-center">
                      <Upload className="w-4 h-4 text-zinc-600" />
                      <span className="text-xs font-semibold text-zinc-800">
                        Choose photo files (Select 1 or more)
                      </span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleSecondaryFilesUpload(e, false)}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      Add Image via URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={formSecondaryUrlInput}
                        onChange={(e) => setFormSecondaryUrlInput(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSecondaryUrl(false);
                          }
                        }}
                        className="flex-1 px-3 py-2 bg-white rounded-xl border border-zinc-300 text-xs focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddSecondaryUrl(false)}
                        className="px-3.5 py-2 bg-zinc-950 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
                      >
                        Add Photo
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Add from Curated Room Presets */}
                <div>
                  <span className="block text-[11px] font-bold text-zinc-600 mb-1.5">
                    Or Quick-Add Secondary Angles:
                  </span>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {PRESET_ARCHITECTURAL_IMAGES.slice(6).map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          if (!formSecondaryImages.includes(preset.url)) {
                            setFormSecondaryImages((prev) => [...prev, preset.url]);
                          }
                        }}
                        className="px-2.5 py-1.5 rounded-lg border border-zinc-300 bg-white hover:bg-zinc-100 text-[11px] font-medium text-zinc-700 flex items-center gap-1.5 shrink-0 cursor-pointer"
                      >
                        <Plus className="w-3 h-3 text-zinc-500" />
                        {preset.name.split('&')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Secondary Images Thumbnail Grid */}
                {formSecondaryImages.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-2">
                    {formSecondaryImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative group rounded-xl overflow-hidden border border-zinc-300 bg-white aspect-4/3 shadow-xs"
                      >
                        <img
                          src={img}
                          alt={`Secondary photo ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-1">
                          <button
                            type="button"
                            onClick={() => handlePromoteToPrimary(idx, false)}
                            className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-zinc-950 text-[10px] font-bold shadow-xs cursor-pointer"
                            title="Make this the main primary photo"
                          >
                            Set Main
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveSecondaryImage(idx, false)}
                            className="p-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-xs cursor-pointer"
                            title="Remove this photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="absolute bottom-1 left-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-white">
                          #{idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-4 text-center text-xs text-zinc-400 bg-white rounded-xl border border-dashed border-zinc-200">
                    No secondary photos added yet. Upload room or detail photos to let visitors browse a gallery.
                  </div>
                )}
              </div>

              {/* Section 6: Description & Features */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5" /> 6. Description & Amenities
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      Property Description
                    </label>
                    <textarea
                      rows={3}
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      placeholder="Highlight architectural qualities, neighborhood advantages, security, and natural light..."
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 text-xs sm:text-sm focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      Key Amenities & Features (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formFeatures}
                      onChange={(e) => setFormFeatures(e.target.value)}
                      placeholder="e.g. 24/7 Security Guard, Borehole Water Supply, Standby Generator, Gated Compound"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 text-xs sm:text-sm focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Section 7: Dedicated Contact Agent */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5" /> 7. Assigned Property Manager
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      Agent / Manager Name
                    </label>
                    <input
                      type="text"
                      value={formAgentName}
                      onChange={(e) => setFormAgentName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 text-xs sm:text-sm focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      Agent Phone / WhatsApp (9 Digits)
                    </label>
                    <input
                      type="tel"
                      maxLength={9}
                      value={formAgentPhone}
                      onChange={(e) => setFormAgentPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                      placeholder="677499722"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 text-xs sm:text-sm font-mono focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-zinc-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('inventory')}
                  className="px-5 py-2.5 rounded-xl border border-zinc-300 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold transition-all shadow-md active:scale-98 cursor-pointer flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Publish Live to Catalog
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 2: LIVE INVENTORY DIRECTORY & EDIT CONTROLS */}
      {/* ==================================================== */}
      {activeTab === 'inventory' && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          
          {/* Search & Category Filter Toolbar */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-zinc-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search properties by title, city, or category..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-950 focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Type:
              </span>
              {['All', 'Apartment', 'Single Room', 'Studio', 'Modern House', 'Duplex', 'Villa', 'Penthouse', 'Commercial'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    typeFilter === t
                      ? 'bg-zinc-950 text-white'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Properties Table & Cards */}
          <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-zinc-600">
                <thead className="bg-zinc-50 border-b border-zinc-200 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  <tr>
                    <th className="px-5 py-4">Property</th>
                    <th className="px-4 py-4">Category</th>
                    <th className="px-4 py-4">Location</th>
                    <th className="px-4 py-4">Monthly Rent (FCFA)</th>
                    <th className="px-4 py-4">Dimensions</th>
                    <th className="px-4 py-4">Gallery</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {adminFilteredProperties.map((prop) => {
                    const priceFCFA = convertPrice(prop.price, 'XAF');
                    const galleryCount = Array.from(new Set([prop.image, ...(prop.gallery || [])])).length;

                    return (
                      <tr key={prop.id} className="hover:bg-zinc-50/80 transition-colors group">
                        
                        {/* Property Image & Title */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-11 rounded-lg overflow-hidden bg-zinc-100 shrink-0 relative border border-zinc-200">
                              <img
                                src={prop.image}
                                alt={prop.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-zinc-950 truncate max-w-xs sm:max-w-sm">
                                {prop.title}
                              </p>
                              <p className="text-[11px] text-zinc-400 font-mono">
                                ID: {prop.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-4 py-3.5">
                          <span className="px-2.5 py-1 rounded-md bg-zinc-100 font-semibold text-zinc-800 text-[11px]">
                            {prop.category}
                          </span>
                        </td>

                        {/* Location */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5 text-zinc-700">
                            <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                            <span className="truncate max-w-[140px]">{prop.location}</span>
                          </div>
                        </td>

                        {/* Monthly Rent */}
                        <td className="px-4 py-3.5">
                          <span className="font-bold font-mono text-zinc-950">
                            {formatRawAmount(priceFCFA, 'XAF')}
                          </span>
                          <span className="text-[11px] text-zinc-400 block font-sans">/ month</span>
                        </td>

                        {/* Dimensions */}
                        <td className="px-4 py-3.5">
                          <div className="text-zinc-800 font-mono text-xs">
                            <span className="font-bold">{prop.sizeM2} m²</span>
                            <span className="text-[11px] text-zinc-400 block font-sans">
                              {prop.beds || 0} bed • {prop.baths || 0} bath
                            </span>
                          </div>
                        </td>

                        {/* Gallery Badge */}
                        <td className="px-4 py-3.5">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-100 text-[11px] font-bold text-zinc-700 border border-zinc-200">
                            <Images className="w-3 h-3 text-zinc-500" />
                            {galleryCount} {galleryCount === 1 ? 'photo' : 'photos'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Inspect View */}
                            <button
                              onClick={() => onSelectProperty(prop)}
                              className="p-2 rounded-lg border border-zinc-200 hover:bg-zinc-100 text-zinc-700 transition-colors cursor-pointer"
                              title="Inspect Details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            {/* Edit Property Button */}
                            <button
                              onClick={() => handleStartEdit(prop)}
                              className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-950 hover:text-white text-zinc-800 transition-colors cursor-pointer font-semibold flex items-center gap-1"
                              title="Edit Property Specifications & Photos"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              <span className="text-xs hidden sm:inline">Edit</span>
                            </button>

                            {/* Delete Property Button */}
                            {deleteConfirmId === prop.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => {
                                    onRemoveProperty(prop.id);
                                    setDeleteConfirmId(null);
                                  }}
                                  className="px-2 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer"
                                >
                                  Delete
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(null)}
                                  className="p-1.5 rounded-lg border border-zinc-300 text-zinc-600 hover:bg-zinc-100 text-xs cursor-pointer"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirmId(prop.id)}
                                className="p-2 rounded-lg border border-zinc-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 text-zinc-400 transition-colors cursor-pointer"
                                title="Remove property"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {adminFilteredProperties.length === 0 && (
              <div className="p-12 text-center">
                <Building2 className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
                <p className="font-bold text-zinc-800">No properties matched your query.</p>
                <p className="text-xs text-zinc-500 mt-1">
                  Try clearing the search or category filter.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 3: ENTERPRISE SECURITY & DEFENSES (100%) */}
      {/* ==================================================== */}
      {activeTab === 'security' && (
        <AdminSecurityCenter
          onOpenChangePasswordModal={() => setShowChangePasswordModal(true)}
          onLogout={handleLogout}
        />
      )}

      {/* ==================================================== */}
      {/* EDIT PROPERTY MODAL */}
      {/* ==================================================== */}
      {editingProperty && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-4xl border border-zinc-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 sm:px-8 py-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-950 text-white flex items-center justify-center">
                  <Pencil className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-950 text-base sm:text-lg">
                    Edit Property Listing
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono">
                    ID: {editingProperty.id}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setEditingProperty(null)}
                className="p-2 rounded-xl hover:bg-zinc-200 text-zinc-500 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
              
              {editSuccessMessage && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{editSuccessMessage}</span>
                </div>
              )}

              <form id="edit-property-form" onSubmit={handleSaveEditProperty} className="space-y-6">
                
                {/* 1. Basic Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Property Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 text-xs sm:text-sm focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                    />
                    {editErrors.name && (
                      <p className="text-xs text-red-600 mt-1">{editErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Property Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={editType}
                      onChange={(e) => setEditType(e.target.value as Property['category'])}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 text-xs sm:text-sm focus:ring-2 focus:ring-zinc-950 focus:outline-hidden bg-white cursor-pointer"
                    >
                      <option value="Apartment">Apartment</option>
                      <option value="Single Room">Single Room</option>
                      <option value="Studio">Studio</option>
                      <option value="Modern House">Modern House</option>
                      <option value="Duplex">Duplex</option>
                      <option value="Villa">Villa</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Commercial">Commercial / Office Space</option>
                      <option value="Eco Retreat">Eco Retreat</option>
                    </select>
                  </div>
                </div>

                {/* 2. Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={editCountry}
                      onChange={(e) => setEditCountry(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 text-xs sm:text-sm focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      City / Destination <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={editCity}
                      onChange={(e) => setEditCity(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 text-xs sm:text-sm focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* 3. Financials & Size Dimensions (NO CONSTRAINT) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="lg:col-span-2">
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Monthly Rent (FCFA / XAF) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="5000"
                        min="1000"
                        value={editPriceFCFA}
                        onChange={(e) => setEditPriceFCFA(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full pl-3.5 pr-14 py-2 rounded-xl border border-zinc-300 text-xs sm:text-sm font-mono font-bold text-zinc-950 focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">
                        FCFA
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Size in m² (Any Amount) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="any"
                      min="0"
                      value={editSizeM2}
                      onChange={(e) => setEditSizeM2(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 text-xs sm:text-sm focus:ring-2 focus:ring-zinc-950 focus:outline-hidden font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editBeds}
                      onChange={(e) => setEditBeds(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 text-xs sm:text-sm focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editBaths}
                      onChange={(e) => setEditBaths(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 text-xs sm:text-sm focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* 4. Primary Image Update */}
                <div className="border border-zinc-200 rounded-2xl p-4 bg-zinc-50 space-y-3">
                  <span className="block text-xs font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" /> Primary Cover Photo
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                    <div className="sm:col-span-1 aspect-4/3 rounded-xl overflow-hidden bg-zinc-200 border border-zinc-300">
                      <img
                        src={editPrimaryImageUrl || editPrimaryImagePreview}
                        alt="Primary Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="sm:col-span-3 space-y-2">
                      <label className="border border-dashed border-zinc-300 hover:border-zinc-500 rounded-xl p-2.5 flex items-center justify-center gap-2 cursor-pointer bg-white hover:bg-zinc-50 text-xs font-semibold text-zinc-700">
                        <Upload className="w-4 h-4 text-zinc-500" />
                        <span>Upload New Main Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handlePrimaryFileUpload(e, true)}
                          className="hidden"
                        />
                      </label>

                      <input
                        type="url"
                        value={editPrimaryImageUrl}
                        onChange={(e) => {
                          setEditPrimaryImageUrl(e.target.value);
                          setEditPrimaryImagePreview(e.target.value);
                        }}
                        placeholder="Or direct image URL..."
                        className="w-full px-3 py-1.5 bg-white rounded-xl border border-zinc-300 text-xs focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Secondary Gallery Photos */}
                <div className="border border-zinc-200 rounded-2xl p-4 bg-zinc-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Images className="w-3.5 h-3.5" /> Secondary Detail Photos ({editSecondaryImages.length})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="border border-dashed border-zinc-300 hover:border-zinc-500 rounded-xl p-2.5 flex items-center justify-center gap-2 cursor-pointer bg-white hover:bg-zinc-50 text-xs font-semibold text-zinc-700">
                      <Upload className="w-4 h-4 text-zinc-500" />
                      <span>Add More Gallery Photos</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleSecondaryFilesUpload(e, true)}
                        className="hidden"
                      />
                    </label>

                    <div className="flex gap-1.5">
                      <input
                        type="url"
                        value={editSecondaryUrlInput}
                        onChange={(e) => setEditSecondaryUrlInput(e.target.value)}
                        placeholder="Add via image URL..."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSecondaryUrl(true);
                          }
                        }}
                        className="flex-1 px-3 py-1.5 bg-white rounded-xl border border-zinc-300 text-xs focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddSecondaryUrl(true)}
                        className="px-3 py-1.5 bg-zinc-950 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-colors cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Secondary Thumbnails */}
                  {editSecondaryImages.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 pt-1">
                      {editSecondaryImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative group rounded-lg overflow-hidden border border-zinc-300 bg-white aspect-4/3"
                        >
                          <img src={img} alt="Secondary" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 p-1">
                            <button
                              type="button"
                              onClick={() => handlePromoteToPrimary(idx, true)}
                              className="p-1 rounded bg-white text-zinc-950 text-[9px] font-bold cursor-pointer"
                              title="Set as main cover"
                            >
                              Main
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveSecondaryImage(idx, true)}
                              className="p-1 rounded bg-red-600 text-white text-[9px] cursor-pointer"
                              title="Remove"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 6. Description & Amenities */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 text-xs sm:text-sm focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Amenities (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={editFeatures}
                      onChange={(e) => setEditFeatures(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 text-xs sm:text-sm focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                    />
                  </div>
                </div>

              </form>
            </div>

            {/* Modal Footer */}
            <div className="px-6 sm:px-8 py-4 border-t border-zinc-200 flex items-center justify-end gap-3 bg-zinc-50">
              <button
                type="button"
                onClick={() => setEditingProperty(null)}
                className="px-4 py-2 rounded-xl border border-zinc-300 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="edit-property-form"
                className="px-6 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold transition-all shadow-md active:scale-98 cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* CHANGE PASSWORD & SECURITY SETTINGS MODAL */}
      {/* ==================================================== */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md border border-zinc-200 shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => {
                setShowChangePasswordModal(false);
                setChangePasswordError('');
                setChangePasswordSuccess('');
              }}
              className="absolute right-5 top-5 p-1.5 rounded-xl hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-zinc-950 text-white flex items-center justify-center shadow-xs">
                <KeyRound className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-950 text-base sm:text-lg">
                  Update Master Password
                </h3>
                <p className="text-xs text-zinc-500">
                  Updates server-side bcrypt hash securely
                </p>
              </div>
            </div>

            {changePasswordSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{changePasswordSuccess}</span>
              </div>
            )}

            {changePasswordError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{changePasswordError}</span>
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={currentPasswordInput}
                  onChange={(e) => setCurrentPasswordInput(e.target.value)}
                  placeholder="Enter current password..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs sm:text-sm font-mono focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  New Master Password (min. 6 chars)
                </label>
                <input
                  type="password"
                  required
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  placeholder="Enter new password..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs sm:text-sm font-mono focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPasswordInput}
                  onChange={(e) => setConfirmPasswordInput(e.target.value)}
                  placeholder="Confirm new password..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs sm:text-sm font-mono focus:ring-2 focus:ring-zinc-950 focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowChangePasswordModal(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-300 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="px-5 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isChangingPassword ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Save New Password'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md border border-zinc-200 shadow-2xl p-6 sm:p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-950 text-lg">Reset Seed Portfolio?</h3>
              <p className="text-xs text-zinc-500 mt-1">
                This will restore all default properties (Bastos, Bonapriso, Kribi, Buea, Limbe) and remove temporary listings.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl border border-zinc-300 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onResetProperties();
                  setShowResetConfirm(false);
                }}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
