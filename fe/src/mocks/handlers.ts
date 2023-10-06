import { DefaultRequestMultipartBody, rest } from 'msw';
import { categoryList } from './data/categories';
import { images } from './data/images';
import { locationsWithQuery } from './data/locations';
import { token, users } from './data/users';


let locations: LocationType[] = [
  { id: 1, name: '역삼1동', isMainLocation: true },
  { id: 100, name: '안양100동', isMainLocation: false },
];

export const handlers = [
  rest.get(`/api/users/locations`, (_, res, ctx) => {
    return res(
      ctx.delay(300),
      ctx.status(200),
      ctx.json({
        success: true,
        data: locations,
      }),
    );
  }),

  rest.delete(`/api/users/locations/:id`, (req, res, ctx) => {
    const { id } = req.params;

    locations = locations.filter((location) => location.id !== Number(id));

    if (locations.length > 0) {
      locations[0].isMainLocation = true;
    }

    const data = {
      success: true,
      data: {
        mainLocationId:
          locations.find((location) => location.isMainLocation)?.id || null,
      },
    };

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.patch(`/api/users/locations`, (req, res, ctx) => {
    const { locationId } = req.body as { locationId: number };

    const exists = locations.some((location) => location.id === locationId);

    if (!exists) {
      locations.push({
        id: locationId,
        name: `개포${locationId}동`,
        isMainLocation: false,
      });
    }

    locations = locations.map((location) => ({
      ...location,
      isMainLocation: location.id === locationId,
    }));

    const data = {
      success: true,
      data: {
        mainLocationId: locationId,
      },
    };

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.get(`/api/locations`, (req, res, ctx) => {
    const query = req.url.searchParams.get('keyword');

    const filteredLocations = locationsWithQuery.data.filter((location) =>
      location.name.includes(query!),
    );

    return res(ctx.status(200), ctx.json({ data: filteredLocations }));
  }),

  rest.get(`/api/categories`, (_, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json(categoryList));
  }),

  rest.get('/api/users/nickname', (req, res, ctx) => {

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
      return res(ctx.status(200), ctx.json(data));
    }

    const data = {
      success: true,
    };

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.post('/api/users/signup', async (req, res, ctx) => {

    const { nickname, mainLocationId, subLocationId } = await req.json();

    const newUser = {
      id: users.length + 1,
      nickname,
      mainLocationId,
      subLocationId,
      imageUrl:
        'https://i.pinimg.com/originals/3a/22/bd/3a22bdb8957e81ed560635383d483e97.png',
    };

    users.push(newUser);

    const data = {
      success: true,
      data: {
        isUser: true,
        accessToken: token,
        refreshToken: token,

        user: {
          id: newUser.id,
          nickname: newUser.nickname,
          imageUrl: newUser.imageUrl,
        },
      },
    };

    return res(ctx.status(200), ctx.json(data));
  }),


  rest.post('/api/users/login', async (req, res, ctx) => {
    const { code } = await req.json();

    if (!code) {
      return res(ctx.status(200), ctx.json({ success: false }));
    }

    const data = {
      success: true,
      data: {
        isUser: false,
        accessToken: 'accessTokenForSignup',
      },
    };

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.post('/api/users/logout', async (req, res, ctx) => {
    const authorization = req.headers.get('Authorization');
    const body = await req.json();

    if (authorization !== `Bearer ${token}` || body?.refreshToken !== token) {
      return res(ctx.status(200), ctx.json({ success: false }));
    }

    return res(ctx.status(200), ctx.json({ success: true }));
  }),

  rest.post('/api/users/reissue-access-token', async (req, res, ctx) => {
    const body = await req.json();

    if (body?.refreshToken !== token) {
      return res(ctx.status(200), ctx.json({ success: false }));
    }
    return res(
      ctx.status(200),
      ctx.json({ success: true, data: { accessToken: token } }),
    );
  }),

  rest.post('/api/images', async (req, res, ctx) => {
    if (!req.body) {
      return res(ctx.status(200), ctx.json({ success: false }));
    }

    const body = req.body as DefaultRequestMultipartBody;
    const reqImages = body.images;

    if (!reqImages) {
      return res(ctx.status(200), ctx.json({ success: false }));
    }

    const newImages = [];
    for (let i = 0; i < reqImages.length; i++) {
      newImages.push('https://picsum.photos/200');
    }

    images.push(...newImages);

    const data = {
      success: true,
      data: newImages.map((image, index) => ({
        imageId: images.length + index + 1,
        imageUrl: image,
      })),
    };

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.post('/api/products', async (req, res, ctx) => {
    const body = await req.json();

    if (
      !body?.images ||
      !body?.name ||
      !body?.categoryId ||
      !body?.locationId
    ) {
      return res(ctx.status(200), ctx.json({ success: false }));
    }

    return res(
      ctx.status(200),
      ctx.json({ success: true, data: { productId: 1 } }),
    );
  }),
];
