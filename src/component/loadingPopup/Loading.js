import { useState } from "react";
import DeletePop from "./DeletePop";
import styled from "./Loading.module.css";

export default function Loading({ state, setIsLoading }) {
  const [msg, setMsg] = useState(state);

  return (
    <div className={styled.fullWidht}>
      <div className={styled.LoadingText}>
        {state === "create" ? (
          "게시판 등록 중..."
        ) : state === "update" ? (
          "게시판 수정 중..."
        ) : state === "delete" ? (
          // 팝업창 따로
          <DeletePop setIsLoading={setIsLoading} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
