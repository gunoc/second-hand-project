import { Theme, css } from '@emotion/react';
import { BezeledX } from '../common/icons';
import { ImageBox, ImageBoxProps } from '../common/imageBox/ImageBox';

type Props = {
  label?: string;
  onClick?: () => void;
} & ImageBoxProps;

export const ImageItem: React.FC<Props> = ({ label, onClick, ...rest }) => {
  return (
    <div css={(theme) => pictureItemStyle(theme)} onClick={onClick}>
      <ImageBox {...rest} />
      <button type="button" className="picture-item__remove-btn">
        <BezeledX />
      </button>
      {label && <div className="picture-item__label">{label}</div>}
    </div>
  );
};

const pictureItemStyle = (theme: Theme) => css`
  position: relative;

  & .picture-item__remove-btn {
    position: absolute;
    right: -8px;
    top: -8px;
    width: 28px;
    height: 28px;

    & > svg {
      fill: ${theme.color.neutral.textStrong};
    }
  }

  & .picture-item__label {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0px 0px 16px 16px;
    background: ${theme.color.neutral.overlay};
    font: ${theme.font.displayDefault12};
    color: ${theme.color.neutral.background};
  }

  &:hover,
  &:active {
    opacity: 0.8;
    cursor: pointer;
  }
`;
