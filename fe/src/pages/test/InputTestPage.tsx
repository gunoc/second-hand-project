import { Button } from '@/components/common/button/Button';
import { Input } from '@/components/common/input/Input';
import { LeftButton } from '@/components/common/topBar/LeftButton';
import { RightButton } from '@/components/common/topBar/RightButton';
import { Title } from '@/components/common/topBar/Title';
import { TopBar } from '@/components/common/topBar/TopBar';
import { css } from '@emotion/react';
import { useState } from 'react';

export const InputTestPage: React.FC = () => {
  const [value, setValue] = useState('기존 내용');
  const [price, setPrice] = useState('' as string | number);

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const onPressEnter = () => {
    console.log('onPressEnter', value);
  };

  return (
    <div css={testPageStyle}>
      <TopBar>
        <Title>Page Name</Title>
        <LeftButton>
          <Button variant="text">뒤로</Button>
        </LeftButton>
        <RightButton>
          <Button variant="text">완료</Button>
        </RightButton>
      </TopBar>
      <h2>InputTestPage</h2>
      <Input variant="ghost" {...{ value, onChange, onPressEnter }} />
      <Input
        variant="ghost"
        label="₩"
        value={price}
        onChange={(newValue) => setPrice(newValue)}
        warningMessage="돈이 부족합니다!"
      />
    </div>
  );
};

const testPageStyle = css`
  height: 200vh;
`;
