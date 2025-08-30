import { useState } from "react";
import { useAxios } from "../../api";
import { Person } from "../type/person";

export const useGetPersons = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const { client } = useAxios();

  const getPersons = async () => {
    const response = await client.get("/persons");
    console.log(`response: ${JSON.stringify(response)}`);
    setPersons(response.data);
  };

  return { persons, getPersons };
};
