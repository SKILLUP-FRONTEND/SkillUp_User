// src/components/common/InputField/index.tsx

import styles from "./styles.module.css";
import Text from "../Text";

interface InputFieldProps {
  label: string;
  children: React.ReactNode;
}

export default function InputField({ label, children }: InputFieldProps) {
  return (
    <div className={styles.inputField}>
      <Text typography="label3_m_14" color="black" as="span">
        {label}
      </Text>
      {children}
    </div>
  );
}
