/**
 * @author Satya Kumar Itekela <satya.itekela@dal.ca>
 */
import React, { useState, useEffect } from "react";
import "./Comments.scss";
import { Button } from "react-bootstrap";
import Comment from "../Comments/Comment/Comment";
import axios from "axios";
import { v4 as uuid } from "uuid";

export const Comments = ({ id }) => {
  const [textArea, setTextArea] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [comments, setComments] = useState([]);
  const userName = localStorage.getItem("user");

  useEffect(() => {
    textArea ? setDisabled(false) : setDisabled(true);
  }, [textArea]);

  useEffect(() => {
    //Request to get the comments from DB
    axios.get(`/comment/getComments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const changeTextAreaHandler = (e) => {
    setTextArea(e.target.value);
  };

  const addComment = () => {
    const commentId = uuid();
    //Request to post the comments to DB
    axios
      .post("/comment/addComment", {
        id,
        comment: textArea,
        userName: userName,
        commentId,
      })
      .then((response) => {
        setComments([...comments, response.data.data]);
        setTextArea("");
      })
      .catch((error) => console.log(error.message));
  };

  const deleteHandler = (commentId) => {
    //Request to delete the comment in DB
    axios
      .delete(`/comment/deleteComment/${commentId}`)
      .then((response) => {
        axios.get(`/comment/getComments/${id}`).then((response) => {
          setComments(response.data);
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="comments-container">
      <div className="issueHeading">Comments</div>
      <div className="commentsArea">
        {comments.map((comment, id) => (
          <Comment
            key={id}
            text={comment.comment}
            userName={comment.userName}
            commentId={comment.commentId}
            deleteHandler={deleteHandler}
          />
        ))}
      </div>
      <div className="commentsTextArea">
        <textarea
          placeholder="Add a comment"
          rows="4"
          value={textArea}
          onChange={changeTextAreaHandler}
        ></textarea>
      </div>

      <div className="buttons">
        <Button disabled={disabled} onClick={addComment}>
          Add Comment
        </Button>
      </div>
    </div>
  );
};
