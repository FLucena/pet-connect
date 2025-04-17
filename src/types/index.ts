export interface Post {
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

export interface PostsData {
  posts: Post[];
}

export interface FAQ {
  pregunta: string;
  respuesta: string;
}

export interface FAQsData {
  faqs: FAQ[];
} 