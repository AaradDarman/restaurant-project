import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import _ from "lodash";
import { ParsedUrlQuery } from "querystring";

import FoodsList from "components/Foods";
import { TFoodItem } from "interfaces/food.interfaces";
import { convetUrlToStringFormat } from "utils/string-helper";
import IndexLayout from "components/layout/IndexLayout";
import { NextPageWithLayout } from "pages/_app";
import foodsApi from "api/foodsApi";

const Sort: NextPageWithLayout<{ foods: Array<TFoodItem> }> = ({ foods }) => {
  const router = useRouter();
  const { category } = router.query;

  return (
    <>
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_SITE_NAME} | ${category}`}</title>
      </Head>
      {/* Foods List */}
      <FoodsList foods={foods} />
    </>
  );
};

Sort.getLayout = function getLayout(page: JSX.Element) {
  return <IndexLayout>{page}</IndexLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { sortBy, category } = context.query as IParams;

  const { data } = await foodsApi.getfoods({
    sortBy: convetUrlToStringFormat(sortBy),
    category: convetUrlToStringFormat(category),
  });

  return {
    props: {
      foods: data.foods,
    },
  };
};

interface IParams extends ParsedUrlQuery {
  sortBy: string;
  category: string;
}

export default Sort;
