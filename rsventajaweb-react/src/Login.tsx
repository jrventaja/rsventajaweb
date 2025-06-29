import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login: React.FC = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [displayWrongAuth, setDisplayWrongAuth] = useState(false);
  const [displayNotFilled, setDisplayNotFilled] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthenticating(true);
    setDisplayNotFilled(false);
    setDisplayWrongAuth(false);
    if (!user || !password) {
      setDisplayNotFilled(true);
      setAuthenticating(false);
      return;
    }
    // Placeholder for authentication API call
    // Replace with real API call
    if (user === 'admin' && password === 'admin') {
      sessionStorage.setItem('Token', 'mock-token');
      navigate('/controlpanel');
    } else {
      setDisplayWrongAuth(true);
    }
    setAuthenticating(false);
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="card p-4" style={{ maxWidth: 400, width: '100%' }}>
        <h3 className="mb-4 text-center">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="user" className="form-label">Usuário</label>
            <input type="text" className="form-control" id="user" value={user} onChange={e => setUser(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Senha</label>
            <input type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          {displayNotFilled && <div className="alert alert-warning" role="alert">Preencha todos os campos.</div>}
          {displayWrongAuth && <div className="alert alert-danger" role="alert">Usuário ou senha incorretos.</div>}
          <button type="submit" className="btn btn-primary w-100" disabled={authenticating}>
            {authenticating ? 'Autenticando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 