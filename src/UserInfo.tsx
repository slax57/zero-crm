import { useQuery, useZero } from "@rocicorp/zero/react";
import { Schema } from "./schema";

export const UserInfo = () => {
  const z = useZero<Schema>();
  const sales = useQuery(z.query.sales.where("user_id", "=", z.userID).one());
  return (
    <div>
      Currently logged in as {sales[0]?.first_name} {sales[0]?.last_name}
    </div>
  );
};
