import { Car } from "@prisma/client";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { data, status } = useSession();
  const [formData, setFormData] = useState<Partial<Car>>({
    model: "",
    name: "",
    year: 0,
  });

  console.log(data, status);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // const { data } = await axios.post(
    //   "http://localhost:3000/api/cars",
    //   formData
    // );
    // console.log(data);
    signIn("credentials", {
      email: "julien_abbadie@hotmail.fr",
      password: "dzdz",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <form action="">
        <input onChange={handleChange} type="text" name="name" id="name" />
        <input onChange={handleChange} type="text" name="model" id="model" />
        <input onChange={handleChange} type="number" name="year" id="year" />
      </form>
      <button onClick={handleSubmit}>Create car</button>
    </div>
  );
}
