export const updateData = async (url, payload) => {
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      return response.ok;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  