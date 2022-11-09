import { FC } from "react";
import Router from "next/router";
import { getAuth, signOut } from "firebase/auth";
import "components/firebase"; // Initialize FirebaseApp
import { useAuthState } from "../hooks/useAuthState"
import { Button } from "@mui/material"

export const SignInOrOutButton: FC = () => {
	const { isSignedIn } = useAuthState();

	if (isSignedIn) {
		return (
			<Button onClick={() => signOut(getAuth())} variant="contained">
				Sign-out
			</Button>
		);
	} else {
		return (
			<Button onClick={() => Router.push("/signin")} variant="contained">
				Sign-in
			</Button>
		);
	}
};
