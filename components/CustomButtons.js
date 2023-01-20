import styles from "@/styles/CustomComponent.module.css";
import { Button } from "@mui/material";

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
    <Button {...props} className={styles.lightBtn}>
      {props.children}
    </Button>
  );
}

function ColorButton(props) {
  return (
    <Button {...props} className={styles.colorBtn}>
      {props.children}
    </Button>
  );
}

export { OkButton, CancelButton, LightButton, ColorButton };
