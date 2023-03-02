import * as React from 'react'
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import useUserMount from "../hooks/use-user-mount"

const Root = () => {
	useUserMount();

  return (
		<>
			<Header />
			<Outlet />
		</>
  );
};

export default Root;
