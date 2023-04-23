import { ReactElement } from "react";

import { GetStaticProps } from "next";
import Head from "next/head";

import foodslist from "data/foodslist.json";
import FoodsList from "components/Foods";
import { TFoodItem } from "interfaces/food.interfaces";
import IndexLayout from "components/layout/IndexLayout";
import { NextPageWithLayout } from "./_app";

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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      foods: foodslist,
    },
  };
};

export default Home;
