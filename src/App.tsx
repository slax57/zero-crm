import { useQuery, useZero } from "@rocicorp/zero/react";
import { Schema } from "./schema";

function App() {
  const z = useZero<Schema>();
  const [contacts] = useQuery(
    z.query.contacts.related("sales", (sales) => sales.one())
  );

  const toggleNewsletter = (id: number, prev: boolean) => {
    z.mutate.contacts.update({
      id,
      has_newsletter: !prev,
    });
  };

  // If initial sync hasn't completed, these can be empty.
  if (!contacts.length) {
    return null;
  }

  return (
    <>
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
                {contact.sales?.first_name} {contact.sales?.last_name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
