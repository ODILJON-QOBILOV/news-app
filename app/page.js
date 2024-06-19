"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

const Page = () => {
  const [articles, setArticles] = useState([]);
  const { push } = useRouter();

  useEffect(() => {
    const url =
      "https://newsapi.org/v2/top-headlines?" +
      "country=us&" +
      "apiKey=20f726ec24844cc7a1c00c199e1c9761";

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setArticles(res.articles);
        console.log(res.articles);
      });
  }, []);

  const formatDate = (dateString) => {
    let date = new Date(dateString);
    let formattedDate = new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    }).format(date);
    return formattedDate;
  };

  const truncateDescription = (description, wordLimit) => {
    if (!description) return "";
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
  };

  return (
    <div>
      <div className={styles.itemBox}>
        {articles.map((article, index) => (
          <div className={styles.card} key={index}>
            {article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} />
            )}
            <div className={styles.cardContent}>
              <h2>{article.title}</h2>
              <p style={{ textSizeAdjust: "none" }}>
                {truncateDescription(article.description, 25)}
              </p>
              <button
                className={styles.btn}
                onClick={() => window.open(article.url, "_blank")}
              >
                Read more
              </button>
              <p className={styles.time}>{formatDate(article.publishedAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
