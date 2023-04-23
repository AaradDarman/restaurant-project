import FoodsList from "components/Foods";
import Cookies from "cookies";
import { GetServerSideProps } from "next";
import Head from "next/head";
import foodslist from "data/liked-foods.json";

const Favorites = () => {
  return (
    <div className="flex flex-col bg-secondary-main px-6 pb-[72px] md:px-8">
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_SITE_NAME} | پسندیده ها`}</title>
      </Head>
      <FoodsList foods={foodslist} />
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const cookies = new Cookies(ctx.req, ctx.res);
//   const authorization = cookies.get("authorization");
//   if (!authorization) {
//     return {
//       redirect: {
//         destination: `/auth?returnUrl=${ctx.resolvedUrl}&forceLogout=true`,
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// };

export default Favorites;
