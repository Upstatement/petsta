import React, { useEffect, useState } from "react";

import { db } from "./App";

import { collection, doc, getDocs } from "firebase/firestore"; 

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const tempArray = [];

      const querySnapshot = await getDocs(collection(db, "posts"));

      querySnapshot.forEach(doc => {
        tempArray.push(doc.data());
      })

      setPosts(tempArray);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section>
      <h1>Here are the posts</h1>
      <ul>
        {posts.map(post => {
          return <li>{post.text}</li>
        })}
      </ul>
    </section>
  )
}

export default Posts;
