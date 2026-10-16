import React, { useState } from 'react';
import { Sparkles, RotateCcw, UserPlus, LogOut, Info, ShieldCheck, ChevronDown } from 'lucide-react';
import { User } from '../types';

interface DemoBannerProps {
  currentUser: User;
  onResetDemoData: () => void;
  onSwitchToRealRegister: () => void;
  onExitDemo: () => void;
  onSwitchDemoRole: (role: 'owner' | 'karyawan') => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({
  currentUser,
  onResetDemoData,
  onSwitchToRealRegister,
  onExitDemo,
  onSwitchDemoRole,
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const isOwner = currentUser.role === 'owner';

  const handleReset = () => {
    if (confirm('Kembalikan data demo ke contoh awal? Semua transaksi uji coba yang baru Anda tambahkan akan di-reset.')) {
      setIsResetting(true);
      onResetDemoData();
      setTimeout(() => setIsResetting(false), 500);
    }
  };

  return (
    <div className="bg-linear-to-r from-amber-600 via-amber-700 to-rose-800 text-white px-3 py-2 text-xs shadow-md z-40 sticky top-0 border-b border-amber-400/30">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        {/* Sisi Kiri: Badge & Info Peran */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="inline-flex items-center gap-1.5 bg-black/25 px-2.5 py-1 rounded-full font-black text-[11px] uppercase tracking-wider text-amber-200 border border-amber-300/30 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Mode Demo Trial</span>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-lg font-bold text-[11px] text-white transition active:scale-95 cursor-pointer"
              title="Ganti peran simulasi"
            >
              <span>Sebagai: {isOwner ? '👑 Pemilik (Owner)' : '🧾 Kasir Cabang'}</span>
              <ChevronDown className="w-3 h-3 text-white/80" />
            </button>

            {showRoleMenu && (
              <div className="absolute left-0 top-full mt-1.5 w-52 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 p-1.5 z-50 text-xs animate-in fade-in zoom-in-95">
                <div className="text-[10px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">
                  Ganti Peran Simulasi
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onSwitchDemoRole('owner');
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-lg font-bold flex items-center justify-between ${
                    isOwner ? 'bg-amber-100 text-amber-900' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span>👑 Pemilik (Owner)</span>
                  {isOwner && <ShieldCheck className="w-4 h-4 text-amber-600" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSwitchDemoRole('karyawan');
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-lg font-bold flex items-center justify-between ${
                    !isOwner ? 'bg-amber-100 text-amber-900' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span>🧾 Kasir Cabang</span>
                  {!isOwner && <ShieldCheck className="w-4 h-4 text-amber-600" />}
                </button>
              </div>
            )}
          </div>

          <span className="hidden md:inline text-white/80 text-[11px] truncate">
            • Data tersimpan di perangkat lokal & aman dari database cloud.
          </span>
        </div>

        {/* Sisi Kanan: Tombol Aksi */}
        <div className="flex items-center gap-1.5 ml-auto">
          {/* Tombol Reset Data */}
          <button
            type="button"
            onClick={handleReset}
            disabled={isResetting}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/20 hover:bg-black/35 text-white text-[11px] font-bold transition active:scale-95 cursor-pointer disabled:opacity-50"
            title="Reset data transaksi contoh ke kondisi awal"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Reset Data</span>
          </button>

          {/* Tombol Daftar Akun Resmi */}
          <button
            type="button"
            onClick={onSwitchToRealRegister}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-[11px] font-black shadow-xs transition active:scale-95 cursor-pointer"
            title="Daftarkan akun laundry asli Anda"
          >
            <UserPlus className="w-3.5 h-3.5 text-white" />
            <span>Daftar Akun Anda</span>
          </button>

          {/* Tombol Keluar Demo */}
          <button
            type="button"
            onClick={onExitDemo}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/15 hover:bg-rose-900/60 text-white/90 hover:text-white text-[11px] font-bold transition active:scale-95 cursor-pointer"
            title="Keluar dari mode demo dan kembali ke layar login"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
