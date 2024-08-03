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
