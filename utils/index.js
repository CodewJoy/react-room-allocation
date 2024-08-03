export const getDefaultRoomAllocation = ({ guest, rooms }) => {
  const { adult: totalAdults, child: totalChildren } = guest;
  return {
    defaultRooms: [
      {
        adult: 3,
        child: 1,
        price: 1700,
      },
      {
        adult: 0,
        child: 0,
        price: 0,
      },
      {
        adult: 1,
        child: 1,
        price: 1000,
      },
    ],
    totalPrice: 2700,
  };
};

export const cloneDeep = (value) => {
  if (value === null || typeof value !== "object") {
    return value; // Return the value if it's not an object or is null
  }

  if (Array.isArray(value)) {
    // Handle arrays
    return value.map((item) => cloneDeep(item));
  }

  // Handle objects
  const result = {};
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      result[key] = cloneDeep(value[key]);
    }
  }
  return result;
};
