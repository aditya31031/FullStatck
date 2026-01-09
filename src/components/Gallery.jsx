import React from 'react';
import './Gallery.css';

// Using placeholders for now, relying on CSS for visuals
const images = [
    { id: 1, title: 'Waiting Area', desc: 'Child-friendly and colorful', src: '/cr1.png' },
    { id: 2, title: 'Consultation Room', desc: 'Modern equipment', src: '/a1.png' },
    { id: 3, title: 'Play Zone', desc: 'To keep kids happy', src: '/kd2.jpeg' },
];

const Gallery = () => {
    return (
        <div className="gallery-grid">
            {images.map(img => (
                <div key={img.id} className="gallery-item">
                    <div className="gallery-img-placeholder">
                        <img src={img.src} alt="" />
                    </div>
                    <div className="gallery-overlay">
                        <h4>{img.title}</h4>
                        <p>{img.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Gallery;
