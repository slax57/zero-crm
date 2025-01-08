import { useQuery, useZero } from "@rocicorp/zero/react";
import { Schema } from "./schema";

function App() {
  const z = useZero<Schema>();
  const [contacts] = useQuery(z.query.contacts);

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
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td align="left">{contact.id}</td>
              <td align="left">{contact.first_name}</td>
              <td align="left">{contact.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
