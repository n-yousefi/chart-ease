# `<chart-ease>`

## A Customizable and High-Performance Web Component for Crafting Stunning Charts

<img align="left" width="100" height="100" src="./docs/images/bar-chart.svg" alt="chart-ease" width="200" />

Chart Ease is a versatile web component that simplifies the creation of custom charts and graphs. With just a few lines of HTML and JavaScript, you can design and customize various chart types, ranging from basic bar charts to intricate candlestick charts, while maintaining complete control over their appearance. This highly customizable tool offers developers and designers a straightforward way to visualize data across different web technologies, ensuring consistency and flexibility in charting solutions.

Whether you're a novice or an experienced developer, Chart Ease empowers you to effortlessly craft beautiful and interactive charts for your projects.

## Features

- **Lightweight and Performant**: Built with web components, Chart Ease is lightweight and highly performant, ensuring smooth rendering and interaction.
- **Highly Customizable**: With a wide range of customization options, you can tailor the appearance of your charts to fit your specific needs.
- **Cross-Browser Compatibility**: Chart Ease is compatible with modern browsers, ensuring a consistent experience across different platforms.
- **Extensive Documentation**: Comprehensive documentation is provided to help you get started quickly and make the most of Chart Ease's features.

## Getting Started

Follow the steps below to create your first chart with Chart Ease:

1. **Create a Chart Container**: Add an HTML element with the `<chart-ease>` tag and set the `width` and `height` attributes to define the chart's dimensions:

   ```html
   <chart-ease width="200" height="200"></chart-ease>
   ```

2. **Define a Data Set**: Create a `<data-set>` element within the `<chart-ease>` tag to hold your chart data:

   ```html
   <chart-ease width="200" height="200">
     <data-set></data-set>
   </chart-ease>
   ```

3. **Define a Path**: Add a `<path>` element inside the `<data-set>` and set the `data-drawn-as` attribute to `"edge"` to define the path connecting the data points:

   ```html
   <chart-ease width="200" height="200">
     <data-set>
       <path data-drawn-as="edge" stroke="aqua" fill="none"></path>
     </data-set>
   </chart-ease>
   ```

4. **Set the Chart Data**: Use JavaScript to set the data for your chart:

   ```javascript
   const dataSet = document.querySelector("data-set");
   dataSet.data = [6, 4, 0, 3, 5, 2, 7, 3];
   ```

Congratulations! You've successfully created your first chart with Chart Ease.

<img width="200" height="200" src="./docs/images/simple-chart.svg" alt="chart-ease" width="200" />

## Documentation

For more detailed information, including advanced customization options, axis configuration, path customization, markers, and more, please refer to the comprehensive documentation available [on the website](https://n-yousefi.github.io/chart-ease/).

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/n-yousefi/chart-ease).

## License

Chart Ease is released under the [Apache2 License](http://www.apache.org/licenses/LICENSE-2.0).
