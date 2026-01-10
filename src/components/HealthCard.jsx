import React from 'react';
import './HealthCard.css';
import { Activity, Droplet, Phone, User, Shield } from 'lucide-react';

const HealthCard = ({ child, parentName, parentPhone }) => {
    if (!child) return null;

    const getInitials = (name) => name?.substring(0, 2).toUpperCase() || 'CH';

    return (
        <div className="health-card-container">
            <div className="health-card">
                {/* Background Pattern */}
                <div className="card-bg-pattern"></div>

                <div className="card-header-row">
                    <div className="clinic-brand">
                        <Shield size={16} fill="white" />
                        <span>Sai Manohar Clinic</span>
                    </div>
                    <div className="card-chip">
                        <img src="https://raw.githubusercontent.com/dasShounak/freeUseImages/main/chip.png" alt="chip" className="chip-img" />
                    </div>
                </div>

                <div className="card-body-content">
                    <div className="child-identity">
                        <div className="card-avatar">
                            {getInitials(child.name)}
                        </div>
                        <div className="child-name-block">
                            <h3>{child.name}</h3>
                            <span className="info-label">PID: {child._id ? child._id.substring(child._id.length - 6).toUpperCase() : 'PENDING'}</span>
                        </div>
                    </div>

                    <div className="card-stats-row">
                        <div className="card-stat">
                            <span className="stat-label">Blood Group</span>
                            <span className="stat-value">
                                <Droplet size={12} className="inline-icon" /> {child.bloodGroup || 'N/A'}
                            </span>
                        </div>
                        <div className="card-stat">
                            <span className="stat-label">Age / Gender</span>
                            <span className="stat-value">{child.age} yrs / {child.gender === 'Male' ? 'M' : 'F'}</span>
                        </div>
                        <div className="card-stat">
                            <span className="stat-label">Emergency</span>
                            <span className="stat-value">
                                <Phone size={12} className="inline-icon" /> {parentPhone || '--'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="card-footer-row">
                    <div className="parent-info">
                        <span className="label-tiny">Guardian</span>
                        <span className="val-small">{parentName}</span>
                    </div>
                    <div className="card-logo">
                        <span>HEALTH ID</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthCard;
