import { checkNickname, signup } from '@/api/api';
import { QUERY_KEY } from '@/constants/querykey';
import { setTokens, setUserInfo } from '@/utils/localStorage';
import { useMutation, useQuery } from 'react-query';

export const useCheckNickname = (nickname: string) => {
  const {
    data: nicknameCheck,
    status,
    error,
    refetch: refetchNicknameCheck,
  } = useQuery(
    [QUERY_KEY.nicknameCheck, nickname],
    () => checkNickname(nickname),
    {
      enabled: false,
      retry: false,
    },
  );

  return { nicknameCheck, status, error, refetchNicknameCheck };
};

export const useSignup = () => {
  const {
    mutate: signupWithInfo,
    status,
    error,
  } = useMutation(signup, {
    onSuccess: ({ data }) => {
      setUserInfo(data.user);
      setTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        throw error;
      }
    },
  });

  return { signupWithInfo, status, error };
};
