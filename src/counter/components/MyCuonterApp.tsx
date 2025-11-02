import { useCounter } from "../hooks/useCounter";

  

export const MyCuonterApp = () => {
  const {counter,handleAdd,handleReset,handleSubtract} = useCounter()

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
      }}
    >
      <h1>Counter: {counter}</h1>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          paddingTop: "1rem",
        }}
      >
        <button onClick={handleAdd}>+1</button>
        <button onClick={handleSubtract}>-1</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};
