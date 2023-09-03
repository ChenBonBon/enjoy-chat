import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import { db } from "../db";

export default function useFriends(userId: number) {
  const [friendIds, setFriendIds] = useState<number[]>([]);

  const relations = useLiveQuery(async () => {
    return db.userRelations.where("from").equals(userId).toArray();
  }, [userId]);

  const friends = useLiveQuery(async () => {
    return db.users.where("id").anyOf(friendIds).toArray();
  }, [friendIds]);

  useEffect(() => {
    const friendIds = (relations ?? []).map((relation) => relation.to);
    setFriendIds(friendIds);
  }, [relations]);

  return { friends, friendIds };
}
