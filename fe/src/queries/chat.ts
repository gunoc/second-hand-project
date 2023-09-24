import { getChatRooms, getUnreadTotalCount } from '@api/api';
import { QUERY_KEY } from '@constants/queryKey';
import { useQuery } from 'react-query';

export const useChatRooms = () => {
  const {
    data: chatRooms,
    status,
    error,
  } = useQuery<ChatRoomsDataFromServer, unknown, ChatRoomType[]>(
    QUERY_KEY.chatRooms,
    getChatRooms,
    {
      select: (data) => data.data,
    },
  );

  return { chatRooms, status, error };
};

export const useUnreadTotalCount = () => {
  // const { chatRooms } = useChatRooms();

  // const unreadTotalCount = chatRooms?.reduce((acc, cur) => {
  //   return acc + cur.unreadChatCount;
  // }, 0); // 메모?

  // return { unreadTotalCount };

  const { data: unreadTotalCount } = useQuery<
    UnreadTotalFromServer,
    unknown,
    UnreadTotalCountType
  >(QUERY_KEY.unreadTotalCount, getUnreadTotalCount, {
    select: (data) => data.data,
  });
  return { unreadTotalCount };
};
