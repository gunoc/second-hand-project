import { Theme, css } from '@emotion/react';
import { useCategoryExample } from '@hooks/useCategoryExample';
import { useModal } from '@hooks/usePopups';
import { Button } from '../common/button/Button';
import { ChevronRight } from '../common/icons';

type Props = {
  categories?: CategoryType[];
  selectedCategory?: CategoryType;
  onSelectCategory: (id: number) => void;
};

export const CategorySelector: React.FC<Props> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: Props) => {
  const { onOpenModal: openCategoryModal } = useModal();
  const { categoryExamples } = useCategoryExample({
    categories,
    selectedCategory,
  });

  if (!categories) {
    return <div>...카테고리 로딩중</div>;
  }

  return (
    <div css={(theme) => categorySelectorStyle(theme)}>
      <ul className="categories__container">
        {categoryExamples.map((category) => (
          <li key={category.id}>
            <Button
              variant="category"
              state={
                selectedCategory?.id === category.id ? 'active' : 'default'
              }
              onClick={() => onSelectCategory(category.id)}
            >
              {category.name}
            </Button>
          </li>
        ))}
      </ul>
      <Button variant="text" className="more-btn" onClick={openCategoryModal}>
        <ChevronRight />
      </Button>
    </div>
  );
};

const categorySelectorStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .categories__container {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .more-btn > svg {
    stroke: ${theme.color.neutral.textStrong};
  }
`;
