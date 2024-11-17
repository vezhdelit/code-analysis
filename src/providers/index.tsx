import React from "react";
import ReactQueryProvider from "./query-provider";

type Props = {
	children: React.ReactNode;
};

const MainProvider = ({ children }: Props) => {
	return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export default MainProvider;
