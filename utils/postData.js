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

  // return new Promise((resolve, reject) => {
  //   const response = await fetch(url, requestOptions);
  //   const result = response.json();
  // })
  //   .then((res) => {
  //     resolve(res);
  //   })
  //   .catch((err) => console.log(err));
};
