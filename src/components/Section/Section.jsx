import styles from "./Section.module.css"

function Section({title="title", children}) {
  return (
    <div className={styles.section}>
      <h2>{title}</h2>
      {children}
    </div>
  )
}

export default Section;
