import styles from "@/styles/CustomComponent.module.css";

export const LoadingBalls = () => {
  return (
    <div className={styles.loadingBox}>
      <div
        className={styles.loadingCircle}
        style={{ animationDelay: "-1.6s" }}
      ></div>
      <div
        className={styles.loadingCircle}
        style={{ animationDelay: "-1.2s" }}
      ></div>
      <div
        className={styles.loadingCircle}
        style={{ animationDelay: "-800ms" }}
      ></div>
      <div
        className={styles.loadingCircle}
        style={{ animationDelay: "-400ms" }}
      ></div>
      <div className={styles.loadingCircle}></div>
    </div>
  );
};
