import {
  deleteLocation,
  getLocationWithQuery,
  getMyLocations,
  patchMainLocation,
} from '@/api/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQueryClient, useMutation, useQuery } from 'react-query';

export const useMyLocations = () => {
  const {
    data: locations,
    status,
    error,
  } = useQuery<LocationType[]>(QUERY_KEY.locations, getMyLocations);

  return { locations, status, error };
};

export const useLocationWithQuery = (query: string) => {
  // 엔터 칠때만 요청함
  const {
    data: locations,
    status,
    error,
    refetch,
    remove,
  } = useQuery<LocationType[]>(
    [QUERY_KEY.locations, query],
    () => getLocationWithQuery(query),
    {
      enabled: false,
    },
  );
  return { locations, status, error, refetch, remove };
};

export const useDeleteLocation = () => {
  const queryClient = useQueryClient();
  const deleteLocationMutation = useMutation(deleteLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.locations);
      // 재조회함
      // 기존에 useQuery로 조회해온 데이터가 key를 통해 다시 조회가 되면서 데이터 변경
      // 드롭다운에도 변경이 반영돼야 하기 때문에 재조회로
    },
  });

  const deleteLocationById = (id: number) => {
    deleteLocationMutation.mutate(id);
  };
  // TODO 에러랑 로딩 추가할지 생각해보기

  return deleteLocationById;
};
// TODO mutation들을 합칠수가 있나?
export const usePatchMainLocation = () => {
  const queryClient = useQueryClient();
  const patchMainLocationMutation = useMutation(patchMainLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.locations);
    },
  });

  const patchMainLocationById = (id: number) => {
    patchMainLocationMutation.mutate(id);
  };

  return patchMainLocationById;
};
