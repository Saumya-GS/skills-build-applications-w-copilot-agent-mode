import { useEffect, useState } from 'react';

const Users = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME || import.meta.env.CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users`
    : `${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/users`;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const res = await fetch(endpoint);
        const json = await res.json();
        if (Array.isArray(json)) setUsers(json);
        else if (json.items && Array.isArray(json.items)) setUsers(json.items);
        else if (json.data && Array.isArray(json.data)) setUsers(json.data);
        else setUsers([]);
      } catch (err) {
        console.error('Failed to load users', err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [endpoint]);

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h1>Users</h1>
      <ul className="list-group">
        {users.map((u) => (
          <li key={u._id || u.id} className="list-group-item">
            {u.name} — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
