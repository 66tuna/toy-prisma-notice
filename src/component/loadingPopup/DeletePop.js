import styled from "./Delete.module.css";

export default function DeletePop({ setIsLoading }) {
  return (
    <div className={styled.deletePop}>
      <div className={styled.deleteText}>글을 삭제하시겠습니까?</div>
      <div className={styled.deleteBtn}>
        <button type="button">삭제하기</button>
        <div className={styled.btn} onClick={() => setIsLoading(false)}>
          취소
        </div>
      </div>
    </div>
  );
}
