import { createContext,useState } from "react"

export const LoginMemberContext = createContext({})
export const LoginMemberProvider = props => {
	const { children } = props
	const [member, setMember] = useState({})
	const [booking, setBooking] = useState({})

	return (
		<LoginMemberContext.Provider value={{ member, setMember,booking,setBooking }} >
			{children}
		</LoginMemberContext.Provider>
	)
}
