import { getRandomElementsFromArray } from '@/utils/getRandomElementsFromArray';
import { useEffect, useState } from 'react';

type CategoryExampleType = {
  categories?: CategoryType[];
  selectedCategory?: CategoryType;
};

export const useCategoryExample = ({
  categories,
  selectedCategory,
}: CategoryExampleType) => {
  const [categoryExamples, setCategoryExamples] = useState<CategoryType[]>([]);

  useEffect(() => {
    if (!categories) {
      return;
    }

    if (!selectedCategory && categoryExamples.length === 0) {
      const randomCategories = getRandomElementsFromArray({
        array: categories,
        count: 3,
      });
      setCategoryExamples(randomCategories);
      return;
    }

    if (selectedCategory && categoryExamples.length === 0) {
      const randomCategories = getRandomElementsFromArray({
        array: categories.filter(
          (category) => category.id !== selectedCategory.id,
        ),
        count: 2,
      });
      setCategoryExamples([selectedCategory, ...randomCategories]);
    }

    if (selectedCategory && categoryExamples.length > 0) {
      const isSelectedCategoryInExamples = categoryExamples.some(
        (example) => example.id === selectedCategory.id,
      );
      if (isSelectedCategoryInExamples) {
        return;
      }

      setCategoryExamples([selectedCategory, ...categoryExamples.slice(0, 2)]);
    }
  }, [categories, selectedCategory, categoryExamples]);

  return {
    categoryExamples,
  };
};
