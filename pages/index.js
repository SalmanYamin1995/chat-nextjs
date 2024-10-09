import { socket } from "@/src/socket";
import { useEffect, useRef, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { signIn, signOut, useSession } from "next-auth/react";
import { Toast } from "primereact/toast";
import { LoaderBarDiv } from "@/src/UI/Loaders";
import { Dialog } from "primereact/dialog";

export default function () {
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    if (socket.connected && !connected) {
      console.log("Connected");
      setConnected(true);
    }
    if (connected) {
      console.log("Emitting now");
      console.log(socket);
    }
  }, [connected]);
  const { data: session, status } = useSession();
  console.log(session);
  if (status === "loading") {
    return <LoaderBarDiv />;
  } else if (status === "unauthenticated") {
    return (
      <>
        <LoginBox />
      </>
    );
  } else {
    return (
      <>
        <div
          className={"w-full flex justify-content-center align-items-center"}
        >
          <div className="w-5 surface-card border-round-lg p-6 flex justify-content-center align-items-center">
            <div className={"w-full px-4"}>
              <TabView>
                <TabPanel header={"Create Room"}>
                  <div
                    className={
                      "w-full justify-content-start align-items-start flex flex-column"
                    }
                  >
                    <div className={"flex flex-column w-full"}>
                      <label for="password" className={"my-1"}>
                        Enter password for room:{" "}
                      </label>
                      <InputText
                        className={"my-1"}
                        type={"password"}
                        placeholder={"Enter password..."}
                      />
                      <Button
                        className={""}
                        label={"Create"}
                        icon={"pi pi-plus"}
                        onClick={() => {
                          signOut();
                        }}
                      />
                    </div>
                    <Message
                      severity={"info"}
                      className={"my-2"}
                      text={"A room ID will automatically be generated for you"}
                    />
                  </div>
                </TabPanel>
                <TabPanel header={"Join Room"}></TabPanel>
              </TabView>
            </div>
          </div>
        </div>
      </>
    );
  }
}
function LoginBox(props) {
  function handleLogin(e) {
    e.preventDefault();
  }
  function resetErrors() {
    setUsernameError(false);
    setPasswordError(false);
  }
  async function handleReg(e) {
    e.preventDefault();
    resetErrors();

    let validated = true;
    if (username === "") {
      toast.current.show({
        severity: "error",
        detail: "Username is required",
        summary: "Error",
      });
      setUsernameError(true);
      validated = false;
    }
    if (password.length < 8) {
      toast.current.show({
        severity: "error",
        detail: "Password must have at least 8 characters",
        summary: "Error",
      });
      setPasswordError(true);
      validated = false;
    }
    if (!validated) {
      return;
    }
    const fetchRes = await fetch("/api/users/new", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const fetchResJson = await fetchRes.json();
    if (fetchResJson.alreadyExists) {
      setUsernameError(true);
      return toast.current.show({
        severity: "error",
        detail: "Username already taken. Please choose a different username!",
        summary: "Error",
      });
    } else if (fetchResJson.error) {
      return toast.current.show({
        severity: "error",
        detail: "Unknown error occurred. Contact site admins for help!",
        summary: "Error",
      });
    }
    signIn("credentials", { username, password });
    console.log(fetchResJson);
  }
  const [visible, setVisible] = useState(true);
  const [regVisible, setRegVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const toast = useRef(null);
  return (
    <>
      <Toast ref={toast} style={{ zIndex: 9999999 }} />
      <Dialog
        closable={false}
        onHide={() => setVisible(false)}
        visible={visible}
        header={"Login"}
      >
        <div
          className={
            "flex justify-content-center align-items-center px-4 flex-column"
          }
        >
          <form onSubmit={handleLogin}>
            <div className={"my-1 w-full"}>
              <label for="username" className={"mb-2"}>
                Username:{" "}
              </label>
              <InputText
                className={"w-full my-1" + (usernameError ? " p-invalid" : "")}
                placeholder={"Enter username..."}
                onChange={(e) => {
                  console.log(e.target.value);
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className={"my-1 w-full"}>
              <label for="password" className={"mb-2"}>
                Password:{" "}
              </label>
              <InputText
                className={"w-full my-1" + (passwordError ? " p-invalid" : "")}
                placeholder={"Enter password..."}
                type={"password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <Button
              onClick={async () => {}}
              label={"Sign In"}
              icon={"pi pi-sign-in"}
              className={"w-full my-3"}
            />
            <Button
              onClick={async () => {
                setVisible(false);
                setRegVisible(true);
              }}
              outlined={true}
              label={"Don't have an account? Register Now!"}
              className={"w-full my-3"}
            />
          </form>
        </div>
      </Dialog>
      <Dialog
        onHide={() => setRegVisible(false)}
        visible={regVisible}
        header={"Register"}
      >
        <div
          className={
            "flex justify-content-center align-items-center px-4 flex-column"
          }
        >
          <form onSubmit={handleReg}>
            <div className={"my-1 w-full"}>
              <label for="username" className={"mb-2"}>
                Username:{" "}
              </label>
              <InputText
                className={"w-full my-1" + (usernameError ? " p-invalid" : "")}
                placeholder={"Enter username..."}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className={"my-1 w-full"}>
              <label for="password" className={"mb-2"}>
                Password:{" "}
              </label>
              <InputText
                className={"w-full my-1" + (passwordError ? " p-invalid" : "")}
                placeholder={"Enter password..."}
                type={"password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <Button
              onClick={async () => {}}
              label={"Sign Up"}
              icon={"pi pi-user-plus"}
              className={"w-full my-3"}
            />
            <Button
              onClick={async () => {
                setRegVisible(false);
                setVisible(true);
              }}
              outlined={true}
              label={"Already have an account? Login Now!"}
              className={"w-full my-3"}
            />
          </form>
        </div>
      </Dialog>
    </>
  );
}
