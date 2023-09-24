import { Theme, css } from '@emotion/react';
import { useAlert } from '@hooks/usePopups';
import { Button } from '../button/Button';

type Props = {
  buttonText: '취소' | '닫기';
  onDelete?: () => void;
};

export const AlertButtons: React.FC<Props> = ({ buttonText, onDelete }) => {
  const { onCloseAlert } = useAlert();

  return (
    <div css={alertButtonsStyle}>
      <Button
        variant="text"
        onClick={() => onCloseAlert({ currentDim: 'modal' })}
      >
        {buttonText}
      </Button>
      {onDelete && (
        <Button className="delete-button" variant="text" onClick={onDelete}>
          삭제
        </Button>
      )}
    </div>
  );
};

const alertButtonsStyle = (theme: Theme) => {
  return css`
    display: flex;
    padding: 24px 32px;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
    align-self: stretch;

    .delete-button {
      color: ${theme.color.system.warning};
    }
  `;
};
