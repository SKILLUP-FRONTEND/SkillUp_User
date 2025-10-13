// src/components/events/filters/views/ConferenceFilterView.tsx

"use client";

import OnOfflineFilter from "../filterElements/OnOfflineFilter";
import FreeFilter from "../filterElements/FreeFilter";
import styles from "./styles.module.css";
import {
  tempFreeFilterAtom,
  tempOnOfflineFilterAtom,
} from "../atoms/filterAtoms";
import { useAtom } from "jotai";

export default function ConferenceFilterView() {
  const [tempOnOfflineFilter, setTempOnOfflineFilter] = useAtom(
    tempOnOfflineFilterAtom
  );
  const [tempFreeFilter, setTempFreeFilter] = useAtom(tempFreeFilterAtom);
  return (
    <div className={styles.conferenceFilterView}>
      <OnOfflineFilter
        onSelect={setTempOnOfflineFilter}
        selected={tempOnOfflineFilter}
      />
      <FreeFilter checked={tempFreeFilter} setChecked={setTempFreeFilter} />
    </div>
  );
}
