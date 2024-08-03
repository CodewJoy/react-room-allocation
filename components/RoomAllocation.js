import { getDefaultRoomAllocation } from "../utils";
import InputNumber from "./InputNumber";

export default function RoomAllocation() {
  const guest = { adult: 4, child: 2 };
  const rooms = [
    { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
    { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
    { roomPrice: 500, adultPrice: 300, childPrice: 200, capacity: 4 },
  ];

  const { defaultRooms, totalPrice } = getDefaultRoomAllocation({
    guest,
    rooms,
  });
  console.log(defaultRooms, totalPrice);
  return (
    <div>
      <InputNumber />
    </div>
  );
}
