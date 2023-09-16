import { useAuth } from '@/hooks/useAuth';
import { useMyLocations } from '@/queries/location';
import { useEffect, useState } from 'react';

type LocationSelectorType = {
  initialLocation?: LocationType;
}

export const useLocationSelector = ({ initialLocation }: LocationSelectorType) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationType | undefined>(initialLocation);
  const { isLogin } = useAuth();
  const { serverLocations } = useMyLocations(isLogin);

  useEffect(() => {
    // 사용자 동네를 못 가져오거나, 이미 선택된 동네가 있으면 return
    if (!serverLocations || selectedLocation) {
      return;
    }

    const mainLocation = serverLocations.find(
      (location) => location.isMainLocation,
    );

    if (!mainLocation) {
      return;
    }

    setSelectedLocation(mainLocation);
  }, [serverLocations, selectedLocation]);

  const selectLocation = (location: LocationType) => {
    setSelectedLocation(location);
  };

  return {
    selectedLocation,
    selectLocation,
    locations: serverLocations,
  };
};
