import Arrow from "@/app/components/Arrow";
import PageTitle from "@/app/components/PageTitle";
import { siteStructure } from "@/app/constants/siteStructure";
import AnimatedText from "./AnimatedText";
type AnimatedWord = {
  text: string;
  className: string;
  animationType: "hand" | "code" | "pen" | "cat";
};
export default function TextContent() {
  const currentPage = siteStructure.find((page) => page.path === "/");
  if (!currentPage) {
    return <div>Page not found</div>;
  }
  const animatedWords: AnimatedWord[] = [
    {
      text: "前野慎吾",
      className: "text-accent font-bold",
      animationType: "hand",
    },
    {
      text: "フロントエンド",
      className: "text-accent font-bold",
      animationType: "code",
    },
    {
      text: "デザイン",
      className: "text-accent font-bold",
      animationType: "pen",
    },
    { text: "猫", className: "text-accent font-bold", animationType: "cat" },
  ];

  return (
    <div className="w-full h-full relative overflow-hidden pt-sp-[36] px-sp-[24] md:pt-tablet-[40] md:px-tablet-[50] lg:pt-pc-[60] lg:px-pc-[104]">
      <Arrow />
      <div className="flex flex-col justify-between h-[calc(100%-calc((100vw*40)/640))] md:h-[calc(100%-calc((100vw*40)/1024))] lg:h-[calc(100%-calc((100vw*190)/1728))]">
        <PageTitle
          id={currentPage.id}
          nameJP={currentPage.nameJP}
          name={currentPage.name}
        />
        <div className="relative flex-grow bg-white rounded-3xl overflow-hidden before:block before:absolute before:top-0 before:left-0 before:z-50 before:w-full before:bg-custom-gradiation-top after:block after:absolute after:bottom-0 after:left-0 after:w-full after:bg-custom-gradiation-bottom mt-sp-[20] py-sp-[42] px-sp-[30] before:h-sp-[46] after:h-sp-[46] md:mt-tablet-[38] md:py-tablet-[42] md:px-tablet-[38] md:before:h-tablet-[50] md:after:h-tablet-[50] lg:mt-pc-[50] lg:py-pc-[70] lg:px-pc-[52] lg:before:h-pc-[78] lg:after:h-pc-[70]">
          <AnimatedText animatedWords={animatedWords}>
            <>
              こんにちは！私は
              <span className={animatedWords[0].className}>
                {animatedWords[0].text}
              </span>
              です。
              <br />
              もう15年くらいWebを中心としたデジタルプロダクトに関わってきて、さまざまなプロジェクトのクリエイションや運用を手がけてきました。
              <br />
              新しい技術を学んで成長していくのをすごく楽しく感じ、それをモチベーションに未だこの仕事に従事しています。
              <br />
              <br />
              最近は特に
              <span className={animatedWords[1].className}>
                {animatedWords[1].text}
              </span>
              最新のツールやフレームワークを使って、もっと効率的で魅力的なものを作れるように、ちょっとしたプロジェクトを作りながら情報をキャッチアップしています。
              <br />
              理想は、使いやすくて美しいUIやUXを実現すること。そのために、最新の技術やベストプラクティスを積極的に取り入れています。コードを書くときは、ただ動くだけじゃなく、読みやすくてメンテしやすいものを意識しています。
              <br />
              <br />
              <span className={animatedWords[2].className}>
                {animatedWords[2].text}
              </span>
              についても、私は特にシンプルでミニマルなアプローチが好きです。余計な要素をそぎ落としながら、しっかりと印象に残るものを作りたいと思っています。
              <br />
              機能性と美しさの両立を心がけており、
              <span className={animatedWords[2].className}>
                {animatedWords[2].text}
              </span>
              がプロダクト全体の価値を引き立てるように工夫を凝らしています。クリーンなラインとバランスの取れたレイアウトは、見た目だけでなく、ユーザーの体験もより良いものにしてくれます。
              <br />
              <br />
              そして、私の生活には2匹の
              <span className={animatedWords[3].className}>
                {animatedWords[3].text}
              </span>
              がいます。
              <br />
              ときには一緒にリラックスすることで疲れも取れて、また新たな気持ちで仕事に向き合えるんです。
              <br />
              <span className={animatedWords[3].className}>
                {animatedWords[3].text}
              </span>
              たちがいるおかげで、生活がさらに豊かになって、いいバランスで毎日を過ごせてます。
              <br />
              <br />
              今後も、デジタルプロダクトの可能性を追求しながら、さまざまなインターフェースを通してより多くの価値を提供していきたいと考えています。
              <br />
              どうぞよろしくお願いします！
            </>
          </AnimatedText>
        </div>
      </div>
    </div>
  );
}
