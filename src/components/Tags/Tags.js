import * as React from 'react';
// import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function Tags() {
  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        color="warning"
        options={categories}
        getOptionLabel={(option) => option.title}
        defaultValue={[categories[13]]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Tags"
            placeholder="ラーメン"
          />
        )}
      />
    </Stack>
  );
}

const categories = [
    { title: "寿司" },
    { title: "ピザ" },
    { title: "バーガー" },
    { title: "サンドイッチ" },
    { title: "パン" },
    { title: "ラーメン" },
    { title: "つけ麺" },
    { title: "まぜそば" },
    { title: "カレー" },
    { title: "フレンチ" },
    { title: "メキシカン料理" },
    { title: "中華料理" },
    { title: "インド料理" },
    { title: "韓国料理" },
    { title: "タイ料理" },
    { title: "ベトナム料理" },
    { title: "サラダ" },
    { title: "ステーキ" },
    { title: "シーフード" },
    { title: "ピリ辛料理" },
    { title: "ベジタリアン/ビーガン料理" },
    { title: "デザート" },
    { title: "コーヒー/ティー" },
    { title: "ジュース/スムージー" },
    { title: "アルコール飲料" }
  ];