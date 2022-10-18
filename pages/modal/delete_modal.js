import { useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import styles from "styles/modal.module.scss"
import styleFunctionSx from '@mui/system/styleFunctionSx';

export default function DeleteModal({ collectionName,id }) {
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	console.log(open)
	return (
		<div>
			<Button onClick={handleOpen}>Open modal</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box className={styles.box}>
					<h2 id="child-modal-title">Text in a child modal</h2>
					<p id="child-modal-description">
						Lorem ipsum, dolor sit amet consectetur adipisicing elit.
					</p>
					<Button onClick={handleClose}>Close Child Modal</Button>
				</Box>
			</Modal>
		</div>
	);
}
