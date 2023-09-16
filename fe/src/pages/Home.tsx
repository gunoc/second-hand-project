import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Plus } from '@assets/plus.svg';
import { Button } from '@components/common/button/Button';
import { Dropdown } from '@components/common/dropdown/Dropdown';
import { ListBox } from '@components/common/list/ListBox';
import { ListItem } from '@components/common/list/ListItem';
import { MenuBox } from '@components/common/menu/MenuBox';
import { MenuItem } from '@components/common/menu/MenuItem';
import { LocationModal } from '@components/common/modal/locationModal/LocationModal';
import { LeftButton } from '@components/common/topBar/LeftButton';
import { RightButton } from '@components/common/topBar/RightButton';
import { TopBar } from '@components/common/topBar/TopBar';
import { ChevronDown, LayoutGrid } from '@components/common/icons';
import { Theme, css } from '@emotion/react';
import { SkeletonListItem } from '@components/common/skeleton/listItem';
import { Category } from '@components/home/Category';
import { useCategories } from '@/queries/category';
import { useIntersectionObserver } from '@hooks/useObserver';
import { useDeleteProduct, useProducts } from '@/queries/products';
import { useAuth } from '@hooks/useAuth';
import { modifiedLocationName } from '@utils/modifyLocationName';
import { useLayoutStore } from '@/stores/layoutStore';
import { useMyLocations } from '@/queries/location';
import { Alert } from '@/components/common/alert/Alert';
import { AlertContent } from '@/components/common/alert/AlertContent';
import { AlertButtons } from '@/components/common/alert/AlertButtons';
import { useAlert, useModal } from '@/hooks/usePopups';
import { PATH } from '@/constants/path';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const { isLogin } = useAuth();
  const { setShouldSlideLeft } = useLayoutStore();
  const { onOpenModal } = useModal();
  const { alertSource, currentDim, onOpenAlert, onCloseAlert } = useAlert();
  const { serverLocations } = useMyLocations(isLogin);
  const { categories } = useCategories();
  const deleteProductMutation = useDeleteProduct('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined | null
  >(null);

  const [selectProduct, setSelectProduct] = useState<ProductType | null>(null);
  const serverLocationsFetchedRef = useRef(false);

  // selectedLocationId 초기값 설정
  const mainLocation = serverLocations?.find(
    (location) => location.isMainLocation,
  );
  const initialLocationId = serverLocationsFetchedRef.current
    ? mainLocation?.id
    : 1;
  const [selectedLocationId, setSelectedLocationId] = useState<
    number | undefined
  >(initialLocationId);

  const {
    products,
    fetchNextPage,
    hasNextPage,
    status: productStatus,
    isFetchingNextPage,
    refetch: refetchProductList,
  } = useProducts(selectedLocationId, selectedCategoryId);

  const { observeTarget } = useIntersectionObserver({
    inviewCallback: () => {
      fetchNextPage();
    },
    condition: hasNextPage,
  });

  useEffect(() => {
    // serverLocations 데이터가 처음 로드되었을 때만 실행
    if (serverLocations && !serverLocationsFetchedRef.current) {
      const mainLocId = serverLocations.find(
        (location) => location.isMainLocation,
      )?.id;
      mainLocId && setSelectedLocationId(mainLocId);
      refetchProductList(); // 초기 데이터 로드 시에만 refetch
      serverLocationsFetchedRef.current = true;
    }
  }, [serverLocations]);

  const onOpenDetail = (id: number) => {
    navigate(`/detail/${id}`);
  };

  const onOpenCategory = () => {
    setShouldSlideLeft();
  };

  const onSelectLocation = (id: number) => {
    setSelectedLocationId(id);
    refetchProductList();
  };

  const onSelectCategory = (id: number) => {
    setSelectedCategoryId(id);
    refetchProductList();
  };

  const onAlertOpen = (product: ProductType) => {
    onOpenAlert('product');
    setSelectProduct(product);
  };

  const onDeleteProduct = (id?: number) => {
    if (!id) return;
    onCloseAlert({ currentDim: null });
    deleteProductMutation.mutate(id);
  };

  const renderSkeletons = (length: number) => {
    return Array.from({ length }).map((_, index) => (
      <SkeletonListItem key={index} />
    ));
  };

  const shouldShowSkeletons = productStatus === 'loading' || isFetchingNextPage;
  const shouldShowEndOfData =
    !hasNextPage && productStatus !== 'loading' && productStatus !== 'error';

  const selectedLocation = serverLocations?.find(
    (location) => location.id === selectedLocationId,
  );

  const mainLocationName =
    isLogin && selectedLocation
      ? modifiedLocationName(selectedLocation.name)
      : modifiedLocationName('역삼1동');

  const locations = isLogin
    ? serverLocations
    : [{ id: 1, name: '역삼1동', isMainLocation: true }];

  return (
    <>
      <div css={(theme) => pageStyle(theme, shouldShowSkeletons)}>
        <>
          <TopBar>
            <RightButton>
              <Button
                variant="text"
                className="button__topbar"
                onClick={onOpenCategory}
              >
                <LayoutGrid />
              </Button>
            </RightButton>
            <LeftButton>
              <Dropdown
                opener={
                  <Button
                    variant="text"
                    className="button__topbar"
                    disabled={!serverLocations}
                  >
                    {mainLocationName}
                    <ChevronDown />
                  </Button>
                }
                menu={
                  <MenuBox>
                    {/* {locationStatus === 'loading' && (
                      <MenuItem>로딩스피너</MenuItem>
                    )}
                    {locationStatus === 'error' && (
                      <MenuItem>동네 정보를 가져오지 못했습니다</MenuItem>
                    )} */}
                    {locations &&
                      locations.map((location) => (
                        <MenuItem
                          key={location.id}
                          state={
                            selectedLocationId === location.id
                              ? 'selected'
                              : 'default'
                          }
                          onClick={() => onSelectLocation(location.id)}
                        >
                          {location.name}
                        </MenuItem>
                      ))}
                    {isLogin && (
                      <MenuItem onClick={onOpenModal}>
                        내 동네 설정하기
                      </MenuItem>
                    )}
                  </MenuBox>
                }
              />
            </LeftButton>
            <RightButton>
              <Button
                variant="text"
                className="button__topbar"
                onClick={onOpenCategory}
              >
                <LayoutGrid />
              </Button>
            </RightButton>
          </TopBar>
          <Button
            variant="fab"
            size="l"
            className="button__add"
            onClick={() => navigate(PATH.newProduct)}
          >
            <Plus />
          </Button>
          <ListBox>
            {productStatus === 'error' && (
              <div className="data-status-info">
                상품을 불러오지 못했어요!
                <br />
                연결을 확인해주세요
              </div>
            )}

            {products?.map((product) => (
              <ListItem
                key={product.id}
                product={product}
                onOpenDetail={() => onOpenDetail(product.id)}
                onAlertOpen={() => onAlertOpen(product)}
              />
            ))}

            {shouldShowSkeletons && <>{renderSkeletons(10)}</>}
          </ListBox>
          {shouldShowEndOfData && (
            <div className="data-status-info">전부 살펴 봤어요!</div>
          )}
          <LocationModal locationList={serverLocations} />
          <div ref={observeTarget} css={obseverStyle}></div>
        </>
      </div>

      <Alert isOpen={alertSource === 'product'} currentDim={currentDim}>
        <AlertContent>'{selectProduct?.name}'을 삭제하시겠어요?</AlertContent>
        <AlertButtons
          buttonText="취소"
          onDelete={() => onDeleteProduct(selectProduct?.id)}
        />
      </Alert>

      <Category categories={categories} onSelectCategory={onSelectCategory} />
    </>
  );
};

const pageStyle = (theme: Theme, shouldShowSkeletons: boolean) => {
  return css`
    overflow-y: ${shouldShowSkeletons ? 'hidden' : 'auto'};

    scroll-behavior: smooth;
    ::-webkit-scrollbar {
      display: none;
    }
    height: 100vh;

    .button__topbar {
      stroke: ${theme.color.neutral.textStrong};
    }

    .button__add {
      position: absolute;
      bottom: 88px;
      right: 24px;
      z-index: 1;
      stroke: ${theme.color.accent.text};
    }

    .data-status-info {
      cursor: default;
      text-align: center;
      width: 100%;
      padding: 30px 0px 100px 0px;
      font: ${theme.font.displayDefault16};
    }
  `;
};

const obseverStyle = css`
  height: 20px;
  width: 100%;
`;
