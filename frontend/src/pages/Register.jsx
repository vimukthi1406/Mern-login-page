import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [localError, setLocalError] = useState('');

    const { name, email, password, confirmPassword } = formData;
    const navigate = useNavigate();
    const { registerUser, user, error, loading, setError } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
        return () => setError(null);
    }, [user, navigate, setError]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');

        if (password !== confirmPassword) {
            setLocalError('Passwords do not match');
            return;
        }

        const result = await registerUser({ name, email, password });
        if (result.success) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Create an Account</h2>
                <p className="auth-subtitle">Sign up to get started</p>

                {(error || localError) && (
                    <div className="error-message">{localError || error}</div>
                )}

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            onChange={onChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Create a password"
                            required
                            minLength="6"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={onChange}
                            placeholder="Confirm your password"
                            required
                            minLength="6"
                        />
                    </div>

                    <button type="submit" className="btn" disabled={loading}>
                        {loading ? 'Creating account...' : (
                            <>
                                <UserPlus size={18} style={{ marginRight: '8px' }} />
                                Sign Up
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-links">
                    Already have an account? <Link to="/login">Log in</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
