import React, { createContext, useContext, useState, ReactNode } from "react";

interface Scooter {
  id: number;
  title: string;
  description: string;
  price: string;
  speed: string;
  range: string;
  chargeTime: string;
  imageUrl: string;
}

interface ScooterContextType {
  scooters: Scooter[];
  addScooter: (scooter: Scooter) => void;
  editScooter: (scooter: Scooter) => void;
  deleteScooter: (id: number) => void;
}

const ScooterContext = createContext<ScooterContextType | undefined>(undefined);

export const useScooterContext = () => {
  const context = useContext(ScooterContext);
  if (!context) throw new Error("useScooterContext must be used inside provider");
  return context;
};

export const ScooterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [scooters, setScooters] = useState<Scooter[]>([
    {
      id: 1,
      title: "Adventure Max",
      description: "Built for off-road adventures and long distances",
      price: "$1,599",
      speed: "28 mph",
      range: "60 miles",
      chargeTime: "5 hours",
      imageUrl: "https://i.ibb.co/1RJrB0k/scooter.png",
    },
  ]);

  const addScooter = (scooter: Scooter) => {
    setScooters([...scooters, { ...scooter, id: Date.now() }]);
  };

  const editScooter = (updated: Scooter) => {
    setScooters(scooters.map((s) => (s.id === updated.id ? updated : s)));
  };

  const deleteScooter = (id: number) => {
    setScooters(scooters.filter((s) => s.id !== id));
  };

  return (
    <ScooterContext.Provider value={{ scooters, addScooter, editScooter, deleteScooter }}>
      {children}
    </ScooterContext.Provider>
  );
};
