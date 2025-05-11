import { Handler } from '@netlify/functions';
import connectDB from '../../src/lib/mongodb';
import Post from '../../src/models/Post';

interface PostQuery {
  type?: string;
  status?: string;
  'author.id'?: string;
  tags?: { $in: string[] };
}

interface PostUpdate {
  title?: string;
  content?: string;
  type?: string;
  status?: string;
  tags?: string[];
  author?: {
    id: string;
    name: string;
    type: string;
  };
  publishedAt?: string;
  updatedAt: string;
}

const handler: Handler = async (event) => {
  await connectDB();

  switch (event.httpMethod) {
    case 'GET': {
      if (event.queryStringParameters?.id) {
        const post = await Post.findOne({ id: event.queryStringParameters.id });
        return {
          statusCode: 200,
          body: JSON.stringify(post)
        };
      }

      // Handle filters
      const query: PostQuery = {};
      
      if (event.queryStringParameters?.type) {
        query.type = event.queryStringParameters.type;
      }
      if (event.queryStringParameters?.status) {
        query.status = event.queryStringParameters.status;
      }
      if (event.queryStringParameters?.authorId) {
        query['author.id'] = event.queryStringParameters.authorId;
      }
      if (event.queryStringParameters?.tags) {
        query.tags = { $in: event.queryStringParameters.tags.split(',') };
      }

      const posts = await Post.find(query).sort({ createdAt: -1 });
      return {
        statusCode: 200,
        body: JSON.stringify(posts)
      };
    }

    case 'POST': {
      const postData = JSON.parse(event.body!);
      const count = await Post.countDocuments();
      const id = `P${String(count + 1).padStart(3, '0')}`;
      
      const newPost = new Post({
        ...postData,
        id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        engagement: {
          likes: 0,
          shares: 0,
          comments: 0
        }
      });
      
      if (postData.status === 'published') {
        newPost.publishedAt = new Date().toISOString();
      }
      
      await newPost.save();
      return {
        statusCode: 201,
        body: JSON.stringify(newPost)
      };
    }

    case 'PUT': {
      const { id: updateId, ...updateData } = JSON.parse(event.body!);
      const update: PostUpdate = {
        ...updateData,
        updatedAt: new Date().toISOString()
      };

      // If status is changing to published, set publishedAt
      if (updateData.status === 'published' && !updateData.publishedAt) {
        update.publishedAt = new Date().toISOString();
      }

      const updatedPost = await Post.findOneAndUpdate(
        { id: updateId },
        update,
        { new: true }
      );
      return {
        statusCode: 200,
        body: JSON.stringify(updatedPost)
      };
    }

    case 'DELETE': {
      const { id: deleteId } = JSON.parse(event.body!);
      await Post.findOneAndDelete({ id: deleteId });
      return {
        statusCode: 204
      };
    }

    default:
      return {
        statusCode: 405,
        body: 'Method Not Allowed'
      };
  }
};

export { handler }; 