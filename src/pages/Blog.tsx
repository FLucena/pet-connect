import React from 'react';

const Blog: React.FC = () => {
  const posts = [
    {
      title: "Consejos para la Adopción Responsable",
      date: "15 de Marzo, 2024",
      excerpt: "Descubre los aspectos más importantes a considerar antes de adoptar una mascota y cómo prepararte para esta nueva etapa.",
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Historias de Éxito: Luna encontró su hogar",
      date: "10 de Marzo, 2024",
      excerpt: "Conoce la historia de Luna, una perrita que después de dos años en el refugio, finalmente encontró su familia perfecta.",
      image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Cómo Ayudar a tu Mascota a Adaptarse",
      date: "5 de Marzo, 2024",
      excerpt: "Tips y consejos para hacer que la transición de tu nueva mascota a su hogar sea lo más suave posible.",
      image: "https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-light p-4">
      <div className="container py-5">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        
        <div className="row g-4">
          {posts.map((post, index) => (
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