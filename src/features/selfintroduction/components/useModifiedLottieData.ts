import { useEffect, useState } from "react";

// Lottieアニメーションデータの型定義を拡張
type LottieAnimationData = {
  layers?: Array<any>;
  assets?: Array<any>;
  [key: string]: any; // その他のプロパティを許可
};

const removeOrReplaceFill = (obj: any) => {
  if (Array.isArray(obj)) {
    obj.forEach(removeOrReplaceFill);
  } else if (typeof obj === "object" && obj !== null) {
    Object.keys(obj).forEach((key) => {
      if (key === "ty" && obj[key] === "fl" && obj["c"]) {
        // fillを削除する場合
        delete obj["c"];
        // または、透明な色に置き換える場合
        // obj['c'] = { k: [0, 0, 0, 0] };
      } else {
        removeOrReplaceFill(obj[key]);
      }
    });
  }
};

export const useModifiedLottieData = (animationData: LottieAnimationData) => {
  const [modifiedData, setModifiedData] = useState<LottieAnimationData | null>(
    null,
  );

  useEffect(() => {
    const modifyData = () => {
      const newData: LottieAnimationData = JSON.parse(
        JSON.stringify(animationData),
      );
      removeOrReplaceFill(newData);
      setModifiedData(newData);
    };

    modifyData();
  }, [animationData]);

  return modifiedData;
};
