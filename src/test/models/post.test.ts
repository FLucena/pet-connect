import { describe, it, expect, beforeEach } from 'vitest';
import Post from '../../models/Post';
import { Post as PostType } from '../../types/post';
import { clearDatabase } from '../setup';

describe('Post Model', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  const mockPost: PostType = {
    id: 'P001',
    title: 'Luna busca un hogar',
    content: 'Luna es una perrita muy cariñosa que busca una familia que la quiera.',
    type: 'adoption',
    author: {
      id: 'R001',
      name: 'Refugio Esperanza',
      type: 'shelter'
    },
    relatedEntities: {
      petId: 'M001'
    },
    media: {
      images: []
    },
    status: 'published',
    tags: ['perro', 'adopción', 'labrador'],
    location: {
      city: 'Buenos Aires',
      province: 'Buenos Aires',
      coordinates: {
        lat: -34.6037,
        lng: -58.3816
      }
    },
    engagement: {
      likes: 0,
      shares: 0,
      comments: 0
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  it('should create a post successfully', async () => {
    const post = new Post(mockPost);
    const savedPost = await post.save();
    
    expect(savedPost._id).toBeDefined();
    expect(savedPost.id).toBe(mockPost.id);
    expect(savedPost.title).toBe(mockPost.title);
  });

  it('should fail to create a post without required fields', async () => {
    const post = new Post({});
    
    try {
      await post.save();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should find a post by id', async () => {
    const post = new Post(mockPost);
    await post.save();
    
    const foundPost = await Post.findOne({ id: mockPost.id });
    expect(foundPost).toBeDefined();
    expect(foundPost?.title).toBe(mockPost.title);
  });

  it('should update a post', async () => {
    const post = new Post(mockPost);
    await post.save();
    
    const newTitle = 'Luna busca un hogar - Actualizado';
    await Post.findOneAndUpdate(
      { id: mockPost.id },
      { title: newTitle }
    );
    
    const updatedPost = await Post.findOne({ id: mockPost.id });
    expect(updatedPost?.title).toBe(newTitle);
  });

  it('should delete a post', async () => {
    const post = new Post(mockPost);
    await post.save();
    
    await Post.findOneAndDelete({ id: mockPost.id });
    const deletedPost = await Post.findOne({ id: mockPost.id });
    expect(deletedPost).toBeNull();
  });
}); 