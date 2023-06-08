import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import FoodsList from "components/Foods";
import { TFoodItem } from "interfaces/food.interfaces";
import {
  convetStringToUrlFormat,
} from "utils/string-helper";
import IndexLayout from "components/layout/IndexLayout";
import { NextPageWithLayout } from "../_app";
import foodsApi from "api/foodsApi";
import { ParsedUrlQuery } from "querystring";
import { CATEGORIES } from "constants/index";

const Category: NextPageWithLayout<{ foods: Array<TFoodItem> }> = ({
  foods,
}) => {
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

Category.getLayout = function getLayout(page: JSX.Element) {
  return <IndexLayout>{page}</IndexLayout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = CATEGORIES.map((category) => ({
    params: { category: convetStringToUrlFormat(category.label) },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { category } = context.params as IParams;

  const { data } = await foodsApi.getfoods({
    category,
  });

  return {
    props: {
      foods: data.foods,
    },
  };
};

interface IParams extends ParsedUrlQuery {
  category: string;
}

export default Category;
