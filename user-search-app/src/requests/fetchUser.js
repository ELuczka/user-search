export const fetchUser = async (url) => {
    const errorMessage = "Something went wrong on the backend side.";
  
    const apiCall = await fetch(url).then((resp) => {
      if (resp.status >= 400 && resp.status < 600) {
        throw new Error(errorMessage);
      }
      return resp;
    });
    const data = await apiCall.json();
    return { data };
  };