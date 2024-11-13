// DecompressTextForm.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import pako from 'pako';

function DecompressTextForm() {
  const [text, setText] = useState('');
  const [error, setError] = useState(false); // エラーステートを追加

  // Base64を解凍して元のテキストに戻す関数
  const decompressText = (base64String) => {
    try {
      const compressedBytes = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));
      const utf8Bytes = pako.ungzip(compressedBytes);
      const decodedText = new TextDecoder().decode(utf8Bytes);
      setError(false); // 解凍成功時はエラーをリセット
      return decodedText;
    } catch (error) {
      setError(true); // 解凍エラーが発生した場合はエラーステートを設定
      console.error("解凍エラー:", error);
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const decompressedText = decompressText(text);

    if (decompressedText) {
      console.log("Decompressed Text:", decompressedText);
    } else {
      console.log("通常のテキスト:", text);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600, // ここで最大幅を指定
        width: '100%', // 幅を100%にしてコンテナにフィット
        mx: 'auto',
        p: 4,
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
        color: '#fff',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
        テキスト入力
      </Typography>

      {/* エラーが発生した場合はAlertを表示 */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          エラーが発生しました。文字列が正しいか確認してください。
        </Alert>
      )}

      <TextField
        label="テキストを入力してください"
        variant="filled"
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        minRows={5}
        sx={{
          mb: 4,
          backgroundColor: '#ffffff90',
          borderRadius: 2,
          '& .MuiFilledInput-root': {
            backgroundColor: 'transparent',
          },
          '& .MuiFilledInput-underline:before': {
            borderBottomColor: '#ffffff66',
          },
          '& .MuiFilledInput-underline:hover:before': {
            borderBottomColor: '#ffffff',
          },
          '& .MuiInputLabel-root': {
            color: '#ffffffa0',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#ffffff',
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          backgroundColor: '#0072ff',
          ':hover': {
            backgroundColor: '#005bb5',
          },
        }}
      >
        送信
      </Button>
    </Box>
  );
}

export default DecompressTextForm;
