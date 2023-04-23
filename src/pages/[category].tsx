import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import foodslist from "data/foodslist.json";
import categories from "data/categories.json";
import FoodsList from "components/Foods";
import { TFoodItem } from "interfaces/food.interfaces";
import {
  convetStringToUrlFormat,
  convetUrlToStringFormat,
} from "utils/string-helper";
import IndexLayout from "components/layout/IndexLayout";
import { NextPageWithLayout } from "./_app";

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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = categories.map((category) => ({
    params: { category: convetStringToUrlFormat(category.label) },
  }));
  return {
    paths,
    fallback: false,
  };
};

Category.getLayout = function getLayout(page: JSX.Element) {
  return <IndexLayout>{page}</IndexLayout>;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params?.category && params?.category != "همه") {
    let foods = foodslist.filter(
      (food) =>
        food.category === convetUrlToStringFormat(params?.category as string)
    );

    return {
      props: {
        foods,
      },
    };
  }

  return {
    props: {
      foods: foodslist,
    },
  };
};

export default Category;
