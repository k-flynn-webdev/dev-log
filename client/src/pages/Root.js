import * as React from 'react'
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import useMountUser from "../hooks/use-mount-user"
import useAccessTokenURL from "../hooks/use-access-token-url"

const Root = () => {
	useMountUser();
	useAccessTokenURL();

  return (
		<>
			<Header />
			<Outlet />
		</>
  );
};

export default Root;
