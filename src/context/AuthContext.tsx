import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  hasPermission: (module: string) => boolean;
}

const PRESET_USERS: Record<UserRole, UserProfile> = {
  super_admin: {
    id: 'user-super-admin',
    fullName: 'Kwame Boateng',
    email: 'admin@avianceghana.com',
    role: 'super_admin',
    department: 'Executive Management',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    isActive: true,
  },
  content_manager: {
    id: 'user-content-mgr',
    fullName: 'Ama Serwaa',
    email: 'content@avianceghana.com',
    role: 'content_manager',
    department: 'Communications & Media',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    isActive: true,
  },
  hr_recruitment: {
    id: 'user-hr-lead',
    fullName: 'Kofi Asare',
    email: 'hr@avianceghana.com',
    role: 'hr_recruitment',
    department: 'Human Resources',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    isActive: true,
  },
  operations_manager: {
    id: 'user-ops-mgr',
    fullName: 'Captain Jude Armah',
    email: 'operations@avianceghana.com',
    role: 'operations_manager',
    department: 'Ground Operations & Ramp',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    isActive: true,
  },
  it_admin: {
    id: 'user-it-lead',
    fullName: 'Ebenezer Quaye',
    email: 'it@avianceghana.com',
    role: 'it_admin',
    department: 'Information Technology',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
    isActive: true,
  },
  marketing_comm: {
    id: 'user-marketing-lead',
    fullName: 'Nana Yaa Danquah',
    email: 'marketing@avianceghana.com',
    role: 'marketing_comm',
    department: 'Marketing & Brand',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    isActive: true,
  },
  viewer_analyst: {
    id: 'user-analyst',
    fullName: 'Dr. Samuel K. Tetteh',
    email: 'analyst@avianceghana.com',
    role: 'viewer_analyst',
    department: 'Aviation Business Intelligence',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    isActive: true,
  },
  baggage_manager: {
    id: 'user-baggage-mgr',
    fullName: 'Belinda Adade',
    email: 'baggage@avianceghana.com',
    role: 'baggage_manager',
    department: 'Passenger & Baggage Services',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    isActive: true,
  },
  cargo_manager: {
    id: 'user-cargo-mgr',
    fullName: 'Robert Amenyah',
    email: 'cargomgr@avianceghana.com',
    role: 'cargo_manager',
    department: 'Cargo Handling & Freight',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    isActive: true,
  },
  reviewer: {
    id: 'user-reviewer',
    fullName: 'Michaela Walker',
    email: 'compliance@avianceghana.com',
    role: 'reviewer',
    department: 'Quality & Regulatory Review',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    isActive: true,
  },
};

// Access Control Matrix as required by specs
const PERMISSIONS_MATRIX: Record<UserRole, string[]> = {
  super_admin: [
    'dashboard', 'pages', 'services', 'news', 'careers', 'applications',
    'enquiries', 'baggage', 'certifications', 'team', 'customers',
    'analytics', 'settings', 'users', 'audit_logs', 'media', 'database'
  ],
  content_manager: [
    'dashboard', 'pages', 'services', 'news', 'certifications',
    'team', 'customers', 'media', 'analytics'
  ],
  hr_recruitment: [
    'dashboard', 'careers', 'applications'
  ],
  operations_manager: [
    'dashboard', 'services', 'enquiries', 'baggage', 'certifications'
  ],
  cargo_manager: [
    'dashboard', 'services', 'enquiries'
  ],
  baggage_manager: [
    'dashboard', 'baggage', 'enquiries'
  ],
  reviewer: [
    'dashboard', 'services', 'news', 'certifications'
  ],
  it_admin: [
    'dashboard', 'services', 'enquiries', 'analytics', 'settings',
    'audit_logs', 'database'
  ],
  marketing_comm: [
    'dashboard', 'pages', 'services', 'news', 'enquiries', 'analytics', 'media'
  ],
  viewer_analyst: [
    'dashboard', 'analytics'
  ]
};

const AUTH_STORAGE_KEY = 'aviance_auth_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    // Default logged in as Super Admin for instantaneous prototype preview
    return PRESET_USERS.super_admin;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, role?: UserRole): Promise<boolean> => {
    const selectedRole: UserRole = role || 'super_admin';
    const profile = PRESET_USERS[selectedRole];
    setUser({ ...profile, email: email || profile.email });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    setUser(PRESET_USERS[role]);
  };

  const hasPermission = (module: string): boolean => {
    if (!user) return false;
    const allowed = PERMISSIONS_MATRIX[user.role] || [];
    return allowed.includes(module) || user.role === 'super_admin';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
        switchRole,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
