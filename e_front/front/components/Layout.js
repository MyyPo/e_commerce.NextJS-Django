import Header from "./Header/Header";

export default function Layout({ children }) {
  return (
    <>
      <title>Layouts Example</title>
      <Header />
      <main className="">{children}</main>
    </>
  );
}
