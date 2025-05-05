import React from 'react';

export const PetCardSkeleton: React.FC = () => (
  <div className="col-12 col-sm-6 col-lg-4">
    <div className="card h-100 shadow-sm">
      <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
        <div className="skeleton-image w-100 h-100"></div>
      </div>
      <div className="card-body d-flex flex-column">
        <div className="skeleton-title mb-2"></div>
        <div className="skeleton-text mb-3"></div>
        <div className="d-flex flex-wrap gap-2 mb-3">
          <div className="skeleton-badge"></div>
          <div className="skeleton-badge"></div>
          <div className="skeleton-badge"></div>
        </div>
        <div className="mt-auto">
          <div className="skeleton-button w-100"></div>
        </div>
      </div>
    </div>
  </div>
); 