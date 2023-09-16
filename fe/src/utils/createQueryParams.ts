export const createQueryParams = (params: FetchProductsParams) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  return query.toString();
};

// if (params.next !== undefined && params.next !== null) {
//   query.append('next', String(params.next));
// }
