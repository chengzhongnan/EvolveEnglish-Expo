// api.js
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Constant } from './const';


const ERROR_PAGE = '/error'; // 错误页面地址

// 获取本地存储中的 token (假设 token 存储在 localStorage 中)
const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  if (token !== null) {
    return token;
  }
  return null;
};

// 处理 fetch 请求，自动附加 token，并处理错误
const fetchWithInterceptor = async (url: string, options: RequestInit = {}) => {
  // 获取 token 并附加到 URL 参数中
  const token = await getToken();
  const urlWithToken = token ? `${url}?token=${token}` : url;

  // 设置 Accept-Encoding 头
  const headers = {
    'Accept-Encoding': 'gzip, deflate', // 明确指定接受的压缩类型
    ...options.headers, // 合并其他可能已经存在的 headers
  };

  const response = await fetch(urlWithToken, {
    ...options,
    headers, // 使用合并后的 headers
  });

  // 检查状态码是否为 200
  if (response.ok) {
    // 尝试解析 JSON
    const data = await response.json();
    return data;
  } else {
    // 如果状态码不是 200，重定向到错误页面
    throw new Error(response.statusText);
  }
};

// 获取阅读材料配置的函数
export const getMaterialConfigs = async (): Promise<GetMaterialConfigsResponse> => {
  const endpoint = `${Constant.apiUrl}/getMaterialConfigs`;
  return fetchWithInterceptor(endpoint, {
    method: 'GET',
  });
};

interface GetMaterialConfigsResponse {
  types: [{
    name: string,
    desc: string,
    image: string
  }]
}

interface GetReadingMaterialOption {
    name: string;
    content: string;
  }
  
  interface GetReadingMaterialQuestion {
    id: string;
    question: string;
    option: GetReadingMaterialOption[];
    answer: string;
  }
  
  interface GetReadingMaterialMaterial {
    contents: string;
    translate: string;
    questions: GetReadingMaterialQuestion[];
  }
  
  interface GetReadingMaterialResponse {
    material: GetReadingMaterialMaterial;
  }

// 获取文章和问题
export const getReadingMaterial = async (type: string, id: string): Promise<GetReadingMaterialResponse> => {
    const endpoint = `${Constant.apiUrl}/getReadingMaterial?type=${type}&id=${id}`;
    return fetchWithInterceptor(endpoint, {
        method: 'GET'
    });
}
