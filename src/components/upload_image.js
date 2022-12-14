import { useState } from "react"
import { postImage } from 'src/components/api'
import Button from '@mui/material/Button'
import styles from 'src/styles/upload_image.module.scss'

export default function UploadImage({ setUrl }) {
	const [image, setImage] = useState(null)
	const [createObjectURL, setCreateObjectURL] = useState(null)

	const uploadToClient = (event) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0]

			setImage(file)
			setCreateObjectURL(URL.createObjectURL(file))
		}
	}
	const uploadToServer = async () => {
		if (image) {
			const result = await postImage(image)
			setUrl(result)
		} else {
			alert("画像が選択されていません")
		}
	}
	return (
		<>
			<img src={createObjectURL} style={{ height: "50px" }} />
			<div>
				<label className={styles.fileSelect}>
					<input type="file" accept="image/*" name="myImage" onChange={uploadToClient} />
							画像選択
				</label>
				<Button className={styles.btn} type="submit" onClick={uploadToServer} variant="contained">
					確定
				</Button>
			</div>
		</>
	);
}
