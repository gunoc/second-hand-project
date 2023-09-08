import { checkNickname, login, logout, refreshToken, signup } from "@/api/api";
import { QUERY_KEY } from "@/constants/queryKey";
import { getRefreshToken, setLoginInfo } from "@/utils/localStorage";
import { useMutation, useQuery } from "react-query";

export const useCheckNickname = (nickname: string) => {
  const { data, status, error, refetch } = useQuery(
    [QUERY_KEY.nicknameCheck, nickname],
    () => checkNickname(nickname),
    {
      enabled: false,
      retry: false,
    },
  );

  return { data, status, error, refetch };
};

export const useSignup = () => {
  const { mutate, status, error } = useMutation(
    (userInfo: {
      nickname: string;
      mainLocationId: number;
      subLocationId?: number;
    }) => signup(userInfo),
    {
      onSuccess: ({ data }) => {
        setLoginInfo(data);
      },
      onError: (error) => {
        if (error instanceof Error) {
          throw error;
        }
      },
    },
  );

  return { mutate, status, error };
};

export const useLogin = (
  code: string,
  onLogin: (
    data:
      | {
          isUser: false;
          accessToken: string;
        }
      | {
          isUser: true;
          accessToken: string;
          refreshToken: string;
          user: UserType;
        },
  ) => void,
  onLoginFail: () => void,
) => {
  const { mutate, status, error } = useMutation(() => login(code), {
    onSuccess: ({ success, data }) => {
      if (!success) {
        onLoginFail();
      }
      onLogin(data);
    },
  });

  return { mutate, status, error };
};

export const useLogout = (onLogout: () => void) => {
  const { mutate, status, error } = useMutation(() => logout(), {
    onSuccess: () => {
      onLogout();
    },
  });

  return { mutate, status, error };
};

export const useTokenRefresh = () => {
  const { data, status, error } = useQuery(
    QUERY_KEY.tokenRefresh,
    refreshToken,
    {
      refetchInterval: 1000 * 60 * 60,
      refetchIntervalInBackground: true,
      enabled: !!getRefreshToken(),
      select: (data) => {
        if (data.success) {
          return data.data.accessToken;
        }
      },
    },
  );

  return { data, status, error };
};
