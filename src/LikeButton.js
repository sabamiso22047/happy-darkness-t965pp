import React, { useState, useEffect } from "react";
import { Button, Typography, Box, IconButton, Badge } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite"; // ハートアイコン
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // ハート枠アイコン
import { fetchLikes, updateLikes } from "./firebase";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false); // ボタンの状態を管理

  // 初期データの取得
  useEffect(() => {
    const initializeLikes = async () => {
      const initialLikes = await fetchLikes();
      setLikes(initialLikes);
    };

    initializeLikes();
  }, []);

  // いいねボタンのクリック処理
  const handleLike = async () => {
    const newCount = liked ? likes - 1 : likes + 1; // いいね済みなら減らす
    await updateLikes(newCount);
    setLikes(newCount);
    setLiked(!liked); // 状態をトグル
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        いいね数: {likes}
      </Typography>
      <IconButton
        onClick={handleLike}
        color="primary"
        sx={{
          backgroundColor: liked ? "rgba(255, 0, 0, 0.1)" : "transparent", // ハートが赤く光る
          "&:hover": {
            backgroundColor: "rgba(255, 0, 0, 0.2)", // ホバー時
          },
        }}
      >
        <Badge badgeContent={likes} color="secondary" overlap="circular">
          {liked ? (
            <FavoriteIcon sx={{ fontSize: 40, color: "red" }} /> // 塗りつぶしハート
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: 40, color: "gray" }} /> // 枠線ハート
          )}
        </Badge>
      </IconButton>
    </Box>
  );
}
