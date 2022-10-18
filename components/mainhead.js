import styles from 'styles/mainhead.module.scss'

export default function MainHead({ title }){
	return (
		<h2 className={styles.title }>{ title}</h2>
	)
}
