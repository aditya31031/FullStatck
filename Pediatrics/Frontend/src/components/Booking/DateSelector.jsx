import React from 'react';
import './Booking.css';

const DateSelector = ({ selectedDate, onDateSelect }) => {
    // Generate next 14 days
    const getDays = () => {
        const dates = [];
        const today = new Date();

        for (let i = 0; i < 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);

            // 0 = Sunday. Skip if Sunday.
            if (date.getDay() === 0) continue;

            dates.push(date);
        }
        return dates;
    };

    const dates = getDays();

    const formatDate = (date) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return {
            dayName: days[date.getDay()],
            dayNum: date.getDate(),
            month: months[date.getMonth()],
            full: date.toISOString().split('T')[0] // YYYY-MM-DD
        };
    };

    return (
        <div className="date-selector-container">
            <h3 className="section-title">Select Date</h3>
            <div className="dates-grid">
                {dates.map((date, index) => {
                    const { dayName, dayNum, full } = formatDate(date);
                    const isSelected = selectedDate === full;
                    return (
                        <button
                            key={index}
                            className={`date-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => onDateSelect(full)}
                        >
                            <span className="day-name">{dayName}</span>
                            <span className="day-num">{dayNum}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default DateSelector;
