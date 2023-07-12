import * as React from "react";
// import Chip from '@mui/material/Chip';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function Tags({ setPostTags }) {
  const handleTagsChange = (event, values) => {
    setPostTags(values);
  };

  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={categories}
        getOptionLabel={(option) => option.category}
        onChange={handleTagsChange}
        renderInput={(params) => (
          <TextField
            color="warning"
            {...params}
            variant="standard"
            label="Tags"
          />
        )}
      />
    </Stack>
  );
}

const categories = [
  { category: "寿司" },
  { category: "ピザ" },
  { category: "バーガー" },
  { category: "サンドイッチ" },
  { category: "パン" },
  { category: "ラーメン" },
  { category: "つけ麺" },
  { category: "まぜそば" },
  { category: "カレー" },
  { category: "フレンチ" },
  { category: "メキシカン料理" },
  { category: "中華料理" },
  { category: "インド料理" },
  { category: "韓国料理" },
  { category: "タイ料理" },
  { category: "ベトナム料理" },
  { category: "サラダ" },
  { category: "ステーキ" },
  { category: "シーフード" },
  { category: "ピリ辛料理" },
  { category: "ベジタリアン/ビーガン料理" },
  { category: "デザート" },
  { category: "コーヒー/ティー" },
  { category: "ジュース/スムージー" },
  { category: "アルコール飲料" },
];
