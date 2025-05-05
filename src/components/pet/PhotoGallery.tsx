import React, { useState } from 'react';

interface PhotoGalleryProps {
  photos: string[];
  name: string;
  breed: string;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, name, breed }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [photoTransition, setPhotoTransition] = useState<'next' | 'prev' | null>(null);

  const handlePreviousPhoto = () => {
    setPhotoTransition('prev');
    setTimeout(() => {
      setCurrentPhotoIndex(prev => 
        prev === 0 ? photos.length - 1 : prev - 1
      );
      setPhotoTransition(null);
    }, 300);
  };

  const handleNextPhoto = () => {
    setPhotoTransition('next');
    setTimeout(() => {
      setCurrentPhotoIndex(prev => 
        prev === photos.length - 1 ? 0 : prev + 1
      );
      setPhotoTransition(null);
    }, 300);
  };

  return (
    <div className="card shadow-sm">
      <div className="position-relative overflow-hidden" style={{ height: '400px' }}>
        <div 
          className={`position-absolute w-100 h-100 transition-all duration-300 ${
            photoTransition === 'next' ? 'slide-out-left' : 
            photoTransition === 'prev' ? 'slide-out-right' : ''
          }`}
          style={{
            transform: photoTransition === 'next' ? 'translateX(-100%)' : 
                      photoTransition === 'prev' ? 'translateX(100%)' : 'translateX(0)',
            opacity: photoTransition ? 0 : 1
          }}
        >
          <img
            src={photos[currentPhotoIndex]}
            alt={`${name} - ${breed}`}
            className="w-100 h-100 object-fit-cover"
          />
        </div>
        {photos.length > 1 && (
          <>
            <button
              className="position-absolute top-50 start-0 translate-middle-y btn btn-light rounded-circle shadow-sm opacity-75 hover-opacity-100 transition-opacity"
              onClick={handlePreviousPhoto}
              aria-label="Foto anterior"
              style={{ zIndex: 1 }}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              className="position-absolute top-50 end-0 translate-middle-y btn btn-light rounded-circle shadow-sm opacity-75 hover-opacity-100 transition-opacity"
              onClick={handleNextPhoto}
              aria-label="Foto siguiente"
              style={{ zIndex: 1 }}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </>
        )}
      </div>
      <div className="card-body">
        <div className="d-flex gap-2 overflow-auto">
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`${name} - ${breed} - Foto ${index + 1}`}
              className={`img-thumbnail cursor-pointer transition-all duration-200 ${
                currentPhotoIndex === index ? 'border-primary scale-105' : 'opacity-75'
              }`}
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              onClick={() => {
                setPhotoTransition(index > currentPhotoIndex ? 'next' : 'prev');
                setTimeout(() => {
                  setCurrentPhotoIndex(index);
                  setPhotoTransition(null);
                }, 300);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 