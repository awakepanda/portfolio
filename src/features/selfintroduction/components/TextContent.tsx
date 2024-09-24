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
    <div className="w-full h-full relative py-pc-[60] px-pc-[104]">
      <Arrow />
      <div className="flex flex-col justify-between h-[calc(100%-calc((100vw*160)/1728))]">
        <PageTitle
          id={currentPage.id}
          nameJP={currentPage.nameJP}
          name={currentPage.name}
        />
        <div className="relative flex-grow mt-pc-[60] py-pc-[70] px-pc-[52] bg-white overflow-hidden rounded-pc-[32] before:block before:absolute before:top-0 before:left-0 before:z-50 before:w-full before:h-pc-[70] before:bg-custom-gradiation-top after:block after:absolute after:bottom-0 after:left-0 after:w-full after:h-pc-[70] after:bg-custom-gradiation-bottom">
          <AnimatedText animatedWords={animatedWords}>
            <>
              こんにちは！私は
              <span className={animatedWords[0].className}>
                {animatedWords[0].text}
              </span>
              です。
              <br />
              u
              かれこれ15年にわたり、Web開発に携わり、様々なプロジェクトに取り組んできました。新しい技術を学びながら成長していく過程がとても楽しく、これまでに多くの経験を積んできました。特に、今は最先端のツールやフレームワークを活用して、より効率的かつ魅力的なものを作り出せるよう努めています。
              <br />
              <br />
              現在は、
              <span className={animatedWords[1].className}>
                {animatedWords[1].text}
              </span>
              の開発を中心に活動しています。常に変化する業界の中で、使いやすく美しいUIやUXを実現するために、最新の技術やベストプラクティスを取り入れています。コードを書く際は、ただ動くだけでなく、読みやすく保守しやすいものを目指しています。
              <br />
              <br />
              開発を通じて、クライアントのニーズに応え、期待を超える成果を提供できることに大きな喜びを感じてます。
              <span className={animatedWords[2].className}>
                {animatedWords[2].text}
              </span>
              についても、私は特にシンプルでミニマルなアプローチが好きです。余計な要素をそぎ落としながら、しっかりと印象に残るものを作りたいと思っています。機能性と美しさの両立を心がけており、
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
              がいます。彼らとの時間が、仕事の合間の癒しになっており、忙しい毎日の中でも心のリセットをする大切な存在です。ときには、
              <span className={animatedWords[3].className}>
                {animatedWords[3].text}
              </span>
              たちとリラックスした時間を過ごすことで、疲れが和らぎ、また新たな気持ちで仕事に向き合うことができます。彼らがいることで、生活がより豊かになり、バランスの取れた日々を送ることができています。
              <br />
              <br />
              今後も、新しい技術や
              <span className={animatedWords[2].className}>
                {animatedWords[2].text}
              </span>
              の可能性を追求しながら、
              <span className={animatedWords[1].className}>
                {animatedWords[1].text}
              </span>
              開発の世界で、より多くの価値を提供していきたいと考えています。どうぞよろしくお願いします！
            </>
          </AnimatedText>
        </div>
      </div>
    </div>
  );
}
