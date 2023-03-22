import { useNavigate } from "react-router-dom";
import "./NoticeTable.module.css";

//테일윈드

export default function NoticeTable({ info }) {
  const navigate = useNavigate();

  // 생성, 수정 날짜 표시 변경 함수
  function changeDate(date) {
    const dateText = new Date(date);

    const year = dateText.getFullYear();
    const month = dateText.getMonth() + 1;
    const day = dateText.getDay();
    const hour = dateText.getHours();
    const min = dateText.getMinutes();
    const second = dateText.getSeconds();

    return `${year}/${oneNum(month)}/${oneNum(day)} ${hour}:${oneNum(
      min
    )}:${oneNum(second)}`;
  }

  // 날짜, 시간 10 이하면 앞에 0 붙여지는 함수
  function oneNum(num) {
    return num < 10 ? `0${num}` : num;
  }

  // 수정 페이지 이동 함수
  function handleCorr(id) {
    navigate(`/notice/${id}`);
  }

  return (
    <table>
      <thead>
        <tr>
          <th>사용자 이름</th>
          <th>게시글 이름</th>
          <th>생성 날짜</th>
          <th>수정 날짜</th>
        </tr>
      </thead>
      <tbody>
        {info !== undefined ? (
          info.map((item) => {
            return (
              <tr key={item.id} onClick={() => handleCorr(item.id)}>
                <td>{item.username}</td>
                <td>{item.title}</td>
                <td>{changeDate(item.createdAt)}</td>
                <td>{changeDate(item.updatedAt)}</td>
              </tr>
            );
          })
        ) : (
          <tr></tr>
        )}
      </tbody>
    </table>
  );
}
