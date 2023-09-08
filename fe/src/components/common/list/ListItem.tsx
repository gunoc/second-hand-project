import { FC } from 'react';
import { Theme, css } from '@emotion/react';
import { ImageBox } from '../imageBox/ImageBox';
import { Message, Heart, Dots } from '../icons';
import { Button } from '../button/Button';
import { StatusBadge } from '../statusBadge/StatusBadge';
import { formatTimeStamp } from '@/utils/formatTimeStamp';
import { formatPrice } from '@/utils/formatPrice';
import { formatCount } from '@/utils/formatCount';
import { getUserInfo } from '@/utils/localStorage';

type Props = {
  product: ProductType; // TODO : product 타입 변경
  onOpenDetail?: () => void;
};

export const ListItem: FC<Props> = ({ product, onOpenDetail }) => {
  const formattedPrice = formatPrice(product.price);
  const formattedTimeStamp = formatTimeStamp(product.createdAt);
  const formattedChatCount = formatCount(product.chatCount);
  const formattedLikeCount = formatCount(product.likeCount);
  const isAuthor = getUserInfo().id === product.sellerId;
  // TODO : dots 드롭다운 달고 기능구현
  return (
    <li css={listItemStyle} onClick={onOpenDetail}>
      <ImageBox imageUrl={product.imageUrl} size="l" />
      <div className="text-area">
        <div className="text-area__information">
          <div className="text-area__information-title">
            <span>{product.name}</span>
            {isAuthor && (
              <Button variant="text" onClick={() => {}}>
                <Dots />
              </Button>
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
