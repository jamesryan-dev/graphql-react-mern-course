import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header";

import { getClient } from "@/lib/client";

export const dynamic = "force-dynamic";

import { gql } from "@apollo/client";
import Clients from "@/components/Clients";
import AddClientModal from "@/components/AddClientModal";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main>
      <Projects />
      <Clients />
    </main>
  );
}
