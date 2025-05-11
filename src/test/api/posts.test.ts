import { describe, it, expect, beforeEach } from 'vitest';
import { getPosts, getPost, createPost, updatePost, deletePost } from '../../api/posts';
import Post from '../../models/Post';
import { Post as PostType } from '../../types/post';
import { clearDatabase } from '../setup';

describe('Posts API', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  const mockPost: PostType = {
    id: 'P001',
    title: 'Nueva mascota disponible',
    content: 'Tenemos un nuevo perro disponible para adopción',
    type: 'adoption',
    author: {
      id: 'S001',
      name: 'Refugio de Animales',
      type: 'shelter'
    },
    relatedEntities: {
      petId: 'M001'
    },
    media: {
      images: []
    },
    status: 'published',
    tags: ['adopción', 'perro'],
    location: {
      city: 'Buenos Aires',
      province: 'Buenos Aires'
    },
    engagement: {
      likes: 0,
      shares: 0,
      comments: 0
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  describe('getPosts', () => {
    it('should return all posts', async () => {
      await Post.create(mockPost);
      
      const posts = await getPosts();
      
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
      expect(posts[0].title).toBe(mockPost.title);
    });

    it('should filter posts by type', async () => {
      await Post.create(mockPost);
      
      const posts = await getPosts({ type: 'adoption' });
      
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
      expect(posts[0].title).toBe(mockPost.title);
    });
  });

  describe('getPost', () => {
    it('should return a post by id', async () => {
      const post = await Post.create(mockPost);
      
      const fetchedPost = await getPost(post.id);
      
      expect(fetchedPost.title).toBe(mockPost.title);
    });

    it('should throw error for non-existent post', async () => {
      await expect(getPost('nonexistent')).rejects.toThrow('Post not found');
    });
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      const createdPost = await createPost(mockPost);
      
      expect(createdPost.title).toBe(mockPost.title);
    });
  });

  describe('updatePost', () => {
    it('should update a post', async () => {
      const post = await Post.create(mockPost);
      const updatedTitle = 'Título actualizado';
      
      const updatedPost = await updatePost(post.id, { title: updatedTitle });
      
      expect(updatedPost.title).toBe(updatedTitle);
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      const post = await Post.create(mockPost);
      
      await deletePost(post.id);
      
      const deletedPost = await Post.findOne({ id: post.id });
      expect(deletedPost).toBeNull();
    });
  });
}); 