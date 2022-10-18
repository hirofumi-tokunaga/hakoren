import { useEffect, useState } from 'react'
import {doc, deleteDoc,collection} from "firebase/firestore"
import db from 'components/firebase'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import styles from "styles/modal.module.scss"

export default function DeleteModal({ 
	collectionName,
	id ,
	open,
	setOpen,
}) {
	const handleClose = () => {
		setOpen(false);
	}
	async function handleDelete(){
		deleteDoc(doc(db(), "carlist", id?.id))
		// .then((res) => {window.location.reload()});
	}
	console.log()
	return (
		<div>
			{/* <Button onClick={handleOpen}>Open modal</Button> */}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box className={styles.box}>
					<h2 id="child-modal-title">{id?.id}</h2>
					<p id="child-modal-description">
						削除しますか？
					</p>
					<Box className={styles.btns}>
						<Button className="btn" onClick={handleClose} variant="outlined">Cancel</Button>
						<Button className="btn" onClick={handleDelete} variant="contained">OK</Button>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
