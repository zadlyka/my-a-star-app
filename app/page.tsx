"use client";

import { useState } from "react";
import { aStar } from "../lib/a-star";

// Define types for state and input values
type Graph = Record<string, [string, number][]>;
type Node = string;

export default function Home() {
  const [graph] = useState<Graph>({
    A: [
      ["B", 1],
      ["C", 4],
    ],
    B: [
      ["C", 2],
      ["D", 5],
    ],
    C: [["D", 1]],
    D: [],
  });
  const [start, setStart] = useState<Node>("A");
  const [goal, setGoal] = useState<Node>("D");
  const [result, setResult] = useState<{
    distance: number;
    path: string[];
  } | null>(null);

  const calculateRoute = () => {
    const result = aStar(graph, start, goal);
    setResult(result);
  };

  return (
    <div>
      <h1>A* Algorithm</h1>
      <input
        type="text"
        placeholder="Start Node"
        value={start}
        onChange={(e) => setStart(e.target.value as Node)}
      />
      <input
        type="text"
        placeholder="Goal Node"
        value={goal}
        onChange={(e) => setGoal(e.target.value as Node)}
      />
      <button onClick={calculateRoute}>Calculate Route</button>

      {result && (
        <div>
          <h2>
            Route from {start} to {goal}:
          </h2>
          <p>Distance: {result.distance}</p>
          <p>Path: {result.path.join(" -> ")}</p>
        </div>
      )}
    </div>
  );
}
