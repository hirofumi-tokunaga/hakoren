import { useRouter } from "next/router";

export default function ClassOption(){
	const router = useRouter()
	// パスパラメータから値を取得
	const { class_id } = router.query;
	return (
		<>
			<div>{ class_id}</div>
		</>
	)
}
