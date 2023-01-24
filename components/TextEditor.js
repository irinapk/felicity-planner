import styles from "@/styles/CustomComponent.module.css";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnNumberedList,
  BtnRedo,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Separator,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";

export default function CustomTextEditor({ value, onChangeValue }) {
  function onChange(e) {
    onChangeValue(e.target.value);
  }

  return (
    <div className={styles.editor}>
      <EditorProvider>
        <Editor value={value} onChange={onChange}>
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnClearFormatting />
            <Separator />
            <BtnStyles />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}
