import { useRegisteredLocationsStore } from '@/store/locationStore';
import { useAuth } from './useAuth';
import {
  useDeleteLocation,
  useMyLocations,
  usePatchMainLocation,
} from './location';

export const useLocationControl = (onPatchMainLocation?: () => void) => {
  const { isLogin } = useAuth();
  const { locations } = useMyLocations();
  const { patchMainLocationById } = usePatchMainLocation(onPatchMainLocation);
  const deleteLocationById = useDeleteLocation();
  const { locationList, addLocation, deleteLocation } =
    useRegisteredLocationsStore();

  if (isLogin) {
    return {
      locations,
      patchMainLocationById,
      deleteLocationById,
    };
  }

  return {
    locations: locationList,
    patchMainLocationById: addLocation,
    deleteLocationById: deleteLocation,
  };
};
