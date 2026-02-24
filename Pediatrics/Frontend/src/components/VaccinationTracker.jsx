import React, { useState } from 'react';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const VACCINE_SCHEDULE = [];

const VaccinationTracker = ({ child, onUpdate }) => {
    const [loading, setLoading] = useState(false);
    const [expandedAge, setExpandedAge] = useState(null); // Accordion state

    const isVaccineCompleted = (vaccineName) => {
        return child.vaccinations?.some(v => v.name === vaccineName && v.status === 'completed');
    };

    // Calculate Progress
    const totalVaccines = VACCINE_SCHEDULE.reduce((acc, slot) => acc + slot.vaccines.length, 0);
    const completedVaccines = child.vaccinations?.filter(v => v.status === 'completed').length || 0;
    const progressPercentage = totalVaccines === 0 ? 0 : Math.round((completedVaccines / totalVaccines) * 100);

    const toggleVaccine = async (vaccineName) => {
        if (loading) return;
        setLoading(true);

        const currentStatus = isVaccineCompleted(vaccineName);
        const newStatus = currentStatus ? 'pending' : 'completed';

        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(
                `${import.meta.env.VITE_API_URL || 'https://pediatricsbackend-4hii.onrender.com'}/api/auth/child/${child._id}/vaccine`,
                { vaccineName, status: newStatus, dateGiven: new Date() },
                { headers: { 'x-auth-token': token } }
            );

            if (onUpdate) onUpdate(res.data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to update vaccination');
        } finally {
            setLoading(false);
        }
    };

    const toggleAccordion = (index) => {
        setExpandedAge(expandedAge === index ? null : index);
    };

    return (
        <div className="vaccine-tracker-container fade-in-up">
            {/* Timeline Cards Container */}
            <div className="timeline-cards">
                {VACCINE_SCHEDULE.map((slot, index) => {
                    const allDone = slot.vaccines.every(v => isVaccineCompleted(v));
                    const isExpanded = expandedAge === index; // Only expand if clicked

                    return (
                        <div key={index} className={`timeline-card ${allDone ? 'all-done' : ''}`}>
                            <div className="card-header" onClick={() => toggleAccordion(index)}>
                                <div className="age-badge">{slot.age}</div>
                                <div className="status-indicator">
                                    {allDone ? <span className="text-green-600 flex items-center gap-1 text-xs font-bold"><CheckCircle size={14} /> Completed</span> : <span className="text-gray-400 text-xs">{slot.vaccines.length} Vaccines</span>}
                                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </div>
                            </div>

                            {isExpanded && (
                                <div className="vaccine-list">
                                    {slot.vaccines.map(v => {
                                        const completed = isVaccineCompleted(v);
                                        return (
                                            <div
                                                key={v}
                                                className={`vaccine-row ${completed ? 'completed' : ''}`}
                                                onClick={() => toggleVaccine(v)}
                                            >
                                                <div className="vaccine-info">
                                                    <span className="vaccine-name">{v}</span>
                                                </div>
                                                <div className={`checkbox-custom ${completed ? 'checked' : ''}`}>
                                                    {completed && <CheckCircle size={16} color="white" />}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            <style>{`
                .vaccine-tracker-container {
                    background: white;
                    border-radius: 1.5rem;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
                    margin-top: 2rem;
                    overflow: hidden;
                    border: 1px solid #f3f4f6;
                }
                
                .timeline-cards {
                    padding: 1.5rem;
                    display: grid;
                    gap: 1rem;
                    background: #f9fafb;
                }
                .timeline-card {
                    background: white;
                    border-radius: 1rem;
                    border: 1px solid #e5e7eb;
                    overflow: hidden;
                    transition: all 0.2s;
                }
                .timeline-card:hover {
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                }
                .timeline-card.all-done {
                    border-color: #dcfce7;
                    background: #f0fdf4;
                }
                .card-header {
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                }
                .age-badge {
                    background: #eff6ff;
                    color: #3b82f6;
                    padding: 0.25rem 0.75rem;
                    border-radius: 2rem;
                    font-weight: 600;
                    font-size: 0.85rem;
                }
                .all-done .age-badge {
                    background: #dcfce7;
                    color: #166534;
                }
                .status-indicator {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #9ca3af;
                }

                .vaccine-list {
                    background: white;
                    border-top: 1px solid #f3f4f6;
                    padding: 0.5rem 0;
                }
                .vaccine-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0.75rem 1.5rem;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .vaccine-row:hover {
                    background: #f9fafb;
                }
                .vaccine-name {
                    font-weight: 500;
                    color: #374151;
                    font-size: 0.95rem;
                }
                .vaccine-row.completed .vaccine-name {
                    color: #059669;
                    text-decoration: line-through; 
                    opacity: 0.7;
                }

                .checkbox-custom {
                    width: 20px;
                    height: 20px;
                    border: 2px solid #d1d5db;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }
                .checkbox-custom.checked {
                    background: #10b981;
                    border-color: #10b981;
                }
            `}</style>
        </div>
    );
};

export default VaccinationTracker;
