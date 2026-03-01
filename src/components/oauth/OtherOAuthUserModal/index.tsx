"use client";

import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import styles from "./styles.module.css";

interface OtherOAuthUserModalProps {
  isOpen: boolean;
  identifier?: string | null;
  onConfirm: () => void;
}

const maskIdentifier = (identifier?: string | null) => {
  if (!identifier) return "동일 식별자로 가입된 계정";

  const atIndex = identifier.indexOf("@");
  if (atIndex <= 2) return identifier;

  const local = identifier.slice(0, atIndex);
  const domain = identifier.slice(atIndex);
  const visible = local.slice(0, 3);
  return `${visible}*****${domain}`;
};

export default function OtherOAuthUserModal({
  isOpen,
  identifier,
  onConfirm,
}: OtherOAuthUserModalProps) {
  return (
    <Modal isOpen={isOpen} toggle={onConfirm}>
      <div className={styles.modalInner}>
        <div className={styles.content}>
          <div className={styles.icon}>!</div>

          <Text typography="head4_sb_20" color="black" as="h2">
            이미 같은 이메일로 가입된 계정이 있어요
          </Text>

          <div className={styles.identifierBox}>
            <div className={styles.providerBadge}>SNS</div>
            <Text typography="body1_r_16" color="neutral-20">
              {maskIdentifier(identifier)}
            </Text>
          </div>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.confirmButton} onClick={onConfirm}>
            <Text typography="sub2_m_18" color="white">
              확인
            </Text>
          </button>
        </div>
      </div>
    </Modal>
  );
}
