type PickOptions<T> = {
  array: T[];
  count: number;
};

export const getRandomElementsFromArray = <T>(options: PickOptions<T>): T[] => {
  const { array, count } = options;
  const copyArray = [...array];
  const pickedArray = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * copyArray.length);
    pickedArray.push(copyArray[randomIndex]);
    copyArray.splice(randomIndex, 1);
  }

  return pickedArray;
};
