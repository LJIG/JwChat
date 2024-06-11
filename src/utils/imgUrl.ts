/*
 * @Author            : Bian <389701057@qq.com>
 * @Date              : 2024-06-11 17:35:24
 * @LastEditors       : Bian <389701057@qq.com>
 * @LastEditTime      : 2024-06-11 17:59:30
 * @FilePath          : /src/utils/imgUrl.ts
 * @Description       :
 * Copyright (c) 2024 by Bian <389701057@qq.com>, All Rights Reserved.
 */

import emojiSprite from "./emoji-sprite.png";

let emojiImg = emojiSprite;

function base64ToUrl(base) {
  //需要手动去掉data:image/png;base64,
  //base64-->blob
  const byteCharacters = atob(base);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "image/jpeg" });
  //blob-->url
  let binaryData = [];
  binaryData.push(blob as never);
  let url = URL.createObjectURL(new Blob(binaryData));
  return url;
}

console.log("%csrc/utils/imgUrl.ts:32 emojiImg", "color: #007acc;", emojiImg);

if (/^data:/.test(emojiSprite)) {
  let ba64 = emojiSprite.split(",")[1];
  emojiImg = base64ToUrl(ba64);
}

export { emojiImg };
