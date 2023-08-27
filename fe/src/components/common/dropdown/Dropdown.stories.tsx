import { MenuBox } from '@components/common/menu/MenuBox';
import { MenuItem } from '@components/common/menu/MenuItem';
import type { Meta, StoryObj } from '@storybook/react';
import { Backdrop } from './Backdrop';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Example/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    align: {
      control: {
        type: 'select',
        options: ['left', 'right'],
      },
    },
    autoClose: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dropdown>
      <button>열기</button>
      <MenuBox>
        <MenuItem>옵션1</MenuItem>
        <MenuItem>옵션2</MenuItem>
        <MenuItem>옵션3</MenuItem>
      </MenuBox>
    </Dropdown>
  ),
};

export const NotRender: Story = {
  render: () => (
    <Dropdown>
      <button>열기</button>
      <Backdrop />
    </Dropdown>
  ),
};

export const AlignRight: Story = {
  render: () => (
    <Dropdown align="right">
      <button>열기</button>
      <MenuBox>
        <MenuItem>옵션1</MenuItem>
        <MenuItem>옵션2</MenuItem>
        <MenuItem>옵션3</MenuItem>
      </MenuBox>
    </Dropdown>
  ),
};

export const AutoClose: Story = {
  render: () => (
    <Dropdown autoClose>
      <button>열기</button>
      <MenuBox>
        <MenuItem>옵션1</MenuItem>
        <MenuItem>옵션2</MenuItem>
        <MenuItem>옵션3</MenuItem>
      </MenuBox>
    </Dropdown>
  ),
};
