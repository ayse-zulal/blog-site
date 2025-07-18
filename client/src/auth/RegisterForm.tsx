import { useState } from 'react';
import { registerUser } from './api';
import { useAuth } from './AuthContext.tsx';
import './RegisterForm.css'; // stil dosyasını import ediyoruz

export default function RegisterForm() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const data = await registerUser({ username, email, password });
    if (data.error || data.errors) {
      setError(data.error || data.errors?.[0]?.msg || 'Kayıt başarısız');
      return;
    }
    login(data.user, data.token);
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Kayıt Ol</h2>
        <label>
          Kullanıcı Adı
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="mensis"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="mensis@example.com"
          />
        </label>
        <label>
          Şifre
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </label>
        {error && <p className="error-msg">{error}</p>}
        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  );
}
