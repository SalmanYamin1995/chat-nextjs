import { Toolbar } from "primereact/toolbar";
import { daysOne } from "@/src/UI/fonts/fonts";
import { Button } from "primereact/button";

import { useRouter } from "next/router";
import { Menu } from "primereact/menu";
import { useRef } from "react";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const op = useRef(null);
  const menu = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        router.push("/");
      },
    },
    {
      label: "Chat",
      icon: "pi pi-envelope",
      command: () => {
        router.push("/chat");
      },
    },
  ];
  const leftContent = () => {
    return (
      <>
        <div className={`text-3xl ${daysOne.className}`}>Chat</div>
      </>
    );
  };
  const rightContent = () => {
    return (
      <>
        <div className="flex">
          <Link href={"/"}>
            <Button
              icon={"pi pi-home"}
              rounded
              outlined
              label={"Home"}
              className={"shadow-5 mr-1"}
            />
          </Link>
          <Link href={"/chat"}>
            <Button
              icon={"pi pi-envelope"}
              rounded
              label={"Chat"}
              className={"shadow-5 ml-1"}
            />
          </Link>
        </div>
      </>
    );
  };
  const endContentMobile = () => {
    return (
      <>
        <div className="flex surface-ground-2 p-2 border-round-lg lg:hidden">
          <Button
            icon={"pi pi-bars"}
            text
            onClick={(e) => {
              op.current.toggle(e);
            }}
            outlined={true}
            className={"border-1"}
            style={{
              borderColor: "var(--primary-color)",
            }}
          />
        </div>
        <Menu model={[...menu]} ref={op} popup={true} />
      </>
    );
  };
  return (
    <>
      <Toolbar
        className="border-top-none border-right-none border-left-none p-5 fixed w-full hidden lg:flex"
        id={"header"}
        start={leftContent()}
        // center={centerContent()}
        end={rightContent()}
        style={{
          backgroundColor: "rgba(31, 34, 40, 0.6)",
          backdropFilter: "blur(15px)",
          zIndex: 1000,
        }}
      ></Toolbar>
      <Toolbar
        className="border-top-none border-right-none border-left-none p-5 fixed w-full flex lg:hidden"
        start={leftContent()}
        id={"header"}
        end={endContentMobile()}
        style={{
          backgroundColor: "rgba(31, 34, 40, 0.6)",
          backdropFilter: "blur(15px)",
          zIndex: 1000,
        }}
      ></Toolbar>
    </>
  );
}
