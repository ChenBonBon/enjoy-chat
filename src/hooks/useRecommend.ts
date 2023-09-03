import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';

export default function useRecommend(userId: number, friendIds: number[]) {
  const recommendUsers = useLiveQuery(async () => {
    return db.users
      .where('id')
      .notEqual(userId)
      .and((item) => !friendIds.includes(item.id!))
      .limit(10 - (friendIds ?? []).length)
      .toArray();
  }, [friendIds]);

  return { recommendUsers };
}
