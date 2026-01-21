const setCookie = (name, value, days = 7) => {
  try {
    const json = JSON.stringify(value);
    const expires = new Date(
      Date.now() + days * 864e5
    ).toUTCString();

    document.cookie = `${name}=${encodeURIComponent(
      json
    )}; expires=${expires}; path=/`;
  } catch (err) {
    console.error("Failed to set cookie:", err);
  }
};

const getCookie = (name) => {
  try {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );

    if (!match) return null;

    return JSON.parse(decodeURIComponent(match[2]));
  } catch (err) {
    console.error("Failed to read cookie:", err);
    return null;
  }
};


export {setCookie,getCookie};
