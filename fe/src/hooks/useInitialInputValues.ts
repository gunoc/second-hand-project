import { useProductDetailQuery } from '@queries/products';

type InitialInputValues = {
  title: string;
  description: string;
  price: string;
  category: string;
  location: LocationType | undefined;
  images: ImageType[];
};

export const useInitialInputValues = (
  productId: number,
): InitialInputValues => {
  const { product, images, location } = useProductDetailQuery(productId);

  return {
    title: product?.title || '',
    description: product?.content || '',
    price: product?.price.toString() || '',
    category: product?.category || '',
    location: location,
    images: images || [],
  };
};
