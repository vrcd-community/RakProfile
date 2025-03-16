import axios from 'axios'
import Cache from '../cache'

const accessTokenCache = new Cache();
const apiResponseCache = new Cache(); // 新增 API 响应缓存
const accessTokenKey = 'logto_access_token';
const accessTokenTTLSeconds = 3600;
const apiResponseTTLSeconds = 60; // API 响应缓存时间，例如 60 秒，可以根据需要调整

const fetchAccessToken = async () => {
  const resp = await axios.post(`${process.env.LOGTO_BASEURL}/oidc/token`, new URLSearchParams({
    grant_type: 'client_credentials',
    resource: "https://default.logto.app/api",
    scope: "all"
  }).toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${process.env.LOGTO_APP_ID}:${process.env.LOGTO_APP_SECRET}`).toString('base64')}`
    }
  });
  return resp.data.access_token;
}

const getLogtoClient = async () => {
  const token = await accessTokenCache.get<string>(accessTokenKey, fetchAccessToken, accessTokenTTLSeconds / 2);

  const logtoClient = axios.create({
    baseURL: process.env.LOGTO_BASEURL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  // 封装一个带缓存的 get 方法
  const cachedGet = async <T>(url: string, ttlSeconds: number = apiResponseTTLSeconds): Promise<T> => {
    const cacheKey = `api_response_${url}`; // 使用 URL 作为缓存键
    const fetchData = async () => (await logtoClient.get(url)).data as T;
    return apiResponseCache.get<T>(cacheKey, fetchData, ttlSeconds);
  };

  return { // 返回包含 cachedGet 方法的客户端
    ...logtoClient,
    cachedGet,
  };
}

interface GetUserResponse {
  id: string
  username: string
  primaryEmail: string
  primaryPhone: string
  name: string
  avatar: string
  customData: Record<string, unknown>
  identities: Record<string, {
    userId: string
    details: Record<string, unknown>
  }>
  lastSignInAt: number
  createdAt: number
  updatedAt: number
  profile: {
    familyName: string
    givenName: string
    middleName: string
    nickname: string
    preferredUsername: string
    profile: string
    website: string
    gender: string
    birthdate: string
    zoneinfo: string
    locale: string
    address: {
      formatted: string
      streetAddress: string
      locality: string
      region: string
      postalCode: string
      country: string
    }
  }
  applicationId: string
  isSuspended: boolean
  hasPassword: boolean
  ssoIdentities: {
    tenantId: string
    id: string
    userId: string
    issuer: string
    identityId: string
    detail: Record<string, unknown>
    createdAt: number
    ssoConnectorId: string
  }[]
}

export class Logto {
  static async getUser (id: string) {
    const client = await getLogtoClient(); // 获取包含 cachedGet 的客户端
    return await client.cachedGet<GetUserResponse>(`api/users/${id}`); // 使用 cachedGet 方法
  }
}