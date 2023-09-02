export const BASE_URL = 'http://localhost:5173';
// export const BASE_URL =
//   'http://ec2-52-78-56-188.ap-northeast-2.compute.amazonaws.com:8080';

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

  // throw new Error('Content type is not json');
};

export const getMyLocations = async () => {
  // TODO 액세스 토큰을 헤더에 담아서 보내야 함
  // TODO const accesToken = null;

  // TODO  if (!accesToken) return {id: 0, name: '역삼 1동', isMainLocation: true};

  // return await fetchData('/users/locations');

  return await fetchData('/users/locations', {
    method: 'GET',
  });
};

export const deleteLocation = (id: number) => {
  // TODO 액세스 토큰을 헤더에 담아서 보내야 함
  // TODO const accesToken =

  return fetchData(`/users/locations/${id}`, {
    method: 'DELETE',
  });
};

export const patchMainLocation = (id: number) => {
  // TODO 액세스 토큰을 헤더에 담아서 보내야 함
  // TODO const accesToken =

  return fetchData(`/users/locations`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
};

export const checkNickname = async (nickname: string) => {
  // TODO 액세스 토큰을 헤더에 담아서 보내야 함
  // TODO const accesToken =

  return await fetchData(`/api/users?nickname=${nickname}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const signup = async ({
  nickname,
  mainLocationId,
  subLocationId,
}: {
  nickname: string;
  mainLocationId: number;
  subLocationId?: number;
}) => {
  // TODO 액세스 토큰을 헤더에 담아서 보내야 함
  // TODO const accesToken =

  return await fetchData(`/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nickname, mainLocationId, subLocationId }),
  });
};

export const getLocationWithQuery = async (query: string) => {
  // /api/locations?keyword=”강남구”

  // TODO 액세스 토큰을 헤더에 담아서 보내야 함
  // TODO const accesToken =

  return await fetchData(`/locations?keyword="${query}"`);
};
