import React from 'react';
import Layout from '../../components/Layout/Layout';
import Baner from '../../components/Banner/Banner';
import Intro from '../../components/Intro/Intro';
import Comment from '../../components/Comment/Comment';
import Category from '../../components/Category/Category';


const HomePage = () => {
  return (
    <Layout>
      <Baner/>
      <Category/>
      <Intro/>
      <Comment/>
    </Layout>
  )
}

export default HomePage;