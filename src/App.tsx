import React, { useEffect, useState } from "react";
import "./App.css";
import { unstable_batchedUpdates } from "react-dom";

const getUserData = () => fetch("/user.json").then((res) => res.json());

function App() {
  const [name, setName] = useState<string>();
  const [roles, setRoles] = useState<any>();
  const [roleList, setRoleList] = useState<string[]>();

  useEffect(() => {
    console.log(`useEffect ${name} ${roles}`);

    if (name) {
      setRoleList(Object.keys(roles).filter((r: string) => roles[r]));
    }
  }, [name, roles]);

  //React 16,17

  //Done in batch
  // const onLoadUser = () => {
  //   setName("John");
  //   setRoles({
  //     editor: true,
  //   });
  // };

  //Done in piece mod
  const onLoadUser = async () => {
    const data = await getUserData();
    console.log(JSON.stringify(data));

    //An another solution is to have a complex state
    unstable_batchedUpdates(() => {
      setName(data.name);
      setRoles(data.roles);
    });
  };

  return (
    <div className="App">
      <div>Name: {JSON.stringify(name)}</div>
      <div>Roles: {JSON.stringify(roles)}</div>
      <div>Role List: {JSON.stringify(roleList)}</div>
      <div>
        <button onClick={() => onLoadUser()}>Load User</button>
      </div>
    </div>
  );
}

export default App;
