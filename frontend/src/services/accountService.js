export const getAccounts = async () => {
  const response = await fetch("http://localhost:5000/api/accounts");
  if (!response.ok) throw new Error("Network response was not ok");
  return await response.json();
};

export const createAccount = async (account) => {
  const response = await fetch("http://localhost:5000/api/accounts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(account)
  });
  if (!response.ok) throw new Error("Failed to create account");
  return await response.json();
};

export const updateAccount = async (id, account) => {
  const response = await fetch(`http://localhost:5000/api/accounts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(account)
  });
  if (!response.ok) throw new Error("Failed to update account");
  return await response.json();
};

export const deleteAccount = async (id) => {
  const response = await fetch(`http://localhost:5000/api/accounts/${id}`, {
    method: "DELETE"
  });
  if (!response.ok) throw new Error("Failed to delete account");
  return await response.json();
};
