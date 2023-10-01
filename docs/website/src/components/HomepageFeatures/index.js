import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Simple and Versatile",
    Svg: require("@site/static/img/img1.svg").default,
    description: (
      <>
        A simple and versatile way to create custom charts and graphs. With minimal setup you can easily
        design and customize various chart types, from bar charts to complex candlestick charts.
      </>
    ),
  },
  {
    title: "Highly Customizable",
    Svg: require("@site/static/img/img2.svg").default,
    description: (
      <>
        Chart Ease empowers you to select your preferred SVG elements for various parts of the chart, such as
        edges, markers, and axes, enabling you to create a chart tailored to your unique design.
      </>
    ),
  },
  {
    title: "Multiplatform Compatibility",
    Svg: require("@site/static/img/img3.svg").default,
    description: (
      <>
        Chart Ease, as a web component, is compatible with various platforms and technologies, allowing
        developers to integrate it into their projects as a consistent and flexible charting solution.
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
