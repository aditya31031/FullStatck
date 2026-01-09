import React, { useState } from 'react';
import { Send, User, Mail, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import './ContactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('https://pediatricsbackend.onrender.com/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                toast.success('Message sent! It has been added to our Patient Stories.');
                setFormData({ name: '', email: '', message: '' });
            } else {
                toast.error('Failed to send message.');
            }
        } catch (err) {
            console.error(err);
            toast.error('Server error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-form-container">
            <div className="form-header">
                <h3>Get in Touch</h3>
                <p>Have a question? Send us a message.</p>
            </div>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <div className="input-wrapper">
                        <User size={18} className="input-icon" />
                        <input
                            type="text"
                            className="form-input"
                            required
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <div className="input-wrapper">
                        <Mail size={18} className="input-icon" />
                        <input
                            type="email"
                            className="form-input"
                            required
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Message</label>
                    <div className="input-wrapper textarea-wrapper">
                        <MessageSquare size={18} className="input-icon textarea-icon" />
                        <textarea
                            className="form-input"
                            rows="4"
                            required
                            value={formData.message}
                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                            placeholder="How can we help you?"
                        ></textarea>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary form-submit-btn" disabled={loading}>
                    {loading ? 'Sending...' : <><Send size={18} /> Send Message</>}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
