import React, { useState } from "react";
import styled from "@emotion/styled";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import RoomAllocation from "../components/RoomAllocation";

const inter = Inter({ subsets: ["latin"] });

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButton = styled.button`
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  margin: 4px;
  border-radius: 4px;
  color: rgb(30, 159, 210);
  background-color: white;
  border: 1px solid rgb(30, 159, 210);
  ${({ $focus }) =>
    $focus &&
    `color: white;
  background-color: rgb(30, 159, 210);`}
`;

const testCases = [
  {
    name: "Test Case 1",
    guest: { adult: 4, child: 2 },
    rooms: [
      { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
      { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
      { roomPrice: 500, adultPrice: 300, childPrice: 200, capacity: 4 },
    ],
  },
  {
    name: "Test Case 2",
    guest: { adult: 16, child: 0 },
    rooms: [
      { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
      { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
      { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
      { roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 },
    ],
  },
  {
    name: "Test Case 3",
    guest: { adult: 0, child: 1 },
    rooms: [
      { roomPrice: 1000, adultPrice: 500, childPrice: 300, capacity: 2 },
      { roomPrice: 500, adultPrice: 400, childPrice: 300, capacity: 4 },
      { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
    ],
  },
];

export default function Home() {
  const [stateTestCase, setTestCase] = useState(testCases[0]);
  return (
    <>
      <Head>
        <title>Room Allocation</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h2>Room Allocation</h2>
        <StyledContainer>
          {testCases.map((el, i) => (
            <StyledButton
              key={el.name}
              $focus={stateTestCase.name === el.name}
              onClick={() => setTestCase(testCases[i])}
            >
              {el.name}
            </StyledButton>
          ))}
        </StyledContainer>
        <RoomAllocation
          guest={stateTestCase.guest}
          rooms={stateTestCase.rooms}
        />
      </main>
    </>
  );
}
