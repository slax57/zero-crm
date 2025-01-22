import { useQuery, useZero } from "@rocicorp/zero/react";
import { Schema } from "./schema";
import { SalesInput } from "./SalesInput.tsx";
import { useState } from "react";

export const ContactList = () => {
  const z = useZero<Schema>();
  const [onlyMine, setOnlyMine] = useState(false);
  const contactsQuery = z.query.contacts.related("sales", (sales) =>
    sales.one()
  );
  const [allContacts] = useQuery(contactsQuery);
  const onlyMyContactsQuery = contactsQuery.whereExists("sales", (q) =>
    q.where("user_id", "=", z.userID)
  );
  const [onlyMyContacts] = useQuery(onlyMyContactsQuery);
  const contacts = onlyMine ? onlyMyContacts : allContacts;

  const toggleNewsletter = (id: number, prev: boolean) => {
    z.mutate.contacts.update({
      id,
      has_newsletter: !prev,
    });
  };

  const toggleOnlyMine = () => {
    setOnlyMine((onlyMine) => !onlyMine);
  };

  // If initial sync hasn't completed, these can be empty.
  if (!contacts.length) {
    return null;
  }

  return (
    <>
      <label htmlFor="onlyMyContacts">Only show my contacts</label>
      <input
        id="onlyMyContacts"
        type="checkbox"
        checked={onlyMine}
        onChange={toggleOnlyMine}
      />
      <table border={1} cellSpacing={0} cellPadding={6} width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Newsletter</th>
            <th>Sales</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td align="left">{contact.id}</td>
              <td align="left">{contact.first_name}</td>
              <td align="left">{contact.last_name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={contact.has_newsletter}
                  onChange={() => {
                    toggleNewsletter(contact.id, contact.has_newsletter);
                  }}
                />
              </td>
              <td align="left">
                <SalesInput contact={contact} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
