import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header";

import { getClient } from "@/lib/client";

import { gql } from "@apollo/client";
import Clients from "@/components/Clients";

export default function Home() {
  return (
    <main>
      <Clients />
    </main>
  );
}
