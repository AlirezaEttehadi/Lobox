"use client";

import MultiSelect from "../components/Select";

const options = [
  {
    label: "Tehran",
    value: "Tehran",
  },
  {
    label: "Mashhad",
    value: "Mashhad",
  },
  {
    label: "Isfahan",
    value: "Isfahan",
  },
  {
    label: "Babol",
    value: "Babol",
  },
  {
    label: "Ilam",
    value: "Ilam",
  },
  {
    label: "Shiraz",
    value: "Shiraz",
  },
  {
    label: "Ardebil",
    value: "Ardebil",
  },
  {
    label: "Sari",
    value: "Sari",
  },
  {
    label: "Rasht",
    value: "Rasht",
  },
  {
    label: "Ramsar",
    value: "Ramsar",
  },
  {
    label: "Qazvin",
    value: "Qazvin",
  },
];

export default function Home() {
  return (
    <main>
      <MultiSelect
        options={options}
        onChange={(selectedItems) => console.log(selectedItems)}
        placeholder="Select cities..."
      />
    </main>
  );
}
