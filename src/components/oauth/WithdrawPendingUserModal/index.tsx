"use client";

import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import styles from "./styles.module.css";

interface WithdrawPendingUserModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onRejoin: () => void;
  isLoading?: boolean;
}

export default function WithdrawPendingUserModal({
  isOpen,
  onCancel,
  onRejoin,
  isLoading = false,
}: WithdrawPendingUserModalProps) {
  return (
    <Modal isOpen={isOpen} toggle={() => {}}>
      <div className={styles.modalInner}>
        <div className={styles.content}>
          <div className={styles.icon}>!</div>

          <Text typography="head4_sb_20" color="black" as="h2" className={styles.title}>
            이 계정은 현재 탈퇴 대기 상태입니다.
            <br />
            계속 이용하려면 재가입하기를 눌러주세요.
          </Text>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
            disabled={isLoading}
          >
            <Text typography="sub2_m_18" color="primary-strong">
              취소
            </Text>
          </button>
          <button
            type="button"
            className={styles.rejoinButton}
            onClick={onRejoin}
            disabled={isLoading}
          >
            <Text typography="sub2_m_18" color="white">
              {isLoading ? "처리 중..." : "재가입하기"}
            </Text>
          </button>
        </div>
      </div>
    </Modal>
  );
}
