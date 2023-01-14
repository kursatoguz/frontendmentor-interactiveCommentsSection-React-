import React from "react";
import { useState } from "react";
import SendComment from "./SendComment";
import Modal from "./Modal";
import { AppContext } from "../context";
const Comment = ({ parentUser, ...comments }) => {
  const { currentUser, handleScore } = React.useContext(AppContext);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const checkUserReply = parentUser ? "reply" : "normalComment";
  const [isIncreased, setIsIncreased] = useState(false);
  const [isDecreased, setIsDecreased] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const increaseScore = () => {
    if (currentUser.username === comments.user.username) return;
    if (isIncreased === false && isDecreased === false) {
      handleScore(comments.id, checkUserReply, comments.score + 1);
      setIsIncreased(true);
    }
    if (isIncreased === true) {
      handleScore(comments.id, checkUserReply, comments.score - 1);
      setIsIncreased(false);
      setIsDecreased(false);
    }
  };
  const decreaseScore = () => {
    if (currentUser.username === comments.user.username) return;
    if (isDecreased === false && isIncreased === false) {
      handleScore(comments.id, checkUserReply, comments.score - 1);
      setIsDecreased(true);
    }
    if (isDecreased === true) {
      handleScore(comments.id, checkUserReply, comments.score + 1);
      setIsIncreased(false);
      setIsDecreased(false);
    }
  };

  return (
    <>
      <section className="single-comment">
        <div className="scores">
          <img
            src="./images/icon-plus.svg"
            alt="plus"
            onClick={() => increaseScore()}
          />
          <p className="score">{comments.score}</p>
          <img
            src="./images/icon-minus.svg"
            alt="minus"
            onClick={() => decreaseScore()}
          />
        </div>

        <div className="main-content">
          <div className="header">
            <div className="leftside">
              <img
                src={comments.user.image.webp}
                alt={comments.user.username}
                className="profile-img"
              />
              <p className="username">{comments.user.username}</p>
              {comments.user.username === currentUser.username && (
                <p className="you">you</p>
              )}
              <p className="time">{comments.createdAt}</p>
            </div>
            {comments.user.username === currentUser.username ? (
              <div className=" dl-edt-btns ">
                <div
                  className="delete"
                  onClick={() => showModal(comments.id, checkUserReply)}
                >
                  <img src="./images/icon-delete.svg" alt="delete" />
                  <p className="delete">delete</p>
                </div>
                <div className="edit" onClick={() => setIsEditing(!isEditing)}>
                  <img src="./images/icon-edit.svg" alt="edit" />
                  <p className="edit">edit</p>
                </div>
              </div>
            ) : (
              <div
                className="rightside"
                onClick={() => setIsReplying(!isReplying)}
              >
                <img src="./images/icon-reply.svg" alt="reply" />
                <p className="reply">reply</p>
              </div>
            )}
          </div>
          <div className="text">
            <p>{comments.content}</p>
          </div>
        </div>
      </section>
      {isReplying && (
        <SendComment
          user={comments.user.username}
          setIsReplying={setIsReplying}
          parentUser={parentUser}
          commentType="reply"
        />
      )}
      {isEditing && (
        <SendComment
          setIsEditing={setIsEditing}
          commentType="update"
          checkUserReply={checkUserReply}
          commentId={comments.id}
        />
      )}
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          commentId={comments.id}
          checkUserReply={checkUserReply}
        />
      )}
    </>
  );
};

export default Comment;
