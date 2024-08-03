export const getDefaultRoomAllocation = ({ guest, rooms }) => {
  const { adult: totalAdults, child: totalChildren } = guest;
  const n = rooms.length;

  // dp[a][c][i] 表示分配了 a 个成人和 c 个孩子到前 i 个房间的最小费用
  const dp = Array(totalAdults + 1)
    .fill(null)
    .map(() =>
      Array(totalChildren + 1)
        .fill(null)
        .map(() => Array(n + 1).fill(Infinity))
    );

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
              dp[a + na][c + nc][i + 1] = Math.min(
                dp[a + na][c + nc][i + 1],
                newPrice
              );
            }
          }
        }
      }
    }
  }
  // console.log("dp", dp);
  const result = [];
  let totalPrice = dp[totalAdults][totalChildren][n];
  if (totalPrice === Infinity) {
    return {
      defaultRooms: rooms.map((el) => ({ adult: 0, child: 0, price: 0 })),
      totalPrice: 0,
    };
  }

  let a = totalAdults;
  let c = totalChildren;
  for (let i = n - 1; i >= 0; i--) {
    const room = rooms[i];
    let found = false;
    for (let na = 0; na <= Math.min(room.capacity, a); na++) {
      for (let nc = 0; nc <= Math.min(room.capacity - na, c); nc++) {
        if (nc > 0 && na === 0) continue; // skip invalid cases where children are alone
        const newPrice =
          dp[a][c][i + 1] -
          (room.roomPrice + na * room.adultPrice + nc * room.childPrice);
        if (newPrice === dp[a - na][c - nc][i]) {
          result.push({
            adult: na,
            child: nc,
            price: room.roomPrice + na * room.adultPrice + nc * room.childPrice,
          });
          a -= na;
          c -= nc;
          found = true;
          break;
        }
      }
      if (found) break;
    }
  }
  // console.log(result.reverse(), totalPrice);
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
