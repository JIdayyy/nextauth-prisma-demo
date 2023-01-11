/* eslint-disable react/jsx-key */
import axios from "axios";
import React from "react";

type Props = {};

export default function Cars({}: Props) {
  const [cars, setCars] = React.useState<any>([]);
  const getCars = async () => {
    const { data } = await axios.get("http://localhost:3000/api/cars");
    setCars(data);
  };

  React.useEffect(() => {
    getCars();
  }, []);

  if (cars.length === 0) {
    return <div>Loading ...</div>;
  }
  return (
    <div>
      {cars.map((car: any) => {
        return (
          <div>
            <h1>{car.name}</h1>
          </div>
        );
      })}
    </div>
  );
}
