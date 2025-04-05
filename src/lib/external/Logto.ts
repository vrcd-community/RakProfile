import axios from 'axios'
import Cache from '../cache'
import prisma from '../db'

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
    timeout: 5000,
    validateStatus: (status) => status >= 200 && status < 500
  });

  // 封装一个带缓存的 get 方法
  const cachedGet = async <T>(url: string, ttlSeconds: number = apiResponseTTLSeconds): Promise<T> => {
    const cacheKey = `api_response_${url}`; // 使用 URL 作为缓存键
    const fetchData = async () => (await logtoClient.get(url)).data as T;
    return apiResponseCache.get<T>(cacheKey, fetchData, ttlSeconds);
  };

  return { // 返回包含 cachedGet 方法的客户端
    logtoClient,
    cachedGet,
  };
}

interface UserResponse {
  id: string
  username: string
  primaryEmail: string
  primaryPhone: string
  name: string
  avatar: string
  customData: Record<string, unknown>
  identities: Record<string, {
    userId: string
    details: {
      email: string
      name: string
      [key: string]: unknown
    }
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

interface UpdateUserRequest {
  username?: string,
  primaryEmail?: string,
  primaryPhone?: string,
  name?: string,
  avatar?: string,
  customData?: Record<string, unknown>,
  profile?: {
    familyName?: string,
    givenName?: string,
    middleName?: string,
    nickname?: string,
    preferredUsername?: string,
    profile?: string,
    website?: string,
    gender?: string,
    birthdate?: string,
    zoneinfo?: string,
    locale?: string,
    address?: {
      formatted?: string,
      streetAddress?: string,
      locality?: string,
      region?: string,
      postalCode?: string,
      country?: string
    }
  }
}

interface MFAitem {
  id: string;
  createdAt: string;
  type: string;
  agent?: string;
  remainCodes?: number;
}

interface SocialIdentityResponse {
  verificationRecordId: string;
  authorizationUri: string;
  expiresAt: string;
}

export class Logto {
  static async getUser(id: string) {
    const client = await getLogtoClient(); // 获取包含 cachedGet 的客户端
    return await client.cachedGet<UserResponse>(`api/users/${id}`); // 使用 cachedGet 方法
  }

  static async updateUser(id: string, data: UpdateUserRequest): Promise<UserResponse> {
    const client = await getLogtoClient();
    return await client.logtoClient.patch(`api/users/${id}`, data);
  }

  static async UpdateCustomData(id: string, customData: Record<string, unknown>) {
    const currentData = await Logto.getUser(id);
    const currentCustomData = currentData.customData || {};
    const newData = Object.assign(currentCustomData, customData);
    
    await Logto.updateUser(id, { customData: newData });
    await prisma.user.update({ where: { logto_id: id }, data: { custom_data: JSON.stringify(newData) } });

    return newData;
  }

  static async UpdatePassword(id: string, old_password: string, password: string) {
    const client = await getLogtoClient();
    const verify = await client.logtoClient.post(`api/users/${id}/password/verify`, {
      password: old_password
    });

    if (verify.status !== 204) {
      throw new Error("旧密码错误");
    }

    await client.logtoClient.patch(`api/users/${id}/password`, {
      password: password
    });

    return true;
  }

  static async getMFA (id: string) {
    const client = await getLogtoClient();

    const mfa = await client.logtoClient.get(`/api/users/${id}/mfa-verifications`);

    return mfa.data as MFAitem[];
  }

  static async CreateMFA (id: string, type: string) {
    const client = await getLogtoClient();

    const mfa = await client.logtoClient.post(`/api/users/${id}/mfa-verifications`, {
      type: type
    });

    return mfa.data;
  }

  static async DeleteMFA (id: string, mfaId: string) {
    const client = await getLogtoClient();

    await client.logtoClient.delete(`/api/users/${id}/mfa-verifications/${mfaId}`);
    return true;
  }

  static async CreateSocialIdentity (provider: string, token: string) {
    const providerMap: Record<string, string> = {
      "github": "2y2edbfkoweknupqblcc3",
      "azuread": "d0n5zorq55oh8qbkgtw9v",
      "discord": "jautjvxf4byxsad3nfrz2"
    }

    const social = await axios.post(`${process.env.LOGTO_BASEURL}/api/verifications/social`, {
      state: provider,
      redirectUri: `${process.env.LOGTO_AUTH_BASE_URL}/api/user/me/3rd/callback`,
      connectorId: providerMap[provider]
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return social.data as SocialIdentityResponse;
  }

  static async DeleteSocialIdentity (id: string, target: string) {
    const client = await getLogtoClient();

    await client.logtoClient.delete(`/api/users/${id}/identities/${target}`);
    return true;
  }

  static async VerifySocialIdentity(provider: string, userId: string, connectorData: { code: string; state: string; redirectUri: string; }) {
    const providerMap: Record<string, string> = {
      "github": "2y2edbfkoweknupqblcc3",
      "azuread": "d0n5zorq55oh8qbkgtw9v",
      "discord": "jautjvxf4byxsad3nfrz2"
    }

    const client = await getLogtoClient();

    const verification = await client.logtoClient.post(`${process.env.LOGTO_BASEURL}/api/users/${userId}/identities`, {
      connectorId: providerMap[provider],
      connectorData
    });

    return verification.data;
  }
}