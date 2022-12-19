import { createContext,useState } from "react"

export const LoginMemberContext = createContext({})
export const LoginMemberProvider = props => {
	const { children } = props
	const sampleObj = { sampleValue: "テスト" }
	const [member, setMember] = useState({})

	return (
		<LoginMemberContext.Provider value={{ member, setMember }} >
			{children}
		</LoginMemberContext.Provider>
	)
}
