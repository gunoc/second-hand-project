import { rest } from 'msw';
import { users } from './data/users';
import { BASE_URL } from '@/constants/path';

let locations: LocationType[] = [
  { id: 1, name: '안양99동', isMainLocation: true },
  { id: 2, name: '안양100동', isMainLocation: false },
];

export const handlers = [
  rest.get(`${BASE_URL}/users/locations`, (req, res, ctx) => {
    // 딜레이 주기
    console.log(req);

    return res(ctx.delay(300), ctx.status(200), ctx.json(locations));
  }),

  rest.delete(`${BASE_URL}/users/locations/:id`, (req, res, ctx) => {
    const { id } = req.params;

    // 삭제 처리
    locations = locations.filter((location) => location.id !== Number(id));

    // 남아있는 위치가 있다면 첫 번째 위치를 주요 위치로 설정
    if (locations.length > 0) {
      locations[0].isMainLocation = true;
    }
    console.log('delete', locations);

    // 반환 데이터
    const data = {
      success: true,
      data: {
        mainLocationId:
          locations.find((location) => location.isMainLocation)?.id || null,
      },
    };

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.patch(`${BASE_URL}/users/locations`, (req, res, ctx) => {
    if (locations.length === 1) return;

    const { id } = req.body as { id: number };

    locations = locations.map((location) => ({
      ...location,
      isMainLocation: location.id === id,
    }));

    const data = {
      success: true,
      data: {
        mainLocationId: id,
      },
    };

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.get('/api/users', (req, res, ctx) => {
    const query = req.url.searchParams;
    const nickname = query.get('nickname');

    const isUser = users.some((user) => user.nickname === nickname);

    if (isUser) {
      const data = {
        success: false,
        errorCode: {
          status: 409,
          message: '같은 닉네임이 존재합니다.',
        },
      };

      return res(ctx.status(409), ctx.json(data));
    }

    const data = {
      success: true,
    };

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.post('/api/users', async (req, res, ctx) => {
    const { nickname, mainLocationId, subLocationId } = await req.json();

    const newUser = {
      id: users.length + 1,
      nickname,
      mainLocationId,
      subLocationId,
      imageUrl: '',
    };

    users.push(newUser);

    const data = {
      success: true,
      data: {
        isUser: true,
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        user: {
          id: newUser.id,
          nickname: newUser.nickname,
          imageUrl: newUser.imageUrl,
        },
      },
    };

    return res(ctx.status(200), ctx.json(data));
  }),
];
