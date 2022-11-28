import { FC } from "react";
import {
	getAuth,
	EmailAuthProvider,
	// FacebookAuthProvider,
	GoogleAuthProvider,
	// TwitterAuthProvider,
} from "firebase/auth";
import { auth } from "firebaseui";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "components/firebase"; // Initialize FirebaseApp
import styles from "styles/signinform.module.scss";

const uiConfig: auth.Config = {
	signInFlow: "popup",
	signInOptions: [
		EmailAuthProvider.PROVIDER_ID,
		// FacebookAuthProvider.PROVIDER_ID,
		GoogleAuthProvider.PROVIDER_ID,
		// TwitterAuthProvider.PROVIDER_ID,
		disableSignUp
	],
	signInSuccessUrl: "/",
};
export const SignInForm: FC = () => {
	return (
		<div className={styles.section}>
			<div className={styles.container}>
				<h1>車両管理システム</h1>
				< StyledFirebaseAuth firebaseAuth = { getAuth() } uiConfig = { uiConfig } />
			</div>
		</div>
	)
};
