import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./loadingPopup/Loading";
import styled from "./NewNotice.module.css";

export default function NewNotice() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [getPassword, setGetPassword] = useState("");
  const [title, setTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [lodingTxt, setLodingTxt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // link말고 함수로 페이지 이동이 되게 해주는 내부 함수
  const { noticeId, productId } = useParams(); // productId를 가져오는 변수
  const [method, setMethod] = useState(productId ? "PUT" : "POST");

  // 보기, 수정 페이지 마다 따로 받아오기
  useEffect(() => {
    if (noticeId !== undefined) {
      // 보기페이지
      renderApi(noticeId);
      console.log("noticeId: ", noticeId);
    } else if (productId !== undefined) {
      // 수정 페이지
      renderApi(productId);
      console.log("productId: ", productId);
    }
  }, [productId, noticeId]);

  // 보기, 수정 페이지에 맨 처음에 받아야 할 데이터들
  function renderApi(id) {
    fetch(`http://localhost:4001/post/single/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((data) => {
        alert("에러 발생, 새로고침 후 다시 입력");
        console.log("err: ", data);
      })
      .then((res) => {
        console.log(res);
        setUserName(res.username);
        setTitle(res.title);
        setNoticeContent(res.body);
      });
  }

  // 게시판 데이터 서버로 보내는 함수
  function handleSubmit(e) {
    e.preventDefault();

    // if (!productId) return;
    // sendApi(productId);

    sendApi(productId);
    // if (productId === undefined) {
    // } else{
    //   sendApi(productId);
    // }
  }
  // method에 맞게 api 전송 함수
  function sendApi(id) {
    const method = id ? "PUT" : "POST";
    const lodingTxt = id ? "update" : "create";

    console.log(password);
    if (
      userName.length !== 0 &&
      title.length !== 0 &&
      password.length !== 0 &&
      noticeContent.length !== 0
    ) {
      const sendObj = {
        title: title,
        password: password,
        body: noticeContent,
      };

      if (id) sendObj["id"] = id;
      else sendObj["username"] = userName;

      setLodingTxt(lodingTxt);
      setIsLoading(true);

      setTimeout(() => {
        fetch("http://localhost:4001/post", {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sendObj),
        })
          .then((res) => res.json())
          .catch((data) => console.log("전송 에러: ", data))
          .then((res) => {
            console.log(res);
            navigate("/");
          });
      }, 500);
    } else {
      alert("입력하지 못한 항목이 있습니다");
    }
  }

  // 게시판 삭제 함수
  function handleDel() {
    setLodingTxt("delete");
    setIsLoading(true);
  }

  function handleGoCorr(id) {
    navigate(`/notice/correction/${id}`);
  }

  return (
    <>
      <h2 className={styled.NewNoticeName}>
        {noticeId === undefined
          ? productId === undefined
            ? "글 등록"
            : "글 수정"
          : ""}
      </h2>
      {noticeId === undefined ? (
        <>
          <form onSubmit={handleSubmit}>
            {/* 사용자 작성 */}
            <div className={styled.inputLabel}>작성자</div>
            <input
              type="text"
              id="userName"
              placeholder="작성자의 이름을 작성해주세요"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />
            <div className={styled.inputLabel}>비밀번호</div>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 작성해주세요"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* 게시판 이름, 내용 작성 */}
            <div className={styled.inputLabel}>게시판 이름</div>
            <input
              type="text"
              id="title"
              placeholder="게시판 이름을 작성해주세요"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <div className={styled.inputLabel}>게시판 내용</div>
            <textarea
              id="noticeContent"
              placeholder="게시판 내용을 작성해주세요"
              rows="10"
              onChange={(e) => setNoticeContent(e.target.value)}
              value={noticeContent}
            ></textarea>

            <div className={styled.submitBox}>
              <button>
                {productId === undefined ? "등록하기" : "수정하기"}
              </button>
              <div className={styled.btn}>
                {productId === undefined ? (
                  <Link to="/">취소</Link>
                ) : (
                  <>
                    <Link to="/">돌아가기</Link>
                    <div onClick={handleDel} className={styled.removeBtn}>
                      삭제
                    </div>
                  </>
                )}
              </div>
            </div>
          </form>
          {isLoading === true ? (
            <Loading state={lodingTxt} setIsLoading={setIsLoading} />
          ) : (
            ""
          )}
        </>
      ) : (
        <div className={styled.noticeView}>
          <div className={styled.noticeViewHeader}>
            <div className={styled.titleText}>{title}</div>
            <div className={styled.userNameText}>작성자: {userName}</div>
          </div>
          <div className={styled.noticeContentText}>{noticeContent}</div>
          <div className={styled.btnBox}>
            <button
              onClick={() => {
                handleGoCorr(noticeId);
              }}
            >
              수정하기
            </button>
            <div className={styled.btn}>
              <Link to="/">돌아가기</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
