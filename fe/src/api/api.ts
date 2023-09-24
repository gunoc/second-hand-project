import { BASE_URL, END_POINT } from '@constants/path';
import { createQueryParams } from '@utils/createQueryParams';
import { getAccessToken, getRefreshToken } from '@utils/localStorage';

const fetchData = async (path: string, options?: RequestInit) => {
  const response = await fetch(BASE_URL + path, options);

  if (!response.ok) {
    const errorMessage = await response.text();

    throw new Error(errorMessage);
  }

  if (response.headers.get('content-type') === 'application/json') {
    const data = await response.json();

    return data;
  }
};

export const getMyLocations = () => {
  return fetchData(END_POINT.locations(), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const deleteLocation = (id: number) => {
  return fetchData(END_POINT.locations(id), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const patchMainLocation = (id: number) => {
  return fetchData(END_POINT.locations(), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      locationId: id,
    }),
  });
};

export const checkNickname = async (nickname: string) => {
  return fetchData(END_POINT.nicknameCheck(nickname), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const signup = async (signupInfo: SignupData) => {
  return fetchData(END_POINT.signup, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify(signupInfo),
  });
};

export const login = async (code: string) => {
  return fetchData(END_POINT.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: code,
    }),
  });
};

export const logout = async () => {
  return fetchData(END_POINT.logout, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      refreshToken: getRefreshToken(),
    }),
  });
};

export const refreshToken = async () => {
  return fetchData(END_POINT.refreshToken, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refreshToken: getRefreshToken(),
    }),
  });
};

export const getLocationWithQuery = (query: string) => {
  return fetchData(END_POINT.locationsOf(encodeURIComponent(query)), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const getCategories = () => {
  return fetchData(END_POINT.categories);
};

export const getProducts = ({
  locationId,
  categoryId,
  size,
  next = 50,
}: FetchProductsParams) => {
  const queryParams = createQueryParams({
    locationId,
    categoryId,
    size,
    next,
  });
  console.log(queryParams, '쿼리확인중');

  return fetchData(END_POINT.products(queryParams));
};

export const getProductsDetail = (id: number) => {
  const token = getAccessToken();

  const requestOptions: RequestInit = {
    method: 'GET',
  };

  if (token) {
    requestOptions.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return fetchData(END_POINT.productDetail(id), requestOptions);
};

export const editProductStatus = (id: number, status: ProductStatusType) => {
  return fetchData(END_POINT.productStatusEdit(id), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      status,
    }),
  });
};

export const deleteProduct = (id: number) => {
  return fetchData(END_POINT.productDelete(id), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const editLikeStatus = (id: number) => {
  return fetchData(END_POINT.productLike(id), {
    method: 'PATCH',
  });
};

export const requestImageUpload = (images: FormData) => {
  return fetchData(END_POINT.imageUpload, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: images,
  });
};

export const addNewProduct = (productFormData: ProductFormData) => {
  return fetchData(END_POINT.products(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify(productFormData),
  });
};

export const editProduct = (id: number, productFormData: ProductFormData) => {
  return fetchData(END_POINT.productDetail(id), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify(productFormData),
  });
};

export const getChatRooms = () => {
  return fetchData(END_POINT.chatRooms, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const getUnreadTotalCount = () => {
  return fetchData(END_POINT.unreadTotalCount, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};
