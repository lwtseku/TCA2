import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="content-layout">
      <h1 id="page-title" className="content__title">
        Хуудас олдсонгүй
      </h1>
      <Link href="/home">Нүүр хуудас-луу шилжэх</Link>
    </div>
  );
};

export default NotFoundPage;
