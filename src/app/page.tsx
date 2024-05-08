import Image from "next/image";
import styles from "./page.module.css";
import MainContent from "./mainContent/page";
import Container from "@mui/material/Container";

export default function Home() {
  return (
    <main className={styles.main}>
      <Container sx={{ textAlign: "center" }} maxWidth="sm">
        <MainContent></MainContent>
      </Container>
    </main>
  );
}
