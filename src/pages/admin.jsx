import { Navbar6 } from "../components/Navbar6";
import { Footer1 } from "../components/Footer1";

export default function Admin() {
  return (
    <div>
      <Navbar6 />
      <main className="px-[5%] pb-24 pt-28 md:pt-32">
        <h1 className="text-3xl font-bold text-text-primary">Admin</h1>
        <p className="mt-2 max-w-xl text-text-secondary">
          Replace this placeholder with your admin dashboard. The link is wired
          from the signed-in user menu in the navbar.
        </p>
      </main>
      <Footer1 />
    </div>
  );
}
