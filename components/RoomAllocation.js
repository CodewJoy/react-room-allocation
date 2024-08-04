import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { cloneDeep } from "../utils";
import { getDefaultRoomAllocation } from "../utils";
import InputNumber from "./InputNumber";

const StyledContainer = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  margin: 10px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid rgb(30, 159, 210);
`;

const StyledTitile = styled.div`
  font-weight: 600;
`;

const StyledWarning = styled.div`
  width: 100%;
  padding: 4px;
  border-radius: 4px;
  background: aliceblue;
  border: 1px solid rgb(30, 159, 210);
`;

const StyledRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

const StyledAdultTest = styled.div`
  display: flex;
  flex-direction: column;

  .description {
    font-size: 12px;
    color: gray;
  }
`;

const StyledLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(232, 232, 232);
`;

const StyledSelection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const StyledTotoalPrice = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function RoomAllocation({ guest, rooms }) {
  const [stateAllocations, setAllocations] = useState(
    () => getDefaultRoomAllocation({ guest, rooms }).defaultRooms
  );
  const totalPrice = stateAllocations.reduce((acc, cur) => acc + cur.price, 0);
  const assignedAdult = stateAllocations.reduce(
    (acc, cur) => acc + cur.adult,
    0
  );
  const assignedChild = stateAllocations.reduce(
    (acc, cur) => acc + cur.child,
    0
  );
  const unAssignedAdult = guest.adult - assignedAdult;
  const unAssignedChild = guest.child - assignedChild;

  useEffect(() => {
    const defaultRooms = getDefaultRoomAllocation({
      guest,
      rooms,
    }).defaultRooms;
    setAllocations(defaultRooms);
  }, [JSON.stringify(guest), JSON.stringify(rooms)]);

  const handleAllocationChange = (index, type, value) => {
    const newAllocations = cloneDeep(stateAllocations);
    newAllocations[index][type] = value;
    const assignedAdult = newAllocations.reduce(
      (acc, cur) => acc + cur.adult,
      0
    );
    const assignedChild = newAllocations.reduce(
      (acc, cur) => acc + cur.child,
      0
    );

    if (assignedAdult > guest.adult || assignedChild > guest.child) return;
    newAllocations[index].price =
      rooms[index].roomPrice +
      newAllocations[index].adult * rooms[index].adultPrice +
      newAllocations[index].child * rooms[index].childPrice;
    setAllocations(newAllocations);
  };

  return (
    <StyledContainer>
      <StyledTitile>
        住客人數: {guest.adult} 位大人，{guest.child} 位小孩 / {rooms.length} 房
      </StyledTitile>
      <StyledWarning>
        尚未分配人數: {unAssignedAdult} 位大人，{unAssignedChild} 位小孩
      </StyledWarning>
      {stateAllocations.length &&
        stateAllocations.map((el, index) => {
          return (
            <StyledRoomContainer key={index}>
              房間: {el.adult + el.child} 人，可容納人數:{" "}
              {rooms[index]?.capacity || ""}，價格: {el.price}
              <StyledSelection>
                {" "}
                <StyledAdultTest>
                  大人<p className="description">年齡 20+</p>
                </StyledAdultTest>
                <InputNumber
                  value={el.adult}
                  min={el.adult && el.child ? 1 : 0} // NOTICE: 有 child 的 room 至少要有一個 adult 分配在同一間 room
                  max={rooms[index] ? rooms[index].capacity - el.child : 0}
                  onChange={(e) => {
                    handleAllocationChange(index, "adult", e.target.value);
                  }}
                />
              </StyledSelection>
              <StyledSelection>
                {" "}
                小孩
                <InputNumber
                  value={el.child}
                  min={0}
                  max={rooms[index] ? rooms[index].capacity - el.adult : 0}
                  onChange={(e) => {
                    // NOTICE: 有 child 的 room 至少要有一個 adult 分配在同一間 room
                    if (el.adult >= 1)
                      handleAllocationChange(index, "child", e.target.value);
                  }}
                />
              </StyledSelection>
              <StyledLine />
            </StyledRoomContainer>
          );
        })}
      <StyledTotoalPrice>總價格: {totalPrice}</StyledTotoalPrice>
    </StyledContainer>
  );
}
