import { useQuery, useZero } from "@rocicorp/zero/react";
import { Schema, Contact } from "./schema";

export const SalesInput = ({ contact }: { contact: Contact }) => {
  const z = useZero<Schema>();
  const [sales] = useQuery(z.query.sales);

  const onChange = (sales_id: string) => {
    z.mutate.contacts.update({
      id: contact.id,
      sales_id: parseInt(sales_id, 10),
    });
  };

  return (
    <select
      value={contact.sales_id}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      {sales.map((sale) => (
        <option key={sale.id} value={sale.id}>
          {sale.first_name} {sale.last_name}
        </option>
      ))}
    </select>
  );
};
