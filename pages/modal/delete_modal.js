import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import styles from "styles/modal.module.scss"

export default function DeleteModal({
	name,
	open,
	setOpen,
	submit
}) {
	const handleClose = () => {
		setOpen(false);
	}
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box className={styles.box}>
					<h2 id="child-modal-title">名称 : {name}</h2>
					<p id="child-modal-description">
						削除しますか？
					</p>
					<Box className={styles.btns}>
						<Button className="btn" onClick={handleClose} variant="outlined">Cancel</Button>
						<Button className="btn" onClick={submit} variant="contained">OK</Button>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
