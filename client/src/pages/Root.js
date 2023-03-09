import * as React from 'react'
import Header from "../components/Header";
import Error from "../components/Error";
import { Outlet } from "react-router-dom";
import useMountUser from "../hooks/use-mount-user"
import useAccessTokenURL from "../hooks/use-access-token-url"

const Root = () => {
	useMountUser();
	useAccessTokenURL();

  return (
		<>
			<Header />
			<Error />
			<Outlet />
		</>
  );
};

export default Root;
