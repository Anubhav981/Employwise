import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.data.token);
      toast.success('Login successful');
      navigate('/users');
    } catch (error) {
      toast.error('Login failed: ' + (error.response?.data?.error || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="text-center mb-5">
        <h2 className="fw-bold mb-3">Welcome to EmployWise</h2>
        <p className="text-muted">Manage your team members efficiently</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="form-label fs-6 text-secondary">Email Address</label>
          <input
            type="email"
            className="form-control form-control-lg border-2 py-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="form-label fs-6 text-secondary">Password</label>
          <input
            type="password"
            className="form-control form-control-lg border-2 py-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary w-100 py-3 fw-bold"
          disabled={loading}
        >
          {loading ? (
            <div className="d-flex align-items-center justify-content-center gap-2">
              <div className="loading-spinner"></div>
              Authenticating...
            </div>
          ) : 'Sign In'}
        </button>
      </form>
    </div>
  );
}

export default Login;