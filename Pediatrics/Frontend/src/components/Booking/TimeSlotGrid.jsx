import React from 'react';
import './Booking.css';

const TimeSlotGrid = ({ selectedTime, onTimeSelect, bookedSlots = [] }) => {
    // Generate slots
    // Morning: 09:05 AM - 01:00 PM
    // Evening: 04:00 PM - 07:45 PM

    const generateSlots = (startHour, startMin, endHour, endMin) => {
        const slots = [];
        let current = new Date();
        current.setHours(startHour, startMin, 0, 0);

        const end = new Date();
        end.setHours(endHour, endMin, 0, 0); // End time is inclusive or exclusive? Usually last slot start time.

        // Let's assume 15 min intervals
        while (current < end) {
            const timeString = current.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            slots.push(timeString);
            current.setMinutes(current.getMinutes() + 15);
        }
        return slots;
    };

    // Morning: 09:05 to 13:00 (1 PM)
    const morningSlots = generateSlots(9, 5, 13, 0);

    // Evening: 16:00 (4 PM) to 19:45 (7:45 PM)
    const eveningSlots = generateSlots(16, 0, 19, 45);

    return (
        <div className="time-selector-container">
            <h3 className="section-title">Select Time</h3>

            <div className="session-block">
                <h4>Morning Session (09:05 AM - 01:00 PM)</h4>
                <div className="slots-grid">
                    {morningSlots.map((time, i) => (
                        <button
                            key={i}
                            className={`slot-btn ${selectedTime === time ? 'selected' : ''} ${bookedSlots.includes(time) ? 'booked' : ''}`}
                            onClick={() => !bookedSlots.includes(time) && onTimeSelect(time)}
                            disabled={bookedSlots.includes(time)}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            </div>

            <div className="session-block mt-3">
                <h4>Evening Session (04:00 PM - 07:45 PM)</h4>
                <div className="slots-grid">
                    {eveningSlots.map((time, i) => (
                        <button
                            key={i}
                            className={`slot-btn ${selectedTime === time ? 'selected' : ''} ${bookedSlots.includes(time) ? 'booked' : ''}`}
                            onClick={() => !bookedSlots.includes(time) && onTimeSelect(time)}
                            disabled={bookedSlots.includes(time)}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TimeSlotGrid;
