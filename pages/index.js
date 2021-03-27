// import { getArticles } from "@api";

export const meta = {
  title: "Le professeur B. raconte…",
};

export default function Page(props) {
  return (
    <>
      <h1>Welcome to the Next.js blog</h1>On essaye des trucs
    </>
  );
}

// export async function getStaticProps() {
//   const paths = await getArticles();

//   return {
//     props: {
//       paths: paths.map((key) => ({ params: { slug: key } })),
//     },
//   };
// }
