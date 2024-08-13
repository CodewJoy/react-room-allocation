export type Room = {
  roomPrice: number;
  adultPrice: number;
  childPrice: number;
  capacity: number;
};

export type Guest = {
  adult: number;
  child: number;
};

export type Allocation = {
  adult: number;
  child: number;
  price: number;
}[];

export type TestCase = {
  name: string;
  guest: Guest;
  rooms: Room[];
};