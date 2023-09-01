import { rest } from 'msw';

let locations: LocationType[] = [
  { id: 1, name: '안양99동', isMainLocation: true },
  { id: 2, name: '안양100동', isMainLocation: false },
];

export const handlers = [
  rest.get(`/users/locations`, (_, res, ctx) => {
    console.log('get', locations);

    // 딜레이 주기
    return res(ctx.delay(300), ctx.status(200), ctx.json(locations));
  }),

  rest.delete(`/users/locations/:id`, (req, res, ctx) => {
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

  rest.patch(`/users/locations`, (req, res, ctx) => {
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

  //
];
