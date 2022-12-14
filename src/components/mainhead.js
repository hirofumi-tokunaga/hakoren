import styles from 'src/styles/mainhead.module.scss'

export default function MainHead({ title }){
	return (
		<h2 className={styles.title } style={{marginBottom:"50px"}}>{ title}</h2>
	)
}
