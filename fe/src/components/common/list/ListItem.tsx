import { PATH } from '@constants/path';
import { Theme, css } from '@emotion/react';
import { useEditProductStatus } from '@queries/products';
import { formatCount } from '@utils/formatCount';
import { formatPrice } from '@utils/formatPrice';
import { formatTimeStamp } from '@utils/formatTimeStamp';
import { getUserInfo } from '@utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { Button } from '../button/Button';
import { Dropdown } from '../dropdown/Dropdown';
import { Dots, Heart, Message } from '../icons';
import { ImageBox } from '../imageBox/ImageBox';
import { MenuBox } from '../menu/MenuBox';
import { MenuItem } from '../menu/MenuItem';
import { StatusBadge } from '../statusBadge/StatusBadge';

type Props = {
  product: ProductType;
  onOpenDetail?: () => void;
  onAlertOpen?: () => void;
};

export const ListItem: React.FC<Props> = ({
  product,
  onOpenDetail,
  onAlertOpen,
}) => {
  const navigate = useNavigate();
  const editProductStatusMutation = useEditProductStatus('home');

  const formattedPrice = formatPrice(product.price);
  const formattedTimeStamp = formatTimeStamp(product.createdAt);
  const formattedChatCount = formatCount(product.chatCount);
  const formattedLikeCount = formatCount(product.likeCount);
  const isAuthor = getUserInfo()
    ? getUserInfo()?.id === product.sellerId
    : false;
  // const isAuthor = true;

  const onEditProductStatus = (status: ProductStatusType) => {
    editProductStatusMutation.mutate({
      id: product.id,
      status,
    });
  };

  const menuRowsByStatus: Record<
    ProductStatusType,
    { id: number; status: ProductStatusType }[]
  > = {
    판매중: [
      {
        id: 1,
        status: '예약중',
      },
      {
        id: 2,
        status: '판매완료',
      },
    ],
    예약중: [
      {
        id: 1,
        status: '판매중',
      },
      {
        id: 2,
        status: '판매완료',
      },
    ],
    판매완료: [
      {
        id: 1,
        status: '예약중',
      },
      {
        id: 2,
        status: '판매중',
      },
    ],
  };

  return (
    <>
      <li css={listItemStyle} onClick={onOpenDetail}>
        <ImageBox imageUrl={product.imageUrl} size="l" />
        <div className="text-area">
          <div className="text-area__information">
            <div className="text-area__information-title">
              <span>{product.title}</span>
              {isAuthor && (
                <Dropdown
                  opener={
                    <Button variant="text">
                      <Dots />
                    </Button>
                  }
                  menu={
                    <MenuBox>
                      <MenuItem
                        onClick={() =>
                          navigate(`${PATH.detail}/${product.id}/edit`)
                        }
                      >
                        게시글 수정
                      </MenuItem>
                      {menuRowsByStatus[product.status].map((row) => (
                        <MenuItem
                          key={row.id}
                          onClick={() => onEditProductStatus(row.status)}
                        >
                          {`${row.status} 상태로 전환`}
                        </MenuItem>
                      ))}
                      <MenuItem variant="warning" onClick={onAlertOpen}>
                        삭제
                      </MenuItem>
                    </MenuBox>
                  }
                />
              )}
            </div>
            <div className="text-area__information-location">
              {product.location} · {formattedTimeStamp}
            </div>
            <div className="text-area__information-state">
              {product.status && <StatusBadge state={product.status} />}
              {formattedPrice}
            </div>
          </div>

          <div className="text-area__icons">
            {product.chatCount > 0 && (
              <div>
                <Message />
                <span>{formattedChatCount}</span>
              </div>
            )}
            {product.likeCount > 0 && (
              <div>
                <Heart />
                <span>{formattedLikeCount}</span>
              </div>
            )}
          </div>
        </div>
      </li>
    </>
  );
};

const listItemStyle = (theme: Theme) => {
  return css`
    box-sizing: border-box;
    display: flex;
    padding: 16px 0px;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;

    &:hover .text-area__information-title > span {
      font: ${theme.font.displayStrong16};
    }

    .text-area {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      flex: 1 0 0;
      align-self: stretch;

      &__information {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        align-self: stretch;

        &-title {
          display: flex;
          min-height: 24px;
          max-height: 48px;
          align-items: flex-start;
          justify-content: space-between;
          gap: 4px;
          align-self: stretch;
          font: ${theme.font.displayDefault16};
          color: ${theme.color.neutral.textStrong};

          button {
            padding: 0;
          }

          svg {
            fill: ${theme.color.neutral.textStrong};
          }
        }

        &-location {
          font: ${theme.font.displayDefault12};
          color: ${theme.color.neutral.textWeak};
        }

        &-state {
          display: flex;
          align-items: center;
          gap: 4px;
          font: ${theme.font.displayStrong16};
          color: ${theme.color.neutral.textStrong};
        }
      }

      &__icons {
        display: flex;
        align-items: center;
        gap: 8px;

        font: ${theme.font.displayDefault12};
        color: ${theme.color.neutral.textWeak};
        svg {
          width: 16px;
          height: 16px;
          stroke: ${theme.color.neutral.textWeak};
        }

        > div {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }
    }

    border-bottom: 0.8px solid ${theme.color.neutral.border};
  `;
};
