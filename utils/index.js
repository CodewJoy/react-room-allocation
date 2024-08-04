export const getDefaultRoomAllocation = ({ guest, rooms }) => {
  const { adult: totalAdults, child: totalChildren } = guest;
  const n = rooms.length;

  // dp[a][c][i] represents the minimum cost to allocate 'a' adults and 'c' children to the first 'i' rooms
  const dp = Array(totalAdults + 1)
    .fill()
    .map(() =>
      Array(totalChildren + 1)
        .fill()
        .map(() => Array(n + 1).fill(Infinity))
    );

  // memo to store allocations
  const memo = Array(totalAdults + 1)
    .fill(null)
    .map(() =>
      Array(totalChildren + 1)
        .fill(null)
        .map(() => Array(n + 1).fill(null))
    );

  // Initialize the starting point with 0 cost
  dp[0][0][0] = 0;

  for (let i = 0; i < n; i++) {
    const room = rooms[i];
    for (let a = 0; a <= totalAdults; a++) {
      for (let c = 0; c <= totalChildren; c++) {
        if (dp[a][c][i] < Infinity) {
          for (
            let na = 0;
            na <= Math.min(room.capacity, totalAdults - a);
            na++
          ) {
            for (
              let nc = 0;
              nc <= Math.min(room.capacity - na, totalChildren - c);
              nc++
            ) {
              if (nc > 0 && na === 0) continue; // skip invalid cases where children are alone
              const newPrice =
                dp[a][c][i] +
                room.roomPrice +
                na * room.adultPrice +
                nc * room.childPrice;
              // dp[a][c][i] represents the minimum cost of allocating a adults and c children to the first i rooms.
              if (newPrice < dp[a + na][c + nc][i + 1]) {
                dp[a + na][c + nc][i + 1] = newPrice;
                memo[a + na][c + nc][i + 1] = { na, nc, roomIndex: i };
              }
            }
          }
        }
      }
    }
  }

  const result = [];
  let totalPrice = dp[totalAdults][totalChildren][n];

  // If no valid allocation found
  if (totalPrice === Infinity) {
    return {
      defaultRooms: rooms.map(() => ({ adult: 0, child: 0, price: 0 })),
      totalPrice: 0,
    };
  }

  // Trace back the solution to find the allocation
  let a = totalAdults;
  let c = totalChildren;
  for (let i = n; i > 0; i--) {
    const allocation = memo[a][c][i];
    if (allocation) {
      const { na, nc, roomIndex } = allocation;
      result.push({
        adult: na,
        child: nc,
        price:
          rooms[roomIndex].roomPrice +
          na * rooms[roomIndex].adultPrice +
          nc * rooms[roomIndex].childPrice,
      });
      a -= na;
      c -= nc;
    }
  }

  return { defaultRooms: result.reverse(), totalPrice };
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
