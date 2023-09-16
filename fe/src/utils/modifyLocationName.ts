export const modifiedLocationName = (locationName: string) => {
  const splitedParts = locationName.split(' ');
  return splitedParts[splitedParts.length - 1];
};
