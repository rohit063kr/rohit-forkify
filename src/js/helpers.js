export const getJSON = async function (url) {
  try {
    const res = await fetch(url);
    const resData = await res.json();
    if (!res.ok) throw new Error("Recipe couldn't loaded");

    return resData;
  } catch (err) {
    throw err;
  }
};
