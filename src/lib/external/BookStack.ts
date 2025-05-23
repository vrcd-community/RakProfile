import axios from 'axios';
import Cache from '../cache';

const apiResponseCache = new Cache();
const apiResponseTTLSeconds = 60;

const getBookStackClient = async () => {
  const client = axios.create({
    baseURL: process.env.BOOKSTACK_BASEURL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${process.env.BOOKSTACK_API_ID}:${process.env.BOOKSTACK_API_SECRET}`
    }
  });

  const cachedGet = async <T>(url: string, ttlSeconds: number = apiResponseTTLSeconds): Promise<T> => {
    const cacheKey = `bookstack_api_response_${url}`;
    const fetchData = async () => (await client.get(url)).data as T;
    return apiResponseCache.get<T>(cacheKey, fetchData, ttlSeconds);
  };

  return {
    ...client,
    cachedGet,
  };
};

interface BookStackUser {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  external_auth_id: string;
  slug: string;
  last_activity_at?: string;
  profile_url: string;
  edit_url: string;
  avatar_url: string;
}

interface BookStackUserListResponse {
  data: BookStackUser[];
}

interface BookStackUserReadResponse extends BookStackUser {
  roles: {
    id: number;
    display_name: string;
  }[];
}

interface BookStackBookCover {
  id: number;
  name: string;
  url: string;
}

interface BookStackBook {
  id: number;
  slug: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  owned_by: number;
  created_by: number;
  updated_by: number;
  cover?: BookStackBookCover;
}

interface BookStackBooksListResponse {
  data: BookStackBook[];
  total: number
}

interface BookStackPage {
  name: string;
  id: number;
  slug: string;
  book_id: number;
  chapter_id: number;
  draft: boolean;
  template: boolean;
  created_at: string;
  updated_at: string;
  priority: number;
  owned_by: number;
  book_slug: string;
  created_by: number;
  updated_by: number;
  revision_count: number;
  editor: string;
}

interface BookStackPageListResponse {
  data: BookStackPage[];
  total: number;
}

interface BookStackPageReadResponse {
  id: number;
  book_id: number;
  chapter_id: number;
  name: string;
  slug: string;
  html: string;
  priority: number;
  created_at: string;
  updated_at: string;
  created_by: {
    id: number;
    name: string;
    slug: string;
  };
  updated_by: {
    id: number;
    name: string;
    slug: string;
  };
  draft: boolean;
  markdown: string;
  revision_count: number;
  template: boolean;
  owned_by: {
    id: number;
    name: string;
    slug: string;
  };
  editor: string;
  raw_html: string;
  tags: string[]
}

export class BookStack {
  static async userList(): Promise<BookStackUserListResponse> {
    const client = await getBookStackClient();
    return await client.cachedGet<BookStackUserListResponse>('/users');
  }

  static async userRead(uid: string): Promise<BookStackUserReadResponse> {
    const client = await getBookStackClient();
    return await client.cachedGet<BookStackUserReadResponse>(`/users/${uid}`);
  }

  static async booksListPage(offset: number = 0, limit: number = 100): Promise<BookStackBooksListResponse> {
    const client = await getBookStackClient();
    return await client.cachedGet<BookStackBooksListResponse>(`/books?offset=${offset}&limit=${limit}`);
  }

  static async booksList(): Promise<BookStackBooksListResponse> {
    const data = [];

    let offset = 0;
    let limit = 100;

    while (true) {
      const page = await BookStack.booksListPage(offset, limit);
      data.push(...page.data);
      if (page.total <= data.length) {
        break;
      }
      offset += limit;
    }

    return {
      data,
      total: data.length
    }
  }

  static async pageListPage(offset: number = 0, limit: number = 100): Promise<BookStackPageListResponse> {
    const client = await getBookStackClient();
    return await client.cachedGet<BookStackPageListResponse>(`/pages?offset=${offset}&limit=${limit}`);
  }

  static async pageList(): Promise<BookStackPageListResponse> {
    const data = [];

    let offset = 0;
    let limit = 100;

    while (true) {
      const page = await BookStack.pageListPage(offset, limit);
      data.push(...page.data);
      if (page.total <= data.length) {
        break;
      }
      offset += limit;
    }

    return {
      data,
      total: data.length
    }
  }

  static async pageRead(pageId: number): Promise<BookStackPageReadResponse> {
    const client = await getBookStackClient();
    return await client.cachedGet<BookStackPageReadResponse>(`/pages/${pageId}`);
  }
}