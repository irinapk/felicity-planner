export const postData = async (data, url) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, requestOptions);
  const result = await response.json();
  return { response, result };
};
