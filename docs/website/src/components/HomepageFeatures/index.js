import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Simple and Versatile",
    Svg: require("@site/static/img/img1.svg").default,
    description: (
      <>
        Chart Ease offers a simple and versatile way to create custom charts and graphs. With minimal setup
        and just a few lines of HTML and JavaScript, you can easily design and customize various chart types,
        from bar charts to complex candlestick charts.
      </>
    ),
  },
  {
    title: "Highly Customizable",
    Svg: require("@site/static/img/img2.svg").default,
    description: (
      <>
        One of Chart Ease's standout features is its extensive customization options. You have full control
        over the appearance of your charts. You can easily choose chart elements, such as lines, bars, and
        axes, to create a beautiful chart that matches your design requirements.
      </>
    ),
  },
  {
    title: "Multiplatform Compatibility",
    Svg: require("@site/static/img/img3.svg").default,
    description: (
      <>
        Chart Ease, being a web component, can be utilized across a wide range of platforms and technologies.
        Developers can seamlessly integrate it into their projects, ensuring a consistent and flexible
        charting solution across different web technologies.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
