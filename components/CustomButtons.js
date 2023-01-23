import styles from "@/styles/CustomComponent.module.css";

function OkButton(props) {
  return (
    <button {...props} className={styles.okBtn}>
      ok
    </button>
  );
}

function CancelButton(props) {
  return (
    <button {...props} className={styles.cancelBtn}>
      back
    </button>
  );
}

function LightButton(props) {
  return (
    <button {...props} className={styles.lightBtn}>
      {props.children}
    </button>
  );
}

function ColorButton(props) {
  return (
    <button {...props} className={styles.colorBtn}>
      {props.children}
    </button>
  );
}

export { OkButton, CancelButton, LightButton, ColorButton };
