import React, { useState, useRef } from 'react';
import './HealthCard.css';
import { Shield, Download, Check, X, Plus } from 'lucide-react';
import html2canvas from 'html2canvas';
import { QRCodeSVG } from 'qrcode.react';

const HealthCard = ({ child, parentName, parentPhone, onUpdateChild, onDownload }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [bgValue, setBgValue] = useState('');
    const cardRef = useRef(null);

    if (!child) return null;

    const formattedId = child._id ? child._id.substring(child._id.length - 8).toUpperCase() : 'PENDING';
    const issueDate = new Date(child.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const validThru = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    const handleStartEdit = () => {
        setBgValue(child.bloodGroup || '');
        setIsEditing(true);
    };

    const handleSave = () => {
        if (bgValue && onUpdateChild) {
            onUpdateChild(child._id, { bloodGroup: bgValue });
        }
        setIsEditing(false);
    };

    const handleDownload = async () => {
        if (cardRef.current) {
            try {
                const canvas = await html2canvas(cardRef.current, {
                    scale: 3, // Higher resolution
                    useCORS: true,
                    backgroundColor: null, // Transparent background if possible, or matches css
                    logging: false
                });
                const link = document.createElement('a');
                link.download = `HealthCard-${child.name.replace(' ', '_')}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
                if (onDownload) onDownload();
            } catch (err) {
                console.error("Failed to generate card", err);
            }
        }
    };

    return (
        <div className="health-card-wrapper-dl">
            <div className="health-card-actions">
                <button onClick={handleDownload} className="btn-download-card">
                    <Download size={16} /> Download Official ID
                </button>
            </div>

            <div className="health-card-container" ref={cardRef}>
                <div className="health-card-professional">
                    {/* Header */}
                    <div className="card-pro-header">
                        <div className="clinic-logo-block">
                            <Shield className="logo-icon" size={32} />
                            <div className="clinic-text">
                                <span className="clinic-name">Dr. Sai Manohar</span>
                                <span className="clinic-subtitle">Pediatric Clinic • Official Identity</span>
                            </div>
                        </div>
                        <div className="card-chip-visual">
                            <img src="https://raw.githubusercontent.com/dasShounak/freeUseImages/main/chip.png" alt="chip" />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="card-pro-body">
                        <div className="patient-grid">
                            <div className="patient-photo-placeholder">
                                {child.photo ? (
                                    <img
                                        src={child.photo}
                                        alt={child.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    child.name.charAt(0).toUpperCase()
                                )}
                            </div>
                            <div className="patient-details">
                                <div className="detail-group primary">
                                    <label>Patient Name</label>
                                    <h3>{child.name} {child.lastName || ''}</h3>
                                </div>
                                <div className="detail-row-grid">
                                    <div className="detail-group">
                                        <label>UHID / Reg No.</label>
                                        <span className="id-text">{formattedId}</span>
                                    </div>
                                    <div className="detail-group">
                                        <label>DOB / Age</label>
                                        <span>{child.age} Yrs / {child.gender === 'Male' ? 'M' : 'F'}</span>
                                    </div>
                                    <div className="detail-group">
                                        <label>Blood Type</label>
                                        {isEditing ? (
                                            <div className="blood-edit-controls">
                                                <select
                                                    value={bgValue}
                                                    onChange={e => setBgValue(e.target.value)}
                                                    className="blood-select-mini"
                                                >
                                                    <option value="">--</option>
                                                    <option value="A+">A+</option>
                                                    <option value="A-">A-</option>
                                                    <option value="B+">B+</option>
                                                    <option value="B-">B-</option>
                                                    <option value="AB+">AB+</option>
                                                    <option value="AB-">AB-</option>
                                                    <option value="O+">O+</option>
                                                    <option value="O-">O-</option>
                                                </select>
                                                <button onClick={handleSave} className="action-btn-mini save"><Check size={12} /></button>
                                                <button onClick={() => setIsEditing(false)} className="action-btn-mini cancel"><X size={12} /></button>
                                            </div>
                                        ) : (
                                            <span
                                                className="blood-tag"
                                                onClick={handleStartEdit}
                                                title="Click to update"
                                            >
                                                {child.bloodGroup || <><Plus size={10} /> Add</>}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer - Official Elements */}
                    <div className="card-pro-footer">
                        <div className="footer-col">
                            <div className="emergency-contact">
                                <label>Emergency Guardian</label>
                                <span className="ec-value">{parentName}</span>
                                <span className="ec-phone">{parentPhone || 'N/A'}</span>
                            </div>
                            <div className="validity-row">
                                <div>
                                    <label>Issued</label> <span>{issueDate}</span>
                                </div>
                                <div>
                                    <label>Valid Thru</label> <span>{validThru}</span>
                                </div>
                            </div>
                        </div>

                        <div className="footer-col right">
                            <div className="qr-section">
                                <QRCodeSVG
                                    value={`PATIENT_ID:${child._id || 'NA'}|NAME:${child.name}|DOB:${child.age}`}
                                    size={48}
                                    level="M"
                                    bgColor="#FFFFFF"
                                    fgColor="#000000"
                                />
                            </div>
                            <div className="signature-block">
                                <span className="sign-label">Authorized Signature</span>
                                <span className="sign-visual">Dr. Sai Manohar</span>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Background */}
                    <div className="world-map-bg"></div>
                    <div className="holo-overlay"></div>
                </div>
            </div>
        </div>
    );
};

export default HealthCard;
