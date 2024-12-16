import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { addComment, fetchComments } from "./firebase";

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // 初期データの取得
  useEffect(() => {
    const initializeComments = async () => {
      const initialComments = await fetchComments();
      setComments(initialComments);
    };

    initializeComments();
  }, []);

  // コメント追加処理
  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    await addComment(newComment);
    setNewComment(""); // 入力フィールドをリセット

    // 新しいコメントを取得
    const updatedComments = await fetchComments();
    setComments(updatedComments);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // 中央揃え
        marginTop: 4,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: 400,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="コメントを入力してください"
          sx={{ marginRight: 2 }}
        />
        <Button
          variant="contained"
          color="primary" // いいねボタンと同じ色
          onClick={handleAddComment}
        >
          投稿
        </Button>
      </Box>

      <Typography variant="h6" sx={{ marginTop: 4 }}>
        コメント一覧:
      </Typography>
      <List
        sx={{
          width: "100%",
          maxWidth: 400,
          border: "1px solid #ddd",
          borderRadius: "4px",
          padding: 1,
          backgroundColor: "#f9f9f9",
        }}
      >
        {comments.map((comment, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={comment.text}
              secondary={
                comment.timestamp
                  ? new Date(comment.timestamp.toDate()).toLocaleString()
                  : "日時不明"
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
