import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Theme, css } from '@emotion/react';

import {
  ChevronDown,
  ChevronLeft,
  Dots,
  Heart,
} from '@components/common/icons';
import { TopBar } from '@/components/common/topBar/TopBar';
import { RightButton } from '@/components/common/topBar/RightButton';
import { LeftButton } from '@/components/common/topBar/LeftButton';
import { Button } from '@/components/common/button/Button';
import { getUserInfo } from '@/utils/localStorage';
import { PostBar } from '@/components/common/actionBar/PostBar';
import { formatPrice } from '@/utils/formatPrice';
import { Dropdown } from '@/components/common/dropdown/Dropdown';
import { MenuBox } from '@/components/common/menu/MenuBox';
import { MenuItem } from '@/components/common/menu/MenuItem';
import { formatTimeStamp } from '@/utils/formatTimeStamp';
import {
  useDeleteProduct,
  useEditLikeStatus,
  useEditProductStatus,
  useProductDetailQuery,
} from '@/queries/products';
import { Alert } from '@/components/common/alert/Alert';
import { AlertContent } from '@/components/common/alert/AlertContent';
import { AlertButtons } from '@/components/common/alert/AlertButtons';
import { useIntersectionObserver } from '@/hooks/useObserver';
import { ImageCarousel } from '@/components/detail/ImageCarousel';
import { useAlert } from '@/hooks/usePopups';
import { usePathHistoryStore } from '@/stores/pathHistoryStore';
import { PATH } from '@/constants/path';
// TODO 로그인하지 않은 사용자에게 데이터가 안뜨고있음

export const ProductDetail: React.FC = () => {
  const { alertSource, currentDim, onOpenAlert, onCloseAlert } = useAlert();
  const [isTransparent, setIsTransparent] = useState<boolean>(true);
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const numberedProductId = Number(productId);
  const {
    product,
    seller,
    imageUrls,
    status: fetchStatus,
    // error, // TODO 에러 토스트 메세지
  } = useProductDetailQuery(numberedProductId);
  const deleteProductMutation = useDeleteProduct('detail');
  const editProductStatusMutation = useEditProductStatus('detail');
  const editLikeStatusMutation = useEditLikeStatus();
  const { prevPath } = usePathHistoryStore();

  const formattedPrice = formatPrice(product?.price);
  const formattedTimeStamp = formatTimeStamp(product?.createdAt);
  const isAuthor = getUserInfo() && getUserInfo()?.id === seller?.id;
  // const isAuthor = true; // TODO 교체

  const realTimeChatRoomCount = 0; //TODO 교체

  const { observeTarget } = useIntersectionObserver({
    inviewCallback: () => {
      onScrollInview();
    },
    outviewCallback: () => {
      onScrollOutview();
    },
    condition: true,
  });

  const onScrollInview = () => {
    setIsTransparent(true);
  };

  const onScrollOutview = () => {
    setIsTransparent(false);
  };

  const onDeleteProduct = (productId?: number) => {
    if (productId) {
      onCloseAlert({ currentDim: null });
      deleteProductMutation.mutate(productId);
    }

    onNavigateBack();
  };

  const onEditProductStatus = (
    status: ProductStatusType,
    productId?: number,
  ) => {
    if (productId) {
      editProductStatusMutation.mutate({
        id: productId,
        status,
      });
    }
  };

  const onToggleLike = () => {
    if (productId) {
      editLikeStatusMutation.mutate(numberedProductId);
    }
  };
  console.log(prevPath, '< prevPath');
  console.log(PATH.newProduct, 'PATH.newProduct');
  console.log(prevPath === PATH.newProduct, 'PATH test?');

  const onNavigateBack = () => {
    prevPath === PATH.newProduct ? navigate(PATH.home) : navigate(-1);
  };

  const menuRowsByStatus: { id: number; status: ProductStatusType }[] = [
    {
      id: 1,
      status: '판매중',
    },
    {
      id: 2,
      status: '예약중',
    },
    {
      id: 3,
      status: '판매완료',
    },
  ];

  return (
    <div css={(theme) => pageStyle(theme, product?.isLiked, isTransparent)}>
      <TopBar transparent={isTransparent}>
        <LeftButton>
          <Button
            className="button__back"
            variant="text"
            onClick={onNavigateBack}
          >
            <ChevronLeft />
            뒤로
          </Button>
        </LeftButton>
        {/* TODO 인증 잠시 제외 */}
        {isAuthor && (
          <RightButton>
            <Dropdown
              align="right"
              opener={
                <Button variant="text" className="button__status">
                  <Dots />
                </Button>
              }
              menu={
                <MenuBox>
                  <MenuItem
                    onClick={() => {
                      navigate(PATH.newProduct);
                    }}
                  >
                    게시글 수정
                  </MenuItem>
                  <MenuItem
                    variant="warning"
                    onClick={() => {
                      onOpenAlert('product');
                    }}
                  >
                    삭제
                  </MenuItem>
                </MenuBox>
              }
            />
          </RightButton>
        )}
      </TopBar>
      {fetchStatus === 'loading' && <div>로딩중</div>}
      {fetchStatus === 'error' && <div>상품 정보를 불러오지 못했습니다</div>}
      <div css={obseverStyle} ref={observeTarget}></div>
      <div className="page-content">
        <ImageCarousel imageUrls={imageUrls} />
        <div className="page-content-info">
          <div className="seller">
            <p className="seller-label">판매자 정보</p>
            <p className="seller-name">{seller?.nickname}</p>
          </div>
          {isAuthor && (
            <Dropdown
              opener={
                <Button
                  variant="text"
                  state="default"
                  className="button__status"
                >
                  <p>{product?.status}</p>
                  <ChevronDown />
                </Button>
              }
              menu={
                <MenuBox>
                  {menuRowsByStatus.map((row) => (
                    <MenuItem
                      key={row.id}
                      onClick={() => {
                        onEditProductStatus(row.status, row.id);
                      }}
                    >
                      {row.status}
                    </MenuItem>
                  ))}
                </MenuBox>
              }
            />
          )}
          <div className="description">
            <div className="description-title">
              <p className="title">{product?.title}</p>
              <p className="category">
                {product?.category} · {formattedTimeStamp}
              </p>
            </div>
            <div className="description-body">{product?.content}</div>
            <div className="description-caption">
              <div>
                <span>채팅</span>
                <span>{product?.chatCount}</span>
              </div>
              <div>
                <span>관심</span>
                <span>{product?.likeCount}</span>
              </div>
              <div>
                <span>조회</span>
                <span>{product?.hits}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PostBar isLiked={true}>
        <div className="info">
          <Heart className="like-icon" onClick={onToggleLike} />
          {formattedPrice}
        </div>
        {isAuthor ? (
          <Button
            variant="rectangle"
            size="s"
            state="active"
            onClick={() => {
              console.log('채팅방 목록으로 이동');
            }}
          >
            대화 중인 채팅방 {realTimeChatRoomCount}
          </Button>
        ) : (
          <Button
            variant="rectangle"
            size="s"
            state="active"
            onClick={() => {
              console.log('1:1 채팅방으로 이동');
            }}
          >
            채팅하기
          </Button>
        )}
      </PostBar>

      <Alert isOpen={alertSource === 'product'} currentDim={currentDim}>
        <AlertContent>'{product?.title}'을 삭제하시겠어요?</AlertContent>
        <AlertButtons
          buttonText="취소"
          onDelete={() => onDeleteProduct(numberedProductId)}
        />
      </Alert>
    </div>
  );
};

