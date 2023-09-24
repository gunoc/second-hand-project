import { useAuth } from '@hooks/useAuth';
import { useMyLocations } from '@queries/location';
import { useEffect, useState } from 'react';

type LocationSelectorType = {
  initialLocation?: LocationType;
};

export const useLocationSelector = ({
  initialLocation,
}: LocationSelectorType) => {
  const [selectedLocation, setSelectedLocation] = useState<
    LocationType | undefined
  >(initialLocation);
  const { isLogin } = useAuth();
  const { serverLocations } = useMyLocations(isLogin);

  useEffect(() => {
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

  useEffect(() => {
    if (!initialLocation) {
      return;
    }

    setSelectedLocation(initialLocation);
  }, [initialLocation]);

  const selectLocation = (location: LocationType | undefined) => {
    if (!location) {
      return;
    }

    setSelectedLocation(location);
  };

  return {
    selectedLocation,
    selectLocation,
    locations: serverLocations,
  };
};
