import React from 'react';
import Layout from '../../components/Layout/Layout';
import Baner from '../../components/Banner/Banner';
import Intro from '../../components/Intro/Intro';
import Comment from '../../components/Comment/Comment';
import Category from '../../components/Category/Category';
import Process from '../../components/Process/Process';

const HomePage = () => {
  return (
    <Layout>
      <Baner/>
      <Category/>
      <Intro/>
      <Process />
      <Comment/>
    </Layout>
  )
}

export default HomePage;