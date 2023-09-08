import {
  deleteLocation,
  getLocationWithQuery,
  getMyLocations,
  patchMainLocation,
} from '@api/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const useMyLocations = () => {
  const {
    data: locations,
    status,
    error,
  } = useQuery<LocationDataFromServer, unknown, LocationType[]>(
    QUERY_KEY.locations,
    getMyLocations,
    {
      select: (data) => data.data,
    },
  );

  return { locations, status, error };
};

export const useLocationWithQuery = (query: string) => {
  const {
    data: locations,
    status,
    error,
    refetch,
  } = useQuery<
    LocationWithQueryDataFromServer,
    unknown,
    LocationWithQueryType[]
  >([QUERY_KEY.locations, query], () => getLocationWithQuery(query), {
    enabled: false,
    select: (data) => data.data,
  });
  return { locations, status, error, refetch };
};

export const useDeleteLocation = () => {
  const queryClient = useQueryClient();
  const deleteLocationMutation = useMutation(deleteLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.locations);
    },
  });

  const deleteLocationById = (id: number) => {
    deleteLocationMutation.mutate(id);
  };

  return deleteLocationById;
};

export const usePatchMainLocation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  const patchMainLocationMutation = useMutation(patchMainLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.locations);
      onSuccessCallback?.();
    },
  });

  const patchMainLocationById = (location: LocationType) => {
    patchMainLocationMutation.mutate(location.id);
  };

  return { patchMainLocationById };
};

