import styles from './styles.module.css'

export default function LoaderMachine () {
  return (
    <div className={styles.typewriter}>
      <div className={styles.slide}><i /></div>
      <div className={styles.paper} />
      <div className={styles.keyboard} />
    </div>
  )
}
