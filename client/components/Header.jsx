import Image from "next/image";
import logo from "./assets/logo.png";

export default function Header() {
  return (
    <nav className="navbar text-bg-dark mb-5 p-0">
      <div className="container">
        <a className="navbar-brand" href="/">
          <div className="d-flex mb-1">
            <Image
              src={logo}
              alt="logo"
              width={30}
              height={30}
              className="mr-2"
            />
            <span>MERN</span>
          </div>
          <span className="extra-small">MongoDB, Express, React, Node</span>
        </a>
      </div>
    </nav>
  );
}
