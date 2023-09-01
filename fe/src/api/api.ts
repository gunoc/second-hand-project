export const BASE_URL = 'http://localhost:5173';

const fetchData = async (path: string, options?: RequestInit) => {
  const response = await fetch(BASE_URL + path, options);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  if (response.headers.get('content-type') === 'application/json') {
    const data = response.json();

    return data;
  }

  throw new Error('Content type is not json');
};

export const getMyLocations = async () => {
  // TODO 액세스 토큰을 헤더에 담아서 보내야 함
  // TODO const accesToken = null;

  // TODO  if (!accesToken) return {id: 0, name: '역삼 1동', isMainLocation: true};

  return await fetchData('/users/locations');
};

export const deleteLocation = async (id: number) => {
  // TODO 액세스 토큰을 헤더에 담아서 보내야 함
  // TODO const accesToken =

  return await fetchData(`/users/locations/${id}`, {
    method: 'DELETE',
  });
};

export const patchMainLocation = async (id: number) => {
  // TODO 액세스 토큰을 헤더에 담아서 보내야 함
  // TODO const accesToken =

  return await fetchData(`/users/locations`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
};

export const getLocationWithQuery = async (query: string) => {
  // /api/locations?keyword=”강남구”

  // TODO 액세스 토큰을 헤더에 담아서 보내야 함
  // TODO const accesToken =

  return await fetchData(`/locations?keyword="${query}"`);
};
