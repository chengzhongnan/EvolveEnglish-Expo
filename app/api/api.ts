// api.js
const DOMAIN = 'https://english_learning.chzhn2008.workers.dev';
const ERROR_PAGE = '/error'; // 错误页面地址

// 获取本地存储中的 token (假设 token 存储在 localStorage 中)
const getToken = () => {
  // 这里可以根据实际情况调整存储 token 的方式
  return localStorage.getItem('token');
};

// 处理 fetch 请求，自动附加 token，并处理错误
const fetchWithInterceptor = async (url: string, options = {}) => {
  // 获取 token 并附加到 URL 参数中
  const token = getToken();
  const urlWithToken = token ? `${url}?token=${token}` : url;

  try {
    const response = await fetch(urlWithToken, options);

    // 检查状态码是否为 200
    if (response.ok) {
      // 尝试解析 JSON
      const data = await response.json();
      return data;
    } else {
      // 如果状态码不是 200，重定向到错误页面
      window.location.href = ERROR_PAGE;
    }
  } catch (error) {
    // 处理网络错误或 JSON 解析错误，重定向到错误页面
    console.error('Error in API request:', error);
    window.location.href = ERROR_PAGE;
  }
};

// 获取阅读材料配置的函数
export const getMaterialConfigs = async () => {
  const endpoint = `${DOMAIN}/getMaterialConfigs`;
  return fetchWithInterceptor(endpoint, {
    method: 'GET',
  });
};

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
    const endpoint = `${DOMAIN}/getReadingMaterial?type=${type}&id=${id}`;
    return fetchWithInterceptor(endpoint, {
        method: 'GET'
    });
}
