import { BASE_URL, API_KEY } from './APIConst';

function request<T>(url: string, config?: RequestInit & { params?: object }): Promise<T> {
  const fetchUrl = new URL(`${BASE_URL}${url}`);

  Object.entries({
    api_key: API_KEY,
    ...config?.params,
  }).forEach(([k, v]) => fetchUrl.searchParams.append(k, v));

  return fetch(fetchUrl, config)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.log('error: ', error);
    });
}

export const APIClient = {
  get: <T>(url: string, params?: object) => request<T>(url, params),
  post: <TBody extends BodyInit, T>(url: string, body: TBody) => request<T>(url, { method: 'POST', body }),
};

export default APIClient;
