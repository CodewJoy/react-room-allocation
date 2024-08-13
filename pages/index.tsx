import React, { useState } from "react";
import styled from "@emotion/styled";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import RoomAllocation from "../components/RoomAllocation";
import { testCases } from "../utils/constant";

const inter = Inter({ subsets: ["latin"] });

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButton = styled.button<{ $focus: boolean; }>`
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