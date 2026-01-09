import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, Stethoscope, Activity, Heart, Phone } from 'lucide-react';
import './Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        const result = await register(formData.name, formData.email, formData.password, formData.phone);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.error || 'Registration failed');
        }
    };

    return (
        <div className="login-split-wrapper">
            {/* Left Side: Animated Image & Content (Reused from Login) */}
            <div className="login-image-side">
                <div className="login-bg-animate"></div>
                <div className="login-image-overlay">
                    <div className="overlay-content-top">
                        <div className="brand-logo-glass">
                            <Stethoscope size={28} color="white" />
                        </div>
                        <span className="brand-name-glass">Dr. Sai Manohar</span>
                    </div>

                    <div className="overlay-content-bottom">
                        <div className="feature-pill">
                            <Heart size={16} />
                            <span>Join Our Family</span>
                        </div>
                        <h1>Start your journey<br />to better health.</h1>
                        <p className="hero-desc">Create your account today to access personalized care, appointment scheduling, and more.</p>
                    </div>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="login-form-side">
                <div className="login-form-container fade-in-up">
                    <div className="mobile-header">
                        <div className="brand-logo-mobile">
                            <Stethoscope size={24} color="white" />
                        </div>
                    </div>

                    <div className="form-header-attractive">
                        <h2>Create Account</h2>
                        <p>Fill in your details to get started.</p>
                    </div>

                    {error && <div className="attractive-alert-error">{error}</div>}

                    <form onSubmit={handleSubmit} className="attractive-form">
                        <div className="form-grid-2">
                            <div className="attractive-group">
                                <label>Full Name</label>
                                <div className="attractive-input-wrapper">
                                    <User size={20} className="attractive-icon" />
                                    <input
                                        type="text"
                                        className="attractive-input"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            <div className="attractive-group">
                                <label>Email Address</label>
                                <div className="attractive-input-wrapper">
                                    <Mail size={20} className="attractive-icon" />
                                    <input
                                        type="email"
                                        className="attractive-input"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        placeholder="name@example.com"
                                    />
                                </div>
                            </div>

                            <div className="attractive-group span-2">
                                <label>Phone Number</label>
                                <div className="attractive-input-wrapper">
                                    <Phone size={20} className="attractive-icon" />
                                    <input
                                        type="tel"
                                        className="attractive-input"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                        placeholder="98765 43210"
                                    />
                                </div>
                            </div>

                            <div className="attractive-group">
                                <label>Password</label>
                                <div className="attractive-input-wrapper">
                                    <Lock size={20} className="attractive-icon" />
                                    <input
                                        type="password"
                                        className="attractive-input"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                        placeholder="Create password"
                                        minLength="6"
                                    />
                                </div>
                            </div>

                            <div className="attractive-group">
                                <label>Confirm Password</label>
                                <div className="attractive-input-wrapper">
                                    <Lock size={20} className="attractive-icon" />
                                    <input
                                        type="password"
                                        className="attractive-input"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        required
                                        placeholder="Confirm password"
                                    />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn-attractive mt-6">
                            Register Now <ArrowRight size={20} />
                        </button>
                    </form>

                    <div className="attractive-footer">
                        <p>Already have an account? <Link to="/login">Sign In</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
