const baseUrl = "http://localhost:3030/jsonstore/users";

export const getAll = async () => {
  const res = await fetch(baseUrl);
  const users = await res.json();

  const data = Object.values(users);

  return data;
};

export const create = async (data) => {
  const body = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    imageUrl: data.imageUrl,
    phoneNumber: data.phoneNumber,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toDateString(),
    address: {
      country: data.country,
      city: data.city,
      street: data.street,
      streetNumber: data.streetNumber,
    },
  };

  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await res.json();
  return result;
};

export const getOne = async (id) => {
  const res = await fetch(`${baseUrl}/${id}`);
  const foundUser = await res.json();

  return foundUser;
};

export const remove = async (id) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
  const result = await res.json();

  return result;
};
