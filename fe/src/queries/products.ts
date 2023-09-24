import {
  addNewProduct,
  deleteProduct,
  editLikeStatus,
  editProduct,
  editProductStatus,
  getProducts,
  getProductsDetail,
  requestImageUpload,
} from '@api/api';
import { QUERY_KEY } from '@constants/queryKey';
import { modifiedLocationName } from '@utils/modifyLocationName';
import { useMemo } from 'react';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

export const useProducts = (
  locationId?: number,
  categoryId?: number | null,
  size = 10,
) => {
  console.log(locationId, categoryId, '확인중');

  const fetchProducts = ({ pageParam }: { pageParam?: number }) => {
    return getProducts({ locationId, categoryId, next: pageParam, size });
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    status,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    [QUERY_KEY.products, locationId, categoryId],
    fetchProducts,
    {
      getNextPageParam: (lastPage) => {
        return lastPage.data.nextId || null;
      },
    },
  );

  const allProducts = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.products) ?? [];
  }, [data]);

  return {
    products: allProducts,
    fetchNextPage,
    hasNextPage,
    status,
    isFetchingNextPage,
    refetch,
  };
};

export const useEditProductStatus = (source: 'home' | 'detail') => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, { id: number; status: ProductStatusType }>({
    mutationFn: ({ id, status }) => editProductStatus(id, status),
    onSuccess: () => {
      if (source === 'home') queryClient.invalidateQueries(QUERY_KEY.products);
      if (source === 'detail')
        queryClient.invalidateQueries(QUERY_KEY.productDetail);
    },
  });
};

export const useDeleteProduct = (source: 'home' | 'detail') => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, number>({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      if (source === 'home') queryClient.invalidateQueries(QUERY_KEY.products);
      if (source === 'detail')
        queryClient.invalidateQueries(QUERY_KEY.productDetail);
    },
  });
};

export const useProductDetailQuery = (id: number) => {
  const { data, status, error } = useQuery<
    ProductDetailDataFromServer,
    unknown,
    {
      product: ProductDetailType['product'];
      seller: ProductDetailType['seller'];
      images: ProductDetailType['images'];
      location: ProductDetailType['location'];
    }
  >({
    queryKey: [QUERY_KEY.productDetail, id],
    queryFn: () => getProductsDetail(id),
    select: (responseData) => {
      const { product, seller, images, location } = responseData.data;
      return {
        product,
        seller,
        images,
        location: { ...location, name: modifiedLocationName(location.name) },
      };
    },
    enabled: !isNaN(id),
  });

  return {
    ...data,
    status,
    error,
  };
};

export const useEditLikeStatus = () => {
  const queryClient = useQueryClient();

  type MutationContext = {
    previousProduct?: ProductDetailDataFromServer;
  };

  return useMutation<void, unknown, number, MutationContext>({
    mutationFn: (id: number) => editLikeStatus(id),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries([QUERY_KEY.productDetail, id]);

      const previousProduct = queryClient.getQueryData<
        ProductDetailDataFromServer | undefined
      >([QUERY_KEY.productDetail, id]);

      if (previousProduct) {
        const upDatedProduct = {
          ...previousProduct,
          data: {
            ...previousProduct.data,
            product: {
              ...previousProduct.data.product,
              isLiked: !previousProduct.data.product.isLiked,
              likeCount: previousProduct.data.product.isLiked
                ? previousProduct.data.product.likeCount - 1
                : previousProduct.data.product.likeCount + 1,
            },
          },
        };
        queryClient.setQueryData([QUERY_KEY.productDetail, id], upDatedProduct);
      }

      return { previousProduct };
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.productDetail]);
    },

    onError: (error, variables, context) => {
      if (context?.previousProduct) {
        console.log('에러발생', error); // TODO 에러처리

        queryClient.setQueryData(
          [QUERY_KEY.productDetail, variables],
          context.previousProduct,
        );
      }
    },
  });
};

export const useImageUpload = () => {
  return useMutation<ImageDataFromServer, unknown, FormData>({
    mutationFn: (image: FormData) => requestImageUpload(image),
  });
};

export const useProductMutation = (id: number) => {
  return useMutation<ProductAdditionResponse, unknown, ProductFormData>({
    mutationFn: (productFormData: ProductFormData) =>
      isNaN(id)
        ? addNewProduct(productFormData)
        : editProduct(id, productFormData),
  });
};