const pageStyle = (
  theme: Theme,
  isLiked: boolean | undefined,
  isTransparent: boolean,
) => {
  return css`
    ::-webkit-scrollbar {
      display: none;
    }
    height: 100vh;

    .button__back,
    .button__status {
      color: ${isTransparent
        ? theme.color.accent.text
        : theme.color.neutral.text};
      svg {
        stroke: ${isTransparent
          ? theme.color.accent.text
          : theme.color.neutral.text};
      }
    }

    .page-content {
      margin-top: -72px;
      padding-bottom: 64px;
      box-sizing: border-box;
    }

    .page-content-info {
      padding: 16px;
      display: flex;
      gap: 16px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      .seller {
        border-radius: 12px;
        background: ${theme.color.neutral.backgroundWeak};
        display: flex;
        box-sizing: border-box;
        width: 100%;
        padding: 16px;
        justify-content: space-between;
        align-items: center;

        &-label {
          font: ${theme.font.displayDefault16};
          color: ${theme.color.neutral.text};
        }
        &-name {
          font: ${theme.font.displayStrong16};
          color: ${theme.color.neutral.textStrong};
        }
      }

      .button__status {
        display: inline-flex;
        height: 32px;
        padding: 0px 16px;
        justify-content: center;
        align-items: center;
        gap: 4px;
        flex-shrink: 0;
        border-radius: 8px;
        font: ${theme.font.displayDefault12};
        color: ${theme.color.neutral.textStrong};

        p {
          width: 56px;
          text-align: start;
        }
        svg {
          width: 16px;
          height: 16px;
          stroke: ${theme.color.neutral.textStrong};
        }
      }
    }

    .description {
      display: flex;
      width: 363px;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;

      &-title {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        align-self: stretch;

        .title {
          font: ${theme.font.displayStrong20};
          color: ${theme.color.neutral.textStrong};
        }
        .category {
          font: ${theme.font.displayDefault12};
          color: ${theme.color.neutral.textWeak};
        }
      }

      &-body {
        width: 100%;
        white-space: pre-wrap;
        font: ${theme.font.displayDefault16};
        color: ${theme.color.neutral.text};
      }

      &-caption {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        align-self: stretch;
        font: ${theme.font.displayDefault12};
        color: ${theme.color.neutral.textWeak};

        div {
          display: flex;
          align-items: flex-start;
          gap: 4px;
        }
      }
    }

    .info {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .like-icon {
      cursor: pointer;
      stroke: ${isLiked
        ? theme.color.system.warning
        : theme.color.neutral.textStrong};
      fill: ${isLiked ? theme.color.system.warning : 'none'};
    }
  `;
};
const obseverStyle = css`
  height: 1px;
  width: 100%;
`;
