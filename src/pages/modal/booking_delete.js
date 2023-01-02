import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import styles from "src/styles/modal.module.scss"

export default function BookingDelete({
	open,
	setOpen,
	submit
}) {
	const handleClose = () => {
		setOpen(false);
	}
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box className={styles.box}>
				<p id="child-modal-description">
					予約を取り消しますか？
				</p>
				<Box className={styles.btns}>
					<Button className="btn" onClick={handleClose} variant="outlined">Cancel</Button>
					<Button className="btn" onClick={submit} variant="contained">OK</Button>
				</Box>
			</Box>
		</Modal>
	);
}
