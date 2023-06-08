import { ReactElement } from "react";

import { GetStaticProps } from "next";
import Head from "next/head";

import FoodsList from "components/Foods";
import { TFoodItem } from "interfaces/food.interfaces";
import IndexLayout from "components/layout/IndexLayout";
import { NextPageWithLayout } from "./_app";
import foodsApi from "api/foodsApi";

const Home: NextPageWithLayout<{ foods: Array<TFoodItem> }> = ({ foods }) => {
  return (
    <>
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
      </Head>
      {/* Foods List */}
      <FoodsList foods={foods} />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <IndexLayout>{page}</IndexLayout>;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await foodsApi.getfoods();

  return {
    props: {
      foods: data.foods,
    },
  };
};

export default Home;
