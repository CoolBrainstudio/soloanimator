export interface Animator {
  id: string;
  name: string;
  email: string;
  instagram: string;
  portfolio: string;
  skills: string[];
  experience: string;
  price_range: string;
  bio: string;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  created_at: string;
  portfolio_image?: string;
}

export interface Episode {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  video_url: string;
  video_type: 'youtube' | 'drive';
  duration: string;
  release_date: string;
  published: boolean;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  published: boolean;
  created_at: string;
}
