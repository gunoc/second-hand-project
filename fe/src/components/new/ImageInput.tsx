import { useImageUpload } from '@/queries/products';
import { css, Theme } from '@emotion/react';
import { useRef } from 'react';
import { Camera } from '../common/icons';
import { ImageItem } from './ImageItem';

type Props = {
  imageList: ImageType[];
  onAddImage: (image: ImageType) => void;
  onDeleteImage: (image: ImageType) => void;
};

export const ImageInput: React.FC<Props> = ({
  imageList,
  onAddImage,
  onDeleteImage,
}) => {
  const imageMutation = useImageUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addImage = () => {
    if (imageList.length >= 10) {
      return;
    }

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    // 파일이 없으면 업로드 하지 않음
    if (!files) {
      return;
    }

    if (files.length + imageList.length > 10) {
      alert('이미지는 최대 10개까지 업로드 할 수 있습니다.');
      return;
    }

    for (const file of files) {
      // 허용한 타입이 아니거나 용량이 2MB를 초과하면 업로드 하지 않음
      const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
      const VOLUME_LIMIT = 1024 * 1024 * 2; // 2MB

      if (!allowedTypes.includes(file.type) || file.size > VOLUME_LIMIT) {
        alert('이미지는 2MB 이하의 png, jpg, jpeg 파일만 업로드 가능합니다.');
        return;
      }
    }

    const formData = new FormData();
    for (const file of files) {
      formData.append('images', file);
    }

    imageMutation.mutate(formData, {
      onSuccess: (result) => {
        if (result.success) {
          result.data.forEach((image) => {
            onAddImage(image);
          });
        }
      },
      onError: (error) => {
        if (error instanceof Error) {
          throw error;
        }
      },
    });

    // 동일한 파일 업로드를 위한 input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div css={(theme) => imageInputStype(theme)}>
      <div className="image-input__container">
        <button
          className="image-input__add-btn"
          onClick={addImage}
          disabled={imageList.length >= 10}
        >
          <Camera />
          <span>{imageList.length}/10</span>
        </button>
        <input
          type="file"
          multiple
          accept=".png, .jpg, .jpeg"
          className="image-input__file-input"
          ref={fileInputRef}
          onChange={uploadImageFile}
        />
        <ul className="image-input__image-list">
          {imageList &&
            imageList.map((image, index) => (
              <li key={image.imageId}>
                <ImageItem
                  size="m"
                  imageUrl={image.imageUrl}
                  label={index === 0 ? '대표 사진' : ''}
                  onClick={() => onDeleteImage(image)}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

const imageInputStype = (theme: Theme) => css`
  padding-top: 8px;
  overflow-x: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  & .image-input {
    &__container {
      display: flex;
      gap: 16px;
    }

    &__add-btn {
      flex-shrink: 0;
      width: 80px;
      height: 80px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 4px;
      border-radius: 16px;
      border: 0.8px solid ${theme.color.neutral.border};

      & > svg {
        stroke: ${theme.color.neutral.textStrong};
      }

      &:hover,
      &:active {
        opacity: 0.8;
      }

      &:disabled {
        cursor: default;
        opacity: 0.32;
      }
    }

    &__file-input {
      display: none;
    }

    &__image-list {
      display: flex;
      gap: 8px;
    }
  }
`;
