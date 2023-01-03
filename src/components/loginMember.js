import { createContext,useState ,useEffect} from "react"
import { KEYS, setItem, getItem  } from "src/components/LocalStorage"

export const LoginMemberContext = createContext({})
export const LoginMemberProvider = props => {
	const { children } = props
	const [member, setMember] = useState({})
	const [booking, setBooking] = useState({})
    // テキストボックスの値をLocalStorageに保存する
	useEffect(() => {
		if(member.id) {
			setItem(KEYS.MEMBER,member)
		} else{
			setMember(getItem(KEYS.MEMBER))
		}
	},[member])
	useEffect(() => {
		if(booking.carId) {
			setItem(KEYS.BOOKING,booking)
		} else{
			setBooking(getItem(KEYS.BOOKING))
		}
	},[booking])
	console.log("メンバー",member.id   )

	return (
		<LoginMemberContext.Provider value={{ member, setMember,booking,setBooking }} >
			{children}
			{console.log("booking", booking)}
			{console.log("member", member)}
		</LoginMemberContext.Provider>
	)
}
