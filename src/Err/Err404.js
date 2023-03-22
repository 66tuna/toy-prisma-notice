import { Link } from "react-router-dom";

export default function Err404() {
  return (
    <div className="404Err">
      <p>없는 페이지 입니다.</p>
      <Link to="/">메인 화면으로 돌아가기</Link>
    </div>
  );
}
