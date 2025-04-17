import React from 'react';
import postsData from '../data/posts.json';
import { PostsData } from '../types';

const Blog: React.FC = () => {
  const { posts } = postsData as PostsData;

  return (
    <div className="min-h-screen bg-light p-4">
      <div className="container py-5">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        
        <div className="row g-4">
          {posts.map((post, index: number) => (
            <div className="col-md-4" key={index}>
              <div className="card h-100 border-0 shadow-sm">
                <img 
                  src={post.image} 
                  className="card-img-top" 
                  alt={post.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <small className="text-muted">{post.date}</small>
                  <h5 className="card-title mt-2">{post.title}</h5>
                  <p className="card-text text-muted">{post.excerpt}</p>
                  <button className="btn btn-outline-primary mt-2">Leer más</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog; 