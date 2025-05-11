import Post from '../models/Post';
import { Post as PostType } from '../types/post';

interface PostFilters {
  type?: 'adoption' | 'sponsorship' | 'event' | 'news';
  status?: 'draft' | 'published' | 'archived';
  authorId?: string;
  tags?: string[];
}

interface MongooseQuery {
  type?: 'adoption' | 'sponsorship' | 'event' | 'news';
  status?: 'draft' | 'published' | 'archived';
  'author.id'?: string;
  tags?: { $in: string[] };
}

export async function getPosts(filters?: PostFilters) {
  try {
    const query: MongooseQuery = {};
    if (filters) {
      if (filters.type) query.type = filters.type;
      if (filters.status) query.status = filters.status;
      if (filters.authorId) query['author.id'] = filters.authorId;
      if (filters.tags) query.tags = { $in: filters.tags };
    }
    const posts = await Post.find(query);
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
}

export async function getPost(id: string) {
  try {
    const post = await Post.findOne({ id });
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  } catch (error) {
    if (error instanceof Error && error.message === 'Post not found') {
      throw error;
    }
    console.error('Error fetching post:', error);
    throw new Error('Failed to fetch post');
  }
}

export async function createPost(postData: Partial<PostType>) {
  try {
    const post = await Post.create(postData);
    return post;
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post');
  }
}

export async function updatePost(id: string, postData: Partial<PostType>) {
  try {
    const post = await Post.findOneAndUpdate(
      { id },
      postData,
      { new: true }
    );
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  } catch (error) {
    if (error instanceof Error && error.message === 'Post not found') {
      throw error;
    }
    console.error('Error updating post:', error);
    throw new Error('Failed to update post');
  }
}

export async function deletePost(id: string) {
  try {
    const post = await Post.findOneAndDelete({ id });
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  } catch (error) {
    if (error instanceof Error && error.message === 'Post not found') {
      throw error;
    }
    console.error('Error deleting post:', error);
    throw new Error('Failed to delete post');
  }
}

// Additional utility functions for post-specific operations
export async function getPublishedPosts() {
  return getPosts({ status: 'published' });
}

export async function getPostsByType(type: PostType['type']) {
  return getPosts({ type, status: 'published' });
}

export async function getPostsByAuthor(authorId: string) {
  return getPosts({ authorId });
}

export async function getPostsByTags(tags: string[]) {
  return getPosts({ tags, status: 'published' });
}

export async function getUpcomingEvents() {
  const posts = await getPosts({ type: 'event', status: 'published' });
  const now = new Date().toISOString();
  return posts.filter((post: PostType) => 
    post.eventDetails?.startDate && post.eventDetails.startDate > now
  );
}

export async function getPastEvents() {
  const posts = await getPosts({ type: 'event', status: 'published' });
  const now = new Date().toISOString();
  return posts.filter((post: PostType) => 
    post.eventDetails?.endDate && post.eventDetails.endDate < now
  );
} 