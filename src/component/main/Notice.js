import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NoticeTable from "./NoticeTable";
import styled from "./Notice.module.css";

export default function Notice() {
  const [noticeList, setNoticeList] = useState(null);

  // 게시판 리스트 불러오기
  useEffect(() => {
    fetch("http://localhost:4001/post", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((data) => console.log("불러오기 실패 ", data))
      .then((res) => {
        const data = res.sort((a, b) => b.id - a.id);
        setNoticeList(data);
      });
  }, []);

  return (
    <div className="noticeContainer">
      <h2>TPN 게시판</h2>
      {noticeList !== null ? (
        <>
          <NoticeTable info={noticeList} />
          <div className={styled.noticeAdd}>
            <button>
              <Link to="/notice/new">글 쓰기</Link>
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
