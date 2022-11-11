import { useState } from "react"
import { postImage } from 'components/api'
import Button from '@mui/material/Button'
import styles from 'styles/upload_image.module.scss'

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
			<img src={createObjectURL} style={{height:"50px"}} />
			<label className={styles.fileSelect}>
				<input type="file" accept="image/*" name="myImage" onChange={uploadToClient} />
						画像ファイル選択

			</label>
			<Button className="btn btn-primary" type="submit" onClick={uploadToServer} variant="contained">
				確定
			</Button>
		</>
	);
}
