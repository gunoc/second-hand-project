import { useEffect, useState } from 'react';

type ImageListInputType = {
  initialImageList?: ImageType[];
};

type ImageListInputReturnType = {
  imageList: ImageType[];
  addImage: (image: ImageType) => void;
  deleteImage: (image: ImageType) => void;
};

export const useImageListInput = ({
  initialImageList,
}: ImageListInputType): ImageListInputReturnType => {
  const [imageList, setImageList] = useState<ImageType[]>([]);

  useEffect(() => {
    if (!initialImageList || initialImageList.length === 0) {
      return;
    }

    setImageList(initialImageList);
  }, [initialImageList]);

  const addImage = (image: ImageType) => {
    setImageList([...imageList, image]);
  };

  const deleteImage = (image: ImageType) => {
    setImageList(imageList.filter((i) => i.imageId !== image.imageId));
  };

  return {
    imageList,
    addImage,
    deleteImage,
  };
};
