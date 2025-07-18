import { useState } from 'react';
import { loginUser } from './api';
import { useAuth } from './AuthContext.tsx';
import './LoginForm.css'; 

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const data = await loginUser({ email, password });
    if (data.error) {
      setError(data.error);
      return;
    }
    login(data.user, data.token);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Giriş Yap</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="E-posta adresinizi girin"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Şifre</label>
          <input
            type="password"
            value={password}
            placeholder="Şifrenizi girin"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">Giriş Yap</button>
      </form>
    </div>
  );
}
