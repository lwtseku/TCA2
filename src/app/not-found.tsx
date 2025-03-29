import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="content-layout">
      <h1 id="page-title" className="content__title">
        Not Found
      </h1>
      <Link href="/home">Return home</Link>
    </div>
  );
};

export default NotFoundPage;
