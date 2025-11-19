// src/pages/HomePage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../api/types';

export function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('current_user');
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as User;
      setUser(parsed);
    } catch (err) {
      console.error('Cannot parse current_user from localStorage', err);
    }
  }, []);

  const handleGoProfile = () => {
    navigate('/me');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Góc trái: tên tài khoản (click → /me) */}
        <div>
          {user ? (
            <button
              type="button"
              onClick={handleGoProfile}
              style={{
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: 16,
              }}
            >
              {user.name || user.email}
            </button>
          ) : (
            <span style={{ fontWeight: 'bold' }}>Mini E</span>
          )}
        </div>

        {/* Chỗ bên phải bạn có thể thêm giỏ hàng, logout,... sau này */}
      </header>

      {/* Body */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 32,
          fontWeight: 'bold',
        }}
      >
        Home
      </main>
    </div>
  );
}
