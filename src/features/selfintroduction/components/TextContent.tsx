import Arrow from "@/app/components/Arrow";
import PageTitle from "@/app/components/PageTitle";
import { siteStructure } from "@/app/constants/siteStructure";

export default function TextContent() {
  const currentPage = siteStructure.find((page) => page.path === "/");

  if (!currentPage) {
    return <div>Page not found</div>;
  }

  return (
    <div className="w-full h-full relative py-pc-[60] px-pc-[112]">
      <Arrow />
      <div className="flex flex-col justify-between h-[calc(100%-calc((100vw*160)/1728))]">
        <PageTitle
          id={currentPage.id}
          nameJP={currentPage.nameJP}
          name={currentPage.name}
        />
        <div className="relative flex-grow mt-pc-[60] py-pc-[60] px-pc-[52] bg-white overflow-hidden rounded-pc-[32] before:block before:absolute before:top-0 before:left-0 before:w-full before:h-pc-[70] before:bg-custom-gradiation-top after:block after:absolute after:bottom-0 after:left-0 after:w-full after:h-pc-[76] after:bg-custom-gradiation-bottom">
          <div className="h-full overflow-auto hide-scrollbar">
            <p className="text-[calc((100vw*24)/1728)] leading-10 overflow-wrap-anywhere white-space-pre-wrap">
              こんにちは！前野慎吾です。
              <br />
              デザイン、コーディングをメインに楽しくフロントエンドの開発をしています。
              <br />
              気づけばもう15年以上Web技術に関わってきました。
              <br />
              今は、Next.js、TypeScript、TailWindCSSを使ったモダンな環境で開発をしていて、バックエンドにはVercelやSupabaseを活用しています。
              <br />
              <br />
              デザインはシンプルで、でもしっかり印象に残るモダンでミニマルなスタイルが大好きです。余計なものはそぎ落として、クリーンで美しいデザインを目指しています。コードもモダンなものが好きで、日々いろいろ工夫しながら取り組んでいます。
              <br />
              <br />
              それと、猫を2匹飼っています！
              <br />
              これからも、新しい技術やデザインで面白いものを作っていきたいと思っています。よろしくお願いします！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
