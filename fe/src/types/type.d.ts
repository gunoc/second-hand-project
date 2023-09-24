type PopupType = 'modal' | 'alert';

type AlertSourceType = 'location' | 'product';

type AlertOpenType = {
  source?: AlertSourceType | null;
};

type LocationDataFromServer = {
  success: boolean;
  data: LocationType[];
};

type LocationType = {
  id: number;
  name: string;
  isMainLocation?: boolean;
};

type UserType = {
  id: number;
  nickname: string;
  imageUrl: string;
};

type LocationWithQueryDataFromServer = {
  success: boolean;
  data: LocationWithQueryType[];
};

type LocationWithQueryType = {
  id: number;
  name: string;
};

type CategoriesDataFromServer = {
  success: boolean;
  data: CategoryType[];
};

type CategoryType = {
  id: number;
  name: string;
  imageUrl: string;
};

type ProductType = {
  id: number;
  sellerId: number;
  title: string;
  location: string;
  imageUrl: string;
  createdAt: string;
  price: number;
  status: ProductStatusType;
  likeCount: number;
  chatCount: number;
};

type ProductStatusType = '예약중' | '판매중' | '판매완료';

type ProductsDataFromServer = {
  success: boolean;
  data: {
    products: ProductType[];
    nextId: number;
  };
};

type ProductDetailType = {
  images: {
    imageId: number;
    imageUrl: string;
  }[];
  seller: {
    id: number;
    nickname: string;
  };
  location: {
    id: number;
    name: string;
  };
  product: {
    location: string;
    status: ProductStatusType;
    title: string;
    category: string;
    createdAt: string;
    content: string;
    chatCount: number;
    likeCount: number;
    hits: number;
    price: number;
    isLiked: boolean;
  };
};

type ProductDetailDataFromServer = {
  success: boolean;
  data: ProductDetail;
};

type FetchProductsParams = {
  locationId?: number;
  categoryId?: number | null;
  next?: number;
  size?: number;
};

type SignupData = {
  nickname: string;
  mainLocationId: number;
  subLocationId?: number;
};

type SignupDataFromServer = {
  success: boolean;
  data: {
    isUser: boolean;
    accessToken: string;
    refreshToken: string;
    user: UserType;
  };
};

type LoginDataFromServer = {
  success: true;
  data:
    | {
        isUser: true;
        accessToken: string;
        refreshToken: string;
        user: UserType;
      }
    | {
        isUser: false;
        accessToken: string;
      };
};

type ImageType = {
  imageId: number;
  imageUrl: string;
};

type ImageDataFromServer =
  | {
      success: true;
      data: ImageType[];
    }
  | {
      success: false;
    };

type ProductFormData = {
  images: number[];
  title: string;
  categoryId: number;
  locationId: number;
  content?: string;
  price?: number;
};

type ProductAdditionResponse = {
  success: boolean;
  data?: {
    productId: number;
  };
};

type ChatRoomsDataFromServer = {
  success: boolean;
  data: ChatRoomType[];
};

type ChatRoomType = {
  chatroomId: number;
  lastChatContent: string;
  lastChatTime: string;
  unreadChatCount: number;
  opponent: OpponentType;
  product: ProductType;
};

type OpponentType = {
  id: number;
  nickname: string;
  imageUrl: string;
};

type ProductType = {
  id: number;
  thumbnail: string;
};

type UnreadTotalFromServer = {
  success: boolean;
  data: UnreadTotalCountType;
};

type UnreadTotalCountType = {
  unreadTotalCount: number;
};

type ServiceWorkerGlobalScope = typeof self & {
  registration: ServiceWorkerRegistration;
};
