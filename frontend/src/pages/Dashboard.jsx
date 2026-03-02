import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { LogOut, User as UserIcon, MapPin, Camera, Sun } from 'lucide-react';
import api from '../api/axios';

// Import our beautiful AI generated assets
import SigiriyaImg from '../assets/sri_lanka_sigiriya_rock.png';
import EllaImg from '../assets/sri_lanka_ella_tea.png';
import MirissaImg from '../assets/sri_lanka_mirissa_beach.png';

const Dashboard = () => {
    const { user, logoutUser, loading: authLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/auth/me');
                setProfile(res.data);
            } catch (err) {
                setError('Failed to fetch profile information');
                if (err?.response?.status === 401) {
                    logoutUser();
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchProfile();
        }
    }, [user, logoutUser, navigate]);

    const onLogout = () => {
        logoutUser();
        navigate('/login');
    };

    if (authLoading || loading) {
        return (
            <div className="dashboard-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0f172a' }}>
                <div style={{ color: 'white', fontSize: '1.5rem' }}>Loading paradise...</div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            {/* Top Navigation overlapping hero */}
            <nav className="dashboard-nav">
                <div className="brand-logo">LankaTravel</div>
                <button onClick={onLogout} className="logout-btn">
                    <LogOut size={16} style={{ marginRight: '8px' }} />
                    Sign Out
                </button>
            </nav>

            {/* Hero Section with Sigiriya background */}
            <div
                className="dashboard-hero"
                style={{ backgroundImage: `url(${SigiriyaImg})` }}
            >
                <div className="hero-content">
                    <h1>Ayubowan, {profile?.name || user?.name}!</h1>
                    <p>Welcome to the pearl of the Indian Ocean. Start exploring the unmatchable beauty of Sri Lanka today.</p>
                </div>
            </div>

            {/* Profile Information - Glassmorphism Card */}
            <div className="profile-card-container">
                <div className="profile-card">
                    <div className="profile-info-main">
                        <div className="profile-avatar">
                            <UserIcon size={36} />
                        </div>
                        <div className="profile-details">
                            <h2>{profile?.name || user?.name}</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>{profile?.email || user?.email}</p>
                            <span className="profile-status">Authenticated User</span>
                        </div>
                    </div>

                    <div className="profile-stats">
                        <div className="stat-item">
                            <div className="stat-value">3</div>
                            <div className="stat-label">Destinations</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">0</div>
                            <div className="stat-label">Bookings</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error Message Space */}
            {error && (
                <div style={{ maxWidth: '1200px', margin: '0 auto 2rem', padding: '0 2rem' }}>
                    <div className="error-message">{error}</div>
                </div>
            )}

            {/* Destinations Section using Ella and Mirissa images */}
            <section className="destinations-section">
                <div className="section-title">
                    <h3>Featured Destinations</h3>
                    <p>Discover hand-picked locations that highlight the incredible diversity of our island nation.</p>
                </div>

                <div className="destinations-grid">
                    <div className="destination-card">
                        <img src={EllaImg} alt="Ella Tea Plantations" className="destination-img" />
                        <div className="destination-overlay">
                            <div className="destination-info">
                                <h4>Ella Tea Plantations</h4>
                                <p><MapPin size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} /> Central Highlands</p>
                            </div>
                        </div>
                    </div>

                    <div className="destination-card">
                        <img src={MirissaImg} alt="Mirissa Beach" className="destination-img" />
                        <div className="destination-overlay">
                            <div className="destination-info">
                                <h4>Mirissa Golden Sands</h4>
                                <p><Sun size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} /> Southern Coast</p>
                            </div>
                        </div>
                    </div>

                    {/* Placeholder for Sigiriya since it's in the hero */}
                    <div className="destination-card">
                        <img src={SigiriyaImg} alt="Sigiriya Rock Fortress" className="destination-img" />
                        <div className="destination-overlay">
                            <div className="destination-info">
                                <h4>Sigiriya Rock Fortress</h4>
                                <p><Camera size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} /> Cultural Triangle</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
